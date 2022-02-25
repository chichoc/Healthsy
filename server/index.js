const express = require('express');
const app = express();
const PORT = 8888;
const cors = require('cors');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1111',
  database: 'login',
});

connection.connect();

app.use(express.json());

app.listen(PORT, () => {
  console.log('running on express', PORT);
});

app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

app.post('/join', (req, res) => {
  const { email, password } = req.body;

  connection.execute('INSERT INTO users (email, password) VALUES (?,?)', [email, password], (err, result) => {
    if (err) {
      throw err;
    }
    console.log('Data Inserted');
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  connection.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
      res.send(result);
      console.log('로그인 완료');
    } else ({ message: '잘못된 로그인입니다!' });
  });
});
