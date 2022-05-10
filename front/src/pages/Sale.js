import React, { useState, useEffect, useRef, useCallback } from 'react';
import SaleList from '../components/SaleList';
import SaleNav from '../components/SaleNav';
import withPage from './withPage';
import axios from 'axios';
import SaleSort from '../components/SaleSort';

const Sale = () => {
  const [apiData, setApiData] = useState([]);
  const [dataCount, setDataCount] = useState(9);
  const [pageNum, setPageNum] = useState(1);
  // request state
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const apiDataBottom = useRef(null);

  const replaceApiUrl = useCallback((serviceId, startIdx, endIdx) => {
    const apiUrlPath = [process.env.REACT_APP_OPEN_API_KEY_ID, serviceId, 'json', startIdx, endIdx];
    const apiUrl = new URL(apiUrlPath.join('/'), 'http://openapi.foodsafetykorea.go.kr/api/');
    return apiUrl.href;
  }, []);

  const getApiData = useCallback(async () => {
    try {
      setApiLoading(true);
      const requestApiUrl = replaceApiUrl('C003', 1 + dataCount * (pageNum - 1), dataCount * pageNum);
      const apiResponse = await axios.get(requestApiUrl);
      const updateApiData = apiData.concat(apiResponse.data.C003.row);
      setApiData(updateApiData);
    } catch (error) {
      setApiError(error);
      console.log(error);
    } finally {
      setApiLoading(false);
    }
  }, [dataCount, pageNum]);

  useEffect(() => {
    const handleIntersection = async (entries) => {
      if (!entries[0].isIntersecting) return;
      console.log('Intersect!');
      if (!apiLoading) {
        setPageNum((prevPageNum) => prevPageNum + 1);
        console.log(pageNum);
        await getApiData();
      }
    };
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    if (apiDataBottom.current) observer.observe(apiDataBottom.current);
    return () => observer.disconnect();
  }, [pageNum]);

  return (
    <>
      <SaleNav />
      <SaleSort />
      <SaleList apiData={apiData} apiLoading={apiLoading} apiError={apiError} apiDataBottom={apiDataBottom} />
    </>
  );
};

export default withPage(Sale);
