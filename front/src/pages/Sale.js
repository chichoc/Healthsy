import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import SaleList from '../components/SaleList';
import SaleNav from '../components/SaleNav';
import SaleSort from '../components/SaleSort';
import withPage from './withPage';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Sale = () => {
  const [apiDb, setApiDb] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [dataCount, setDataCount] = useState(9);
  const [pageNum, setPageNum] = useState(1);
  // request state
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  let { category } = useParams();
  const selectedNav = useSelector((state) => state.sale.value.selectedNav[category]);

  const apiDataBottom = useRef(null);

  const getApiData = useCallback(async () => {
    try {
      setApiLoading(true);
      const { data } = await axios.post('http://localhost:8888/sale/getApiData', {
        startIdx: 0,
        endIdx: 100,
        category,
        selectedNav,
      });
      setApiDb(...apiDb, data);
    } catch (error) {
      setApiError(error);
      console.log(error);
    } finally {
      setApiLoading(false);
    }
  }, [apiDb, selectedNav]);

  const range = (start, stop, step) => {
    return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
  };

  const showApiData = useCallback(() => {
    const showStartIdx = dataCount * (pageNum - 1);
    const showEndIdx = dataCount * pageNum - 1;
    const rangeArray = range(showStartIdx, showEndIdx, 1);
    for (let i of rangeArray) {
      setApiData((prevApiData) => [...prevApiData, apiDb[i]]);
    }
  }, [dataCount, pageNum, apiDb, apiData]);

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  };

  useLayoutEffect(() => {
    getApiData();
  }, [selectedNav]);

  useEffect(() => {
    if (apiDb.length === 0) return;

    const handleIntersection = async (entries) => {
      if (!entries[0].isIntersecting) return;
      if (!apiLoading) {
        setPageNum((prevPageNum) => prevPageNum + 1);
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
