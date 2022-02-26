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

const JoinRouter = require('./router/join');
const LoginRouter = require('./router/login');

app.use('/join', JoinRouter);
app.use('/login', LoginRouter);

app.listen(PORT, () => {
  console.log('running on express', PORT);
});
