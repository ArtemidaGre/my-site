const cookieParser = require('cookie-parser');const path = require("path");
const sqlite3 = require('sqlite3').verbose();const fs = require("fs");
const express = require('express');const bodyParser = require('body-parser');
const https = require('https');const multer = require('multer');
const { exec } = require('child_process');
const { get } = require('request');

const config = require('/var/conf/conf.json')

const port = process.env.PORT || config['port']['main'];

const app = express();

function CopyDB(){
  // Define the source and destination paths
  const sourcePath = 'database.db';
  const destPath = '/home/user/bsite/';
}

//за реквиры отчитываться не обязан, тем более перед собой :)

const e404 = (res) =>{res.send('<script>window.open("/err/404", "_self")</script>"')}
const e400 = (res) =>{res.send('<script>window.open("/err/400", "_self")</script>"')}
const e409 = (res) =>{res.send('<script>window.open("/err/409", "_self")</script>"')}
const e500 = (res) =>{res.send('<script>window.open("/err/500", "_self")</script>"')}
const e401 = (res) =>{res.send('<script>window.open("/err/401", "_self")</script>"')}

console.log("Ready to work");

app.use(bodyParser.urlencoded({ extended: true })); // ДЖСОН парсер
app.use(cookieParser()); // куки парсер

const db = new sqlite3.Database(`${config['database']['site']['src']}/${config['database']['site']['name']}`, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Connected to the database.');
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'avatar/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

db.run(`CREATE TABLE IF NOT EXISTS "users" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL,
	"email"	TEXT UNIQUE,
	"password"	BLOB NOT NULL,
	"birthday"	DATE,
	"gender"	BLOB,
	"description"	TEXT DEFAULT 'null',
    "avatar" TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);`)
//Не трогать, убъет!

CopyDB()

app.get('err/info', (req, res) => {
  res.status(200).send(`document.getElementById('info').innerHTML = '${req.cookies.error}'`);
})

const upload = multer({ dest: 'avatar/' }); // Set up storage for uploaded files

//Avtorization system

app.post('/register', upload.single('avatar'), async (req, res) => {
  try {
    const { name, email, password, birthday, gender } = req.body;
    const avatar = req.file ? req.file.filename : null; // Get filename of uploaded avatar, if any
    db.run(`INSERT INTO users (name, email, password, birthday, gender, avatar)
            VALUES (?, ?, ?, ?, ?, ?)`,
           [name, email, password, birthday, gender, avatar], (err) => {
      if (err) {
        console.error(err);
        res.status(500).cookie('error', err);
        e500(res);
      } else {
        CopyDB()
        res.status(200).send(`<script>window.open('/login', '_self')</script>`);;
      }
    });
  } catch (err) {
    console.log(err);
  }
});

app.post('/login_r', (req, res) => {
  try{
    const { email, password } = req.body;
    db.get(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password], (err, row) => {
      console.log(email, password);
      if (err) {
        console.error(err);
        res.status(500).cookie('error', err)
        e500(res)
      } else if (!row) {
        res.status(401).cookie('error', err);
        e401(res)
      } else {
        res.cookie('id', row.id); // Если забудешь, зачем ты писал кукисы, отвечаю - НАДА
        res.status(200).send(`<script>window.open('/profile', '_self')</script>`);
      }
    });
  }catch(err){
    e500(res);
    console.log(err)
  }
});

// Profile Systems

app.get('/sqlite-data', async (req, res) => {
  console.log('loading profile: ' + req.cookies.id);
  db.all(`SELECT * FROM users WHERE id = ${req.cookies.id}`, (error, rows) => {
    const row = rows[0];
    if (error) {
      console.error(error);
      res.status(500).cookie('error', error);
      e500(res);
    } else {
      try {
        const avatarUrl = row.avatar ? `/get_avatar/${row.avatar}` : '/get_avatar/no_logo'; // Get URL of user's avatar, if any
        const html = `
          <div class="user-profile">
            <h2>${row.name}'s profile</h2>
            <img src="${avatarUrl}" alt="Avatar" width="100" height="100" id="avatar"> <!-- Display user's avatar -->
            <ul>
              <li><span>ID:</span> ${row.id}</li>
              <li><span>Email:</span> ${row.email}</li>
              <li><span>Birthday:</span> ${row.birthday}</li>
              <li><span>Gender:</span> ${row.gender}</li>
              <li><span>Description:</span> ${row.description}</li>
              <li id="description_form">
                <span>Change description:</span>
                <form action="/description" method="post">
                  <textarea id="description" name="description"></textarea><br/>
                  <input type="submit" value="Submit">  
                </form>
              </li>
            </ul>
          </div>`;
        res.send("document.getElementById(`user`).innerHTML = `"+html+"`");
      } catch (err) {
        res.send(`document.getElementById('user').innerHTML = "<h2>YOU'RE  NOT  LOGINED  TO  THIS  SITE!!!<h2>";`);
        console.error('client fail');
      }
    }
  });
});



app.get('/get_avatar/:id', (req, res) => {
  const id = req.params.id;
  console.log('get_avatar: '+id);
  try {
    if (id == 'no_logo'){
      res.sendFile(`${__dirname}/public/image/logo.ico`);
    }else{
      try{
        const avatarData = fs.readFileSync(`${__dirname}/avatar/${id}`); // Read avatar file data
      }catch(err){
        avatarData = fs.readFileSync(`${__dirname}/avatar/no_logo`); // Read no_logo avatar file data 
        console.log(err)
      }
      res.contentType('image/jpeg'); // Set content type to image/jpeg
      res.send(avatarData); // Send avatar file data as response
    }
  } catch (err) {
    console.error(err);
    res.sendFile(`${__dirname}/public/image/logo.ico`); // Send default logo as response if avatar file not found
  }
});


app.get('/sqlite-data/:id', async (req, res) => {
  const id = req.params.id;
  console.log('try to get info to profile: '+ id);
  db.all(`SELECT * FROM users WHERE id = ${id}`, (error, rows) => {
    const row = rows[0]
    if (error) {
      console.error(error);
      res.status(500).cookie('error', err);
      e500(res)
    } else {
      const html = `
      <div class="user-profile">
        <h2>User Profile</h2>
        <ul>
          <li><span>ID:</span> ${row.id}</li>
          <li><span>Name:</span> ${row.name}</li>
          <li><span>Email:</span> ${row.email}</li>
          <li><span>Birthday:</span> ${row.birthday}</li>
          <li><span>Gender:</span> ${row.gender}</li>
          <li><span>Description:</span> ${row.description}</li>
        </ul>
      </div>`
      res.send('document.getElementById("user").innerHTML = `'+html+'`;')
    }
  });
});

app.post('/description', (req, res) => {
  const description = req.body.description;

  // Update the description in the database
  db.run(`UPDATE users SET description = ? WHERE id = ${req.cookies.id}`, [description], function(err) {
    if (err) {
      console.error(err);
      res.status(500).cookie('error', err);
      e500(res)
    } else {
      console.log(`Row(s) updated: ${this.changes}`);
      res.status(200).send(`<script>window.open('/profile', '_self')</script>`);
    }
  });
});

// File System

app.get('/image/:filename', (req, res) => {
  const filename = req.params.filename;
  console.log(filename)
  res.sendFile(`${__dirname}/image/${filename}`);
});

app.get('/file/:filename', (req, res) => {
  const filename = req.params.filename;
  console.log(filename)
  res.sendFile(`${__dirname}/file/${filename}`);
});

app.post('/upload', upload.single('avatar'), (req, res) => {
  // Send response with uploaded file information
  res.json({ filename: req.file.filename });
});

// NEWS

db.run(`CREATE TABLE IF NOT EXISTS "news" (
	"id"	INTEGER NOT NULL UNIQUE,
	"email"	TEXT NOT NULL,
	"header"	INTEGER NOT NULL,
	"text"	INTEGER NOT NULL,
	"ending"	INTEGER,
	PRIMARY KEY("id")
);`)

app.post('/api/news/new/:email/:password/:header/:text/:ending', async (req, res) => {
  const email = req.params.email;
  const password = req.params.password;
  const header = req.params.header;
  const text = req.params.text;
  const ending = req.params.ending;
  db.get(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password], (err, row) => {
    console.log(email, password);
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else if (!row) {
      res.status(401).send('wrong email or password');
    } else {
      db.run(`insert into news (email, header, text, ending) values ("${email}", "${header}", "${text}", "${ending}"`, (err) => {
        if (err) {res.status(500).send(err);} else {res.status(200).send('success')}
      })
    }
  });
})

// Local api

app.get('/api/crash/:email/:password/:key', (req, res) => {
  const key = req.params.key;
  const email = req.params.email;
  const password = req.params.password;
  db.get(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password], (err, row) => {
    console.log(email, password);
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else if (!row) {
      res.status(401).send('wrong email or password');
    } else {
      if (key == 'sorokdvaspolovinoy') {
      setTimeout(function () {
        throw new Error('We crashed!!!!!');
      }, 10);}
  }});
})

// server main

app.use(async (req, res) => {
  if (!req.cookies.id){
    res.cookie('id', 0, {httpOnly: true });
  }
  let contentType = 'text/html'
  var get_to;
  if (req.headers.host.startsWith('beta.')){
    get_to = 'beta'
  }
  else if (req.headers.host.startsWith('container.')){
    console.log('container https');
    https.request({
      hostname: 'localhost',
      port: 2001,
      path: req.url,
      method: req.method,
      headers: req.headers,
      rejectUnauthorized: false // add this option to skip certificate verification
    }, (response) => {
      response.pipe(res);
    }).end();
  }
  else if (req.headers.host.startsWith('m.')){
    get_to = 'android'
  }
  else if (req.headers.host.startsWith('api.')){
    console.log('api https');
    https.request({
      hostname: 'localhost',
      port: 18123,
      path: req.url,
      method: req.method,
      headers: req.headers,
      rejectUnauthorized: false // add this option to skip certificate verification
    }, (response) => {
      response.pipe(res);
    }).end();
  }
  else {
    const userAgent = req.headers['user-agent'];
    if (userAgent && userAgent.match(`(iPhone|iPod|iPad|Android|webOS|BlackBerry|IEMobile|Opera Mini)`)) {
      get_to = 'android'
    } else {
      get_to = 'public'
    }
  }
  if (req.url == '/'){file = 'index'}
  else {file = req.url}
  let filePath = path.join(__dirname, get_to, req.url === '/' ? 'index.html' : req.url)
  const ext = path.extname(filePath)
  switch (ext) {
    case '.css':
      contentType = 'text/css'
      break
    case '.js':
      contentType = 'text/javascript'
      break
    case '.png':
      contentType = 'image/png'
    case '.jpeg' || '.jpg':
      contentType = 'image/jpeg'
    default:
      contentType = 'text/html'
  }

  if (!ext) {
    filePath += '.html'
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      fs.readFile(path.join(__dirname, 'public/err', '404.html'), (error, data) => {
        if (error) {
          res.status(500).cookie("error" ,error.message);
          e500(res)
        } else {
          res.status(404).cookie('error' ,'Can not find file ' + filePath)
          e404(res)
        }
      })
    } else {
      res.writeHead(200, {
        'Content-Type': contentType
      })
      res.end(content)
    }
  })
})


// Start the server

var privateKey = fs.readFileSync(__dirname+'/ssl/key.csr');
var certificate = fs.readFileSync(__dirname+'/ssl/certificate.crt');

const options = {
  key: fs.readFileSync(__dirname + '/ssl/key.csr', 'utf8'),
  cert: fs.readFileSync(__dirname + '/ssl/certificate.crt', 'utf8')
};
const server = https.createServer(options, app).listen(port, () => {console.log('started')});
