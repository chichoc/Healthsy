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

app.listen(PORT, () => {
  console.log('running on express', PORT);
});
