require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../config-mysql');
const fs = require('fs');

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
      let reqEndNum;
      count === reqCount - 1
        ? (reqEndNum = startNum + 1000 * count + ((endNum - startNum) % 1000))
        : (reqEndNum = startNum + 1000 * (count + 1) - 1);
      const requestApiUrl = setApiUrl('C003', reqStartNum, reqEndNum);
      // 현재 진행 중인 요청 url
      console.log(requestApiUrl);
      const apiResponse = await axios.get(requestApiUrl);
      // 원하는 항목이 있으면 해당하는 데이터만 배열로
      if (item) {
        await apiResponse.data.C003.row.map((product) => {
          // 주식회사 또는 주) 또는 (주) 제거
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
  apiData.map((product) => {
    const keyWordBrand = removeStr(product.BSSH_NM, /\(.*?\)/g, ['주)', '주식회사', '농업회사법인', '법인']);
    const keyWordRaw = product.RAWMTRL_NM.replace(/\(.*?\)/g, '');
    // null 또는 undefined가 있으면 값 넣어줘야 함
    db.execute(
      'INSERT INTO products (prod_id, prod_api, prod_brand, prod_raw) VALUES (?,?,?,?)',
      [Number(product.PRDLST_REPORT_NO), product, keyWordBrand, keyWordRaw],
      (error, result) => {
        if (error) console.log(error);
      }
    );
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
  // prod_raw 최대자릿수로 datatype 설정: 2843
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
// sortObjectValue();

router.post('/getApiData', async (req, res, next) => {
  const { startIdx, endIdx, category, selectedNav } = await req.body;
  const result = selectedNav
    .map((nav) => {
      return "'" + nav.replace("'", "''") + "'";
    })
    .join();

  // await DataToDb(startIdx + 1, startIdx + 1000);
  db.execute(
    `SELECT prod_id, prod_api->"$.PRDLST_NM" as PRDLST_NM, prod_brand , prod_price, prod_stock FROM products where prod_brand in (${result})`,
    [startIdx, endIdx],
    (error, result) => {
      if (error) next(error);
      else res.send(result);
    }
  );
});

module.exports = router;
