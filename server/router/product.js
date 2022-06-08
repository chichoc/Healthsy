require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../config-mysql');

router.post('/addReview', async (req, res, next) => {
  const { productId, userId, score, content } = await req.body;

  db.execute(
    'INSERT INTO reviews (prod_id, user_id, score, content) VALUES (?,UNHEX(?),?,?)',
    [productId, userId, score, content],
    (error, result) => {
      if (error) next(error);
      else if (result.affectedRows === 1) {
        res.json({ addReview: true });
      }
    }
  );
});

router.post('/getReviews', async (req, res, next) => {
  const { productId } = await req.body;

  db.execute(
    'SELECT users.name, review.score, review.content, review.reg_date FROM (SELECT * FROM reviews WHERE prod_id = ?) review join users on review.user_id = users.id',
    [productId],
    (error, result) => {
      if (error) next(error);
      else {
        res.json({ result });
      }
    }
  );
});

module.exports = router;
