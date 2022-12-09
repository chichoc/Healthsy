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

router.post('/fetchProduct', async (req, res, next) => {
  const { productId } = await req.body;

  const columnNames = [
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
  let executeSql =
    'SELECT p.id, p.brand, p.price, p.raw_material, p.status, count(r.id) as count, truncate(avg(r.score), 1) as score';
  columnNames.forEach((column) => (executeSql += `, api->"$.${column}" as ${column} `));
  executeSql += 'FROM products p LEFT OUTER JOIN reviews r ON p.id = r.prod_id WHERE p.id = ? GROUP BY p.id';

  const [rows, fields] = await (await db).execute(executeSql, [productId]);
  res.send(rows);
});

router.post('/fetchReviews', async (req, res, next) => {
  const { productId, pageNumDiffer, sort, cursorIdx } = await req.body;

  const joinSql = `SELECT reviews.id, users.name, reviews.score, reviews.content, reviews.image, reviews.thumbs_up as thumbsUp, reviews.thumbs_down as thumbsDown, date_format(reviews.reg_date,"%Y.%m.%d.") as date 
  FROM reviews join users 
  ON reviews.user_id = users.id `;

  let conditionalSql = 'WHERE prod_id = ? ';
  if (cursorIdx) {
    conditionalSql += pageNumDiffer > 0 ? `and reviews.id < ${cursorIdx} ` : `and reviews.id > ${cursorIdx} `;
  }
  const firstIdx = (Math.abs(pageNumDiffer) - 1) * 10;
  let orderSql = 'ORDER BY ';
  switch (sort) {
    case 'thumbsUp':
      orderSql += 'thumbsUp DESC,';
      break;
    case 'highScores':
      orderSql += 'reviews.score DESC,';
      break;
    case 'lowScores':
      orderSql += 'reviews.score ASC,';
      break;
  }
  orderSql += `reviews.id ${cursorIdx && pageNumDiffer < 0 ? 'ASC' : 'DESC'} limit ${firstIdx}, 10`;

  const [rows, fields] = await (await db).execute(joinSql + conditionalSql + orderSql, [productId]);

  res.json(cursorIdx && pageNumDiffer < 0 ? rows.reverse() : rows);
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
  const { reviewId, typeOfThumbs, capitalizedTypeOfThumbs, sign } = await req.body;

  const updateSql = `UPDATE reviews SET thumbs_${typeOfThumbs} = reviews.thumbs_${typeOfThumbs} ${sign} 1 WHERE id=?`;

  await (await db).execute(updateSql, [reviewId]);

  const [rows, fields] = await (
    await db
  ).execute(`SELECT id, thumbs_${typeOfThumbs} as thumbs${capitalizedTypeOfThumbs} FROM reviews WHERE id = ?`, [
    reviewId,
  ]);
  res.json({ ...rows });
});

router.post('/changeBookMarks', async (req, res, next) => {
  try {
    const { userId, productId } = req.body;

    const [rowToCheck, _] = await (
      await db
    ).execute(`SELECT count(*) as isBookmarked FROM bookmarks WHERE user_id = UNHEX(?) AND prod_id = ${productId}`, [
      userId,
    ]);

    const addBookmark = async () => {
      const insertionSql = `INSERT INTO bookmarks (user_id, prod_id) VALUES (UNHEX(?), ${productId})`;
      await (await db).execute(insertionSql, [userId]);
      return true;
    };

    const removeBookmark = async () => {
      const deletionSql = `DELETE FROM bookmarks WHERE user_id = UNHEX(?) AND prod_id = ${productId}`;
      await (await db).execute(deletionSql, [userId]);
      return false;
    };

    const isBookmarked = rowToCheck[0].isBookmarked ? await removeBookmark() : await addBookmark();

    const [rowsToCount, fields] = await (
      await db
    ).execute(`SELECT count(*) as count FROM bookmarks WHERE prod_id = ${productId}`);

    res.json({ isBookmarked, count: rowsToCount[0].count });
  } catch (err) {
    next(err);
  }
});
router.post('/fetchBookmarks', async (req, res, next) => {
  try {
    const { userId } = req.body;

    const executionQuery = `SELECT p.id, p.api->"$.PRDLST_NM" as PRDLST_NM, p.brand, p.price, p.status, count(r.id) as count, truncate(avg(r.score), 1) as score
    FROM bookmarks b 
    INNER JOIN products p 
    ON b.user_id = ? OR b.prod_id = p.id
    LEFT OUTER JOIN reviews r
    ON p.id = r.prod_id
    GROUP BY p.id
    LIMIT 0, 100`;

    const [rows, fields] = await (await db).execute(executionQuery, [userId]);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
