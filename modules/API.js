const cookieParser = require('cookie-parser');const path = require("path");
const sqlite3 = require('sqlite3').verbose();const fs = require("fs");
const express = require('express');const bodyParser = require('body-parser');
const app = express(); const exec = require("child_process");
//за реквиры отчитываться не обязан, тем более перед собой :)

const e404 = (res) =>{res.send('<script>window.open("err/404", "_self")</script>"')}
const e400 = (res) =>{res.send('<script>window.open("err/400", "_self")</script>"')}
const e409 = (res) =>{res.send('<script>window.open("err/409", "_self")</script>"')}
const e500 = (res) =>{res.send('<script>window.open("err/500", "_self")</script>"')}
const e401 = (res) =>{res.send('<script>window.open("err/401", "_self")</script>"')}

console.log("API: ready to work");

app.use(bodyParser.urlencoded({ extended: true })); // ДЖСОН парсер
app.use(cookieParser()); // куки парсер

const db = new sqlite3.Database('database.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('API: connected to the database.');
  }
});



db.run(`CREATE TABLE IF NOT EXISTS "users" (
	"id"	INTEGER,
  "hash" TEXT,
	"name"	TEXT NOT NULL,
	"email"	TEXT UNIQUE,
	"password"	BLOB NOT NULL,
	"birthday"	DATE,
	"gender"	BLOB,
	"description"	TEXT DEFAULT 'null',
	PRIMARY KEY("id" AUTOINCREMENT)
);`)

app.get('/api/test', (req, res)=>{
  res.send('test')
})

db.run(`CREATE TABLE IF NOT EXISTS "news" (
	"id"	INTEGER NOT NULL UNIQUE,
	"email"	TEXT NOT NULL,
	"header"	INTEGER NOT NULL,
	"text"	INTEGER NOT NULL,
	"ending"	INTEGER,
	PRIMARY KEY("id")
);`)
//Не трогать, убъет!

app.get('err/info', (req, res) => {
  res.status(200).send(`document.getElementById('info').innerHTML = '${req.cookies.error}'`);
})

app.post('/register', async (req, res) => {
  try{
  const { name, email, password, birthday, gender } = req.body; // при изменениии формы, ошибки возникают именно тут!
  db.run(`INSERT INTO users (name, email, password, birthday, gender) 
          VALUES (?, ?, ?, ?, ?)`,
          [name, email, password, birthday, gender], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).cookie('error', err.message);
      e500(res)
    } else {
      res.status(200).redirect("/");
    }
  });
  }catch(err){console.log(err)}
});

app.post('/login_r', (req, res) => {
  try{
    const { email, password } = req.body;
    db.get(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password], (err, row) => {
      console.log(email, password);
      if (err) {
        console.error(err.message);
        res.status(500).cookie('error', err.message)
        e500(res)
      } else if (!row) {
        res.status(401).cookie('error', err.message);
        e401()
      } else {
        res.cookie('id', row.id); // Если забудешь, зачем ты писал кукисы, отвечаю - НАДА
        res.status(200).redirect("/profile");
      }
    });
  }catch(err){
    res.status(500).redirect('/login');
    console.log(err)
  }
});

app.get('/sqlite-data', async (req, res) => {
    console.log('API try to get info to profile: '+req.cookies.id);
    db.all(`SELECT * FROM users WHERE id = ${req.cookies.id}`, (error, rows) => {
    const row = rows[0]
    if (error) {
      console.error(error);
      res.status(500).cookie('error', error);
      e500(res)
    }else{
      try{
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
          <li>
            <span>Change description:</span>
            <form action="/description" method="post">
              <input type="text" name="description" id="des"> <br/>
              <input type="submit" value="Submit">  
            </form>
          </li>
        </ul>
      </div>`
      res.send('document.getElementById("user").innerHTML = `'+html+'`;')
      }catch(err){res.send("document.getElementById('user').innerHTML = `<h2>YOU'RE  NOT  LOGINED  TO  THIS  SITE!!!<h2>`;"); console.error('client fail');}
    ;}
  })
});

app.get('/sqlite-data/:id', async (req, res) => {
  const id = req.params.id;
  console.log('API: try to get info to profile: '+ id);
  db.all(`SELECT * FROM users WHERE id = ${id}`, (error, rows) => {
    const row = rows[0]
    if (error) {
      console.error(error);
      res.status(500).cookie('error', err.message);
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
      console.error(err.message);
      res.status(500).cookie('error', err.message);
      e500(res)
    } else {
      res.status(200).redirect('/profile');
    }
  });
});
//API

app.get('/api/users/:email/:password/:id/:type', (req, res) => {
  const userId = req.params.id;
  const type = req.params.type;
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
      
      db.get(`SELECT `+type+` FROM users WHERE id = `+userId, (err, row) =>{
        if (err) {
          console.error(err);
          res.status(500).send('Server error');
        }
        else if (!row) {
          console.log('User not found');
          res.status(401).send('You need to be logged in to see this page.');
        }
        else {
          console.log(row)
          res.status(200).send(row)
        }
      })
    }
  });
})

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

app.get('/api/users/:email/:password/:id', (req, res) => {
  const userId = req.params.id;
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
      db.get(`SELECT * FROM users WHERE id = `+userId, (err, row) =>{
        if (err) {
          console.error(err);
          res.status(500).send('Server error');
        }
        else if (!row) {
          res.status(401).send('You need to be logged in to see this page.');
        }
        else {
          db.get('SELECT * FROM users WHERE id = ' + userId, (err, row) => {
            if (err) {
              console.error(err);
              res.status(500).send('Server error');
            }
            else if (!row) {
              console.log('User not found');
              res.status(401).send('You need to be logged in to see this page.');
            }
            else {
              console.log(row.id);
              res.status(200).send(row)
            }
          });
        }
      })
    }
  });
})

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


// Start the server
const port = process.env.PORT || 18256;
app.listen(port, () => {
  console.log(`API: started on port ${port}`);
});
