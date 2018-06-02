const express = require('express');
const compression = require('compression');
const app = express();
const port = process.env.PORT || 3000;

app.use(compression());
app.use(express.static('public'));

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
});
