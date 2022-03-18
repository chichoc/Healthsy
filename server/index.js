const express = require('express');
const app = express();
const PORT = 8888;
const cors = require('cors');

app.use(express.json());

app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

const router = require('./router');
app.use('/', router);

app.use((req, res, next) => {
  res.status(404).send('요청과 일치하는 주소가 없습니다!');
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send('Server error!');
});

app.listen(PORT, () => {
  console.log('running on express', PORT);
});
