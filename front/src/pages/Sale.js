import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import SaleList from '../components/SaleList';
import SaleNav from '../components/SaleNav';
import withPage from './withPage';
import axios from 'axios';
import SaleSort from '../components/SaleSort';

const Sale = () => {
  const [apiDb, setApiDb] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [dataCount, setDataCount] = useState(9);
  const [pageNum, setPageNum] = useState(1);
  // request state
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const apiDataBottom = useRef(null);

  const getApiData = useCallback(async () => {
    try {
      setApiLoading(true);
      const { data } = await axios.post('http://localhost:8888/sale/getApiData', { startIdx: 0, endIdx: 100 });
      setApiDb(...apiDb, data);
    } catch (error) {
      setApiError(error);
      console.log(error);
    } finally {
      setApiLoading(false);
    }
  }, [apiDb]);

  const range = (start, stop, step) => {
    return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
  };

  const showApiData = useCallback(() => {
    const showStartIdx = dataCount * (pageNum - 1);
    const showEndIdx = dataCount * pageNum - 1;
    console.log(apiDb.length);
    const rangeArray = range(showStartIdx, showEndIdx, 1);
    for (let i of rangeArray) {
      setApiData((prevApiData) => [...prevApiData, apiDb[i]]);
    }
    console.log(apiData);
  }, [dataCount, pageNum, apiDb, apiData]);

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  };

  useLayoutEffect(() => {
    getApiData();
  }, []);

  useEffect(() => {
    if (apiDb.length === 0) return;

    const handleIntersection = async (entries) => {
      if (!entries[0].isIntersecting) return;
      console.log('Intersect!');
      if (!apiLoading) {
        setPageNum((prevPageNum) => prevPageNum + 1);
        console.log(pageNum);
        showApiData();
      }
    };
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    if (apiDataBottom.current) observer.observe(apiDataBottom.current);

    return () => observer.disconnect();
  }, [apiLoading, pageNum, apiDb.length]);

  return (
    <>
      <SaleNav />
      <SaleSort />
      <SaleList apiData={apiData} apiLoading={apiLoading} apiError={apiError} apiDataBottom={apiDataBottom} />
    </>
  );
};

export default withPage(Sale);
