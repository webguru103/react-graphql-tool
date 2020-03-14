const fs = require('fs');
const git = require('simple-git'); // eslint-disable-line

// Creates .env file from .env.sample if .env not found.
if (!fs.existsSync('.env')) {
  fs.createReadStream('.env.sample')
    .pipe(fs.createWriteStream('.env'));
  console.info('.env file written from sample'); // eslint-disable-line
}

git().tags((err, tags) => {
  fs.readFile('.env', 'utf8', (err1, data) => {
    if (err1) {
      return console.log(err); // eslint-disable-line
    }
    const result = data.replace(/(VERSION_NUMBER=).*/, `VERSION_NUMBER=${tags.latest}`);
    fs.writeFile('.env', result, 'utf8', (err2) => {
      if (err2) return console.log(err); // eslint-disable-line
      return null;
    });
    return null;
  });
});
