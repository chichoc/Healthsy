import React, { useState, useEffect, useRef, useCallback } from 'react';
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
      axios.get('http://localhost:8888/sale/getApiData', { startIdx: 1, endIdx: 10 }).then((res, req) => {
        setApiDb(...apiData, res.data);
      });
    } catch (error) {
      setApiError(error);
      console.log(error);
    } finally {
      setApiLoading(false);
    }
  }, []);

  const range = (start, stop, step) => {
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
  };

  const showApiData = () => {
    const showStartIdx = 1 + dataCount * (pageNum - 1);
    const showEndIdx = dataCount * pageNum;
    for (let i of range(showStartIdx, showEndIdx, 1)) {
      setApiData(...apiDb[i]);
    }
  };

  useEffect(() => {
    getApiData();
    const handleIntersection = async (entries) => {
      if (!entries[0].isIntersecting) return;
      console.log('Intersect!');
      if (!apiLoading) {
        setPageNum((prevPageNum) => prevPageNum + 1);
        console.log(pageNum);
        showApiData();
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
