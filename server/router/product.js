require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../config-mysql');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/countReviews', async (req, res, next) => {
  const { productId } = await req.body;

  const [result, fields] = await (
    await db
  ).execute(
    `SELECT count(*) as reviews, truncate(avg(reviews.score),1) as score 
    FROM reviews 
    WHERE prod_id = ?`,
    [productId]
  );

  res.json({ result });
});

router.post('/fetchProduct', async (req, res, next) => {
  const { productId } = await req.body;

  const columnName = [
    'LCNS_NO',
    'BSSH_NM',
    'PRDLST_REPORT_NO',
    'PRDLST_NM',
    'PRMS_DT',
    'POG_DAYCNT',
    'DISPOS',
    'NTK_MTHD',
    'PRIMARY_FNCLTY',
    'IFTKN_ATNT_MATR_CN',
    'CSTDY_MTHD',
    'STDR_STND',
    'CRAWMTRL_NM',
    'CRET_DTM',
    'LAST_UPDT_DTM',
    'PRDT_SHAP_CD_NM',
  ];
  let executeSql = 'SELECT id, brand, price, raw_material, stock';
  columnName.map((column) => (executeSql += `, api->"$.${column}" as ${column} `));
  executeSql += 'FROM products where id = ?';

  const [rows, fields] = await (await db).execute(executeSql, [productId]);
  res.send(rows);
});

router.post('/fetchReviews', async (req, res, next) => {
  const { productId, pageNumDiffer, sort, cursorIdx } = await req.body;

  const executeSql = `SELECT reviews.id, users.name, reviews.score, reviews.content, reviews.photo, reviews.thumbs_up as thumbsUp, date_format(reviews.reg_date,"%Y.%m.%d.") as date 
  FROM reviews join users on reviews.user_id = users.id WHERE prod_id = ? `;

  let conditionalSql = 'ORDER BY reviews.id DESC ';
  if (cursorIdx) {
    conditionalSql =
      pageNumDiffer > 0
        ? `and reviews.id < ${cursorIdx} ORDER BY reviews.id DESC `
        : `and reviews.id > ${cursorIdx} ORDER BY reviews.id ASC `;
  }

  const firstIdx = (Math.abs(pageNumDiffer) - 1) * 10;
  const limitSql = `limit ${firstIdx}, 10`;

  const [rows, fields] = await (await db).execute(executeSql + conditionalSql + limitSql, [productId]);

  res.json(pageNumDiffer > 0 ? rows : rows.reverse());
});

router.use('/photo', express.static('./uploads'));
router.post('/addReview', upload.single('file'), async (req, res, next) => {
  const { userId, productId, selectedScore, content } = await req.body;
  let photoPath;

  if (req.file) {
    photoPath = 'http://localhost:8888/photo/' + req.file.filename;
  }

  let executeSql = `INSERT INTO reviews (prod_id, user_id, score, content` + (!req.file ? `) ` : `, photo) `);

  executeSql +=
    `VALUES (${productId}, UNHEX(?), ${selectedScore}, '${content}'` + (!req.file ? `)` : `, '${photoPath}')`);

  const [rows, fields] = await (await db).execute(executeSql, [userId]);
  if (rows.affectedRows === 1) {
    res.json({ addReview: true });
  }
});

router.post('/addReviewThumbs', async (req, res, next) => {
  const { reviewId, thumbs, sign } = await req.body;
  console.log(reviewId, thumbs, sign);

  const executeSql = `UPDATE reviews SET thumbs_${thumbs} = reviews.thumbs_${thumbs} ${sign} 1 WHERE id=?`;

  await (await db).execute(executeSql, [reviewId]);

  if (thumbs === 'up') {
    const [rows, fields] = await (
      await db
    ).execute('SELECT id, thumbs_up as thumbsUp FROM reviews WHERE id = ?', [reviewId]);
    res.json({ rows });
  } else {
    res.json();
  }
});

module.exports = router;
