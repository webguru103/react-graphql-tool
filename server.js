const express = require('express');
const path = require('path');

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/assets', express.static('assets'));

if (process.env.PRODUCTION) {
  app.use('/', express.static('dist'));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
  });
}

const port = process.env.PRODUCTION ? 10000 : 10100;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening to port ${port}...`);
});
