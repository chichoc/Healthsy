const express = require('express');
const router = express.Router();

const JoinRouter = require('./join');
const LoginRouter = require('./login');

router.use('/join', JoinRouter);
router.use('/login', LoginRouter);

module.exports = router;
