require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();
const { removeStopwords, kor } = require('stopword');

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const DataToDb = async (array) => {
  const apiData = await getApiData(array, 1, 3000);
  apiData.map((product) => {
    db.execute(
      'INSERT INTO users (prod_id, prod_api) VALUES (?,?)',
      [Number(product.PRDLST_REPORT_NO), product],
      (error, result) => {
        if (error) next(error);
        else {
          console.log(result);
        }
      }
    );
  });
};

const setApiUrl = (serviceId, startIdx, endIdx) => {
  const apiUrlPath = [process.env.OPEN_API_KEY, serviceId, 'json', startIdx, endIdx];
  const apiUrl = new URL(apiUrlPath.join('/'), 'http://openapi.foodsafetykorea.go.kr/api/');
  return apiUrl.href;
};

const getApiData = async (array, startNum, endNum, item) => {
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
      if (item)
        await apiResponse.data.C003.row.map((product) => {
          array.push(product[item]);
        });
      // 아니면 전체 데이터를 합침
      else apiData = [...apiResponse.data.C003.row];
      await sleep(2000);
    }
  } catch (error) {
    console.log(error);
  }
  return item ? await array : apiData;
};

const isDuplicate = async (array) => {
  const result = await array.some((elem) => {
    return array.indexOf(elem) !== array.lastIndexOf(elem);
  });
  return result;
};

// PRDLST_REPORT_NO 중복 여부 확인 후 PK 설정 및 최대자릿수로 datatype 설정
const checkPk = async (array) => {
  array = await getApiData(array, 1, 3000, 'PRDLST_REPORT_NO');
  const lengthArray = await array.map((pk) => pk.length);
  console.log(array.length, await isDuplicate(array), Math.max(...lengthArray));
};

const checkFN = async (array) => {
  const circledNumbers = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'];
  array = await getApiData(array, 1, 10, 'PRIMARY_FNCLTY');
  const keyWordFn = array.map((func) => {
    const splitStr = ['\r\n', ' ', ...circledNumbers];
    for (const str of splitStr) {
      func = func.split(str);
    }
    console.log(func);
    return removeStopwords(func, kor);
  });
  console.log(keyWordFn);
};

let apiData = [];
checkPk(apiData);
checkFN(apiData);
DataToDb(apiData);

module.exports = router;
