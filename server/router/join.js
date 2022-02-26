const express = require('express');
const router = express.Router();
const db = require('../config');

router.use(express.json());

router.post('/join', (req, res) => {
  const { email, password } = req.body;

  db.execute('INSERT INTO users (email, password) VALUES (?,?)', [email, password], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Data Inserted');
    }
  });
});

module.exports = router;
