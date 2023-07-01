const crypto = require('crypto');

console.log('crypto ready')

function sha256Hash(input) {
  const hash = crypto.createHash('sha256');
  hash.update(input);
  return hash.digest('hex');
}

function sha512Hash(input) {
  const hash = crypto.createHash('sha512');
  hash.update(input);
  return hash.digest('hex');
}
  
function md5Hash(input) {
  const hash = crypto.createHash('md5');
  hash.update(input);
  return hash.digest('hex');
}