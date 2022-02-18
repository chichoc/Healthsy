require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 8888;
const axios = require('axios');
const cors = require('cors');

const cors_option = {
  whiteList: [process.env.CLIENT_ORIGIN_1],
};

app.use(cors({ origin: cors_option.whiteList }));

app.listen(PORT, () => {
  console.log('express running on ', PORT);
});
