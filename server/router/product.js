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

router.post('/countReviews', async (req, res, next) => {
  const { productId } = await req.body;

  db.execute(
    `SELECT count(*) as reviews, truncate(avg(reviews.score),1) as score FROM reviews WHERE prod_id = ? ORDER BY id DESC`,
    [productId],
    (error, result) => {
      if (error) next(error);
      else res.json({ result });
    }
  );
});

router.post('/getReviews', async (req, res, next) => {
  const { productId, startIdx, endIdx } = await req.body;

  db.execute(
    `SELECT users.name, reviews.score, reviews.content, date_format(reviews.reg_date,"%Y.%m.%d.") as date 
    FROM (SELECT * FROM reviews 
          WHERE prod_id = ? and reviews.id > ? and reviews.id <= ?
          ORDER BY id DESC
          ) reviews 
          join users on reviews.user_id = users.id
          ORDER BY reviews.id DESC`,
    [productId, startIdx, endIdx],
    (error, result) => {
      if (error) next(error);
      else res.json({ result });
    }
  );
});

module.exports = router;
