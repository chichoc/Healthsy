import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFetchApi, addPageNum, showApiData } from '../store/features/saleSlice';
import SaleList from '../components/SaleList';
import SaleNav from '../components/SaleNav';
import SaleSort from '../components/SaleSort';
import withPage from './withPage';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Sale = () => {
  // request state
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const apiDataBottom = useRef(null);

  let { category } = useParams();
  const selectedNav = useSelector((state) => state.sale.value.selectedNav[category]);
  const fetchApi = useSelector((state) => state.sale.value.fetchApi);
  const dispatch = useDispatch();

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  };

  useLayoutEffect(() => {
    const getApiData = async () => {
      try {
        setApiLoading(true);
        const { data } = await axios.post('http://localhost:8888/sale/getApiData', {
          startIdx: 0,
          endIdx: 100,
          category,
          selectedNav,
        });
        dispatch(addFetchApi(data));
      } catch (error) {
        setApiError(error);
        console.log(error);
      } finally {
        setApiLoading(false);
      }
    };
    getApiData();
  }, [selectedNav, category, dispatch]);

  useEffect(() => {
    if (fetchApi.data.length === 0) return;

    const handleIntersection = async (entries) => {
      if (!entries[0].isIntersecting) return;
      if (!apiLoading) {
        dispatch(showApiData());
        dispatch(addPageNum());
      }
    };
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    if (apiDataBottom.current) observer.observe(apiDataBottom.current);

    return () => observer.disconnect();
  }, [apiLoading, fetchApi.data, dispatch]);

  return (
    <>
      <SaleNav />
      <SaleSort />
      <SaleList apiLoading={apiLoading} apiError={apiError} apiDataBottom={apiDataBottom} />
    </>
  );
};

export default withPage(Sale);
