require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');
const db = require('../config-mysql');

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const removeStr = (str, regex, replaceWord) => {
  let strReplaced = str;
  strReplaced = strReplaced.replace(regex, '');
  for (let word of replaceWord) {
    strReplaced = strReplaced.replace(word, '');
  }
  return strReplaced.trim();
};

const setApiUrl = (serviceId, startIdx, endIdx) => {
  const apiUrlPath = [process.env.OPEN_API_KEY, serviceId, 'json', startIdx, endIdx];
  const apiUrl = new URL(apiUrlPath.join('/'), 'http://openapi.foodsafetykorea.go.kr/api/');
  return apiUrl.href;
};

const getApiData = async (startNum, endNum, item) => {
  let array = [];
  try {
    // 데이터 요청은 한번에 최대 1,000건
    const reqCount = Math.ceil((endNum - startNum + 1) / 1000);
    for (let count = 0; count < reqCount; count++) {
      const reqStartNum = startNum + 1000 * count;
      let reqEndNum =
        count === reqCount - 1
          ? startNum + 1000 * count + ((endNum - startNum) % 1000)
          : startNum + 1000 * (count + 1) - 1;
      // 현재 진행 중인 요청 url
      const requestApiUrl = setApiUrl('C003', reqStartNum, reqEndNum);
      console.log(requestApiUrl);
      const apiResponse = await axios.get(requestApiUrl);
      // 원하는 항목이 있으면 해당하는 데이터만 배열로
      if (item) {
        await apiResponse.data.C003.row.map((product) => {
          // 회사명 간소화
          if (item === 'BSSH_NM') {
            const replacedStr = removeStr(product[item], /\(.*?\)/g, ['주)', '주식회사', '농업회사법인', '법인']);
            array.push(replacedStr);
          } else {
            array.push(product[item]);
          }
        });
      }
      // 아니면 전체 데이터를 합침
      else apiData = [...apiResponse.data.C003.row];
      await sleep(2000);
    }
  } catch (error) {
    console.log(error);
  }
  return item ? array : apiData;
};

const DataToDb = async (startIdx, endIdx) => {
  const apiData = await getApiData(startIdx, endIdx);
  apiData.forEach(async (product) => {
    const keyWordBrand = removeStr(product.BSSH_NM, /\(.*?\)/g, ['주)', '주식회사', '농업회사법인', '법인']);
    const keyWordRaw = product.RAWMTRL_NM.replace(/\(.*?\)/g, '');
    // null 또는 undefined가 있으면 값 넣어줘야 함

    await (
      await db
    ).execute('INSERT INTO products (id, api, brand, raw_material) VALUES (?,?,?,?)', [
      +product.PRDLST_REPORT_NO,
      product,
      keyWordBrand,
      keyWordRaw,
    ]);
  });
  console.log('DataToDb: success');
};

const isDuplicate = async (array) => {
  const result = await array.some((elem) => {
    return array.indexOf(elem) !== array.lastIndexOf(elem);
  });
  return result;
};

// PRDLST_REPORT_NO 중복 여부 확인 후 PK 설정 및 최대자릿수로 datatype 설정
const checkPk = async () => {
  apiDataArray = await getApiData(1, 3000, 'PRDLST_REPORT_NO');
  const lengthArray = await apiDataArray.map((pk) => pk.length);
  console.log(apiDataArray.length, await isDuplicate(apiDataArray), Math.max(...lengthArray));
};

const checkBrand = async () => {
  const apiDataArray = await getApiData(1, 3000, 'BSSH_NM');
  // 브랜드 언급 횟수
  const result = apiDataArray.reduce((allBrands, brand) => {
    if (brand in allBrands) allBrands[brand]++;
    else allBrands[brand] = 1;
    return allBrands;
  }, {});
  // console.log(sortLarge(result), Object.keys(result).length);
  console.log(Object.keys(result).sort());
};

const getFN = async () => {
  let data = await getApiData(1, 1000, 'PRIMARY_FNCLTY');
  const dataJSON = JSON.stringify(data);
  fs.writeFileSync('FN.json', dataJSON);
};

const checkRaw = async () => {
  const apiDataRaw = await getApiData(1, 3000, 'RAWMTRL_NM');
  const keyWordRaw = apiDataRaw.map((raw) => raw.replace(/\(.*?\)/g, ''));
  // raw 최대자릿수로 datatype 설정: 2843
  console.log(Math.max(...(await keyWordRaw.map((raw) => raw.length))));
};

const sortLarge = async (array) => {
  // const array = JSON.parse(fs.readFileSync('./db/map-nouns-to-count.json'));
  const sortedObject = Object.entries(array)
    .sort(([, a], [, b]) => b - a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
  return sortedObject;
};

// checkPk();
// checkBrand();
// checkRaw();

router.post('/getApiData', async (req, res, next) => {
  try {
    const { startIdx, countUnit, category, selectedNav, sort } = await req.body;
    // API는 1부터 (10/18 기준 30,286건이라는데 30,298건)
    // await DataToDb(startIdx + 2, startIdx + 1000);
    const executeSql = `SELECT p.id, p.api->"$.PRDLST_NM" as PRDLST_NM, p.brand, p.price, p.status, count(r.id) as count, truncate(avg(r.score), 1) as score 
      FROM products p 
      left outer join reviews r 
      on p.id = r.prod_id 
      group by p.id`;

    const whereColumn =
      {
        nutrient: 'raw_material',
        brand: 'brand',
        func: 'api->"$.PRIMARY_FNCLTY"',
      }[category] ?? undefined;

    const reqexpString = !selectedNav
      ? "'" + selectedNav.map((nav) => (whereColumn === 'brand' ? '^' : '') + nav.replace("'", '')).join('|') + "'"
      : undefined;

    const addExecuteSql = !selectedNav
      ? executeSql + ` WHERE ${whereColumn} REGEXP (${reqexpString}) limit ?,?`
      : executeSql;

    let orderSql = ' ORDER BY';
    switch (sort) {
      case 'highScores':
        orderSql += ' score DESC,';
        break;
      case 'manyReviews':
        orderSql += ' count DESC,';
        break;
      case 'lowPrice':
        orderSql += ' p.price,';
        break;
      case 'highPrice':
        orderSql += ' p.price DESC,';
    }
    orderSql += ' p.api->"$.CRET_DTM" DESC limit ?,?';


    const [rows, fiedls] = await (await db).execute(addExecuteSql + orderSql, [startIdx, countUnit]);
    res.send(rows);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
