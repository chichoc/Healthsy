require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../config-mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const nodemailer = require('nodemailer');
const { customAlphabet } = require('nanoid');
const alphabet = '0123456789ABCDEFabcdef';

router.post('/duplicateEmail', async (req, res, next) => {
  try {
    const [rows, fields] = await (
      await db
    ).execute('SELECT date_format(join_date,"%Y년 %m월 %d일") as joinDate FROM users WHERE email = ?', [
      req.body.email,
    ]);
    if (!rows.length) res.json({ joinDate: 0 });
    else res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

router.post('/sendEmail', (req, res, next) => {
  const { email } = req.body;
  let userEmail = email;
  let verifyCode = Math.floor(Math.random() * 1000000);

  const transporter = nodemailer.createTransport({
    service: process.env.TRANSPORTER_SERVICE,
    port: process.env.TRANSPORTER_PORT,
    host: process.env.TRANSPORTER_HOST,
    secure: false,
    auth: {
      user: process.env.TRANSPORTER_AUTH_USER,
      pass: process.env.TRANSPORTER_AUTH_PASSWORD,
    },
  });

  const message = {
    from: process.env.TRANSPORTER_AUTH_USER,
    to: userEmail,
    subject: 'Healthsy 인증번호 입니다.',
    text: `아래 인증번호를 5분 내로 입력해주세요. \n ${verifyCode} `,
  };

  transporter.sendMail(message, function (error, result) {
    if (error) next(error);
    else console.log('전송 완료 ' + result.response);
  });
  res.send({ sendedCode: verifyCode });
});

router.post('/dataInsert', async (req, res, next) => {
  try {
    const { email, password, name, phone, checkMarketing } = req.body;

    const nanoid = customAlphabet(alphabet, 14);

    checkMarketing ? (marketing = 'Y') : (marketing = 'N');

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await (
      await db
    ).execute('INSERT INTO users (id, email, password, name, phone, marketing) VALUES (UNHEX(?),?,?,?,?,?)', [
      nanoid(),
      email,
      hashedPassword,
      name,
      phone,
      marketing,
    ]);
    res.send('success');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
