const express = require('express');
const app = express();

app.get('/test', (req, res) => {
  res.json({ result: true });
});

app.listen(8888, () => {
  console.log('running on express');
});
