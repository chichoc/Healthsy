import React, { useState, useEffect } from 'react';
import SaleList from '../components/SaleList';
import SaleNav from '../components/SaleNav';
import withPage from './withPage';
import axios from 'axios';
import SaleSort from '../components/SaleSort';

const Sale = () => {
  const [apiData, setApiData] = useState();
  const [dataCount, setdataCount] = useState(9);
  let dataCountMulti = 1;

  const replaceApiUrl = (serviceId, startIdx, endIdx) => {
    const apiUrlPath = [process.env.REACT_APP_OPEN_API_KEY_ID, serviceId, 'json', startIdx, endIdx];
    const apiUrl = new URL(apiUrlPath.join('/'), 'http://openapi.foodsafetykorea.go.kr/api/');
    return apiUrl.href;
  };

  axios
    .get(replaceApiUrl('C003', 1 * dataCountMulti, dataCount * dataCountMulti))
    .then((res) => {
      setApiData(res.data.C003.row);
      dataCountMulti += 1;
    })
    .catch((error) => console.log(error));

  return (
    <>
      <SaleNav />
      <SaleSort />
      <SaleList apiData={apiData} />
    </>
  );
};

export default withPage(Sale);
