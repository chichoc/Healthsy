import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import withPage from './withPage';
import useIntersect from '../components/customHook/useIntersect';
import SaleList from '../components/sale/SaleList';
import SaleNav from '../components/sale/SaleNav';
import SaleSort from '../components/sale/SaleSort';

const Sale = () => {
  const [sales, setSales] = useState([]);
  const [salesToDisplay, setSalesToDisplay] = useState([]);
  const bottomOfSalesToDisplay = useRef(null);

  const currentPageToFetch = useRef(0);

  // request state
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  let { category } = useParams();
  const selectedNav = useSelector((state) => state.sale.selectedNav[category]);
  const countUnitToDisplay = useSelector((state) => state.sale.countUnit);
  const fetchSort = useSelector((state) => state.sale.sort);

  const addSales = async () => {
    try {
      setApiLoading(true);
      const { data } = await axios.post('http://localhost:8888/sale/getApiData', {
        startIdx: currentPageToFetch.current * 100,
        countUnit: 100,
        category,
        selectedNav,
        sort: fetchSort,
      });
      if (currentPageToFetch.current === 0) {
        // 카테고리, 특정 성분/브랜드/기능 버튼, 정렬방식 변경하여 새로이 fetch하는 경우
        setSales([...data.splice(countUnitToDisplay)]);
        setSalesToDisplay([...data]);
      } else {
        // IntersectionObserver에 의해 감지 & display할 sales가 countUnit보다 적은 경우
        const countToAdd = countUnitToDisplay - sales.length;
        setSalesToDisplay((prev) => [...prev, ...data.splice(0, countToAdd)]);
        setSales([...data]);
      }
    } catch (error) {
      setApiError(error);
      console.log(error);
    } finally {
      setApiLoading(false);
    }
  };

  const handleIntersection = async ([{ isIntersecting }]) => {
    if (apiLoading || apiError || !isIntersecting) return;
    if (sales.length <= countUnitToDisplay) {
      currentPageToFetch.current++;
      await addSales();
    } else {
      const salesToAdd = sales.slice(0, countUnitToDisplay);
      setSales((prev) => prev.filter((_, index) => index >= countUnitToDisplay));
      setSalesToDisplay((prev) => [...prev, ...salesToAdd]);
    }
  };

  useIntersect(bottomOfSalesToDisplay, {
    onIntersect: handleIntersection,
    rootMargin: '0px 100px',
    threshold: 0.3,
  });

  // 카테고리, 특정 성분/브랜드/기능 버튼, 정렬방식 변경시에만 새로이 fetch
  useEffect(() => {
    currentPageToFetch.current = 0;
    addSales();
  }, [category, fetchSort, selectedNav]);

  return (
    <>
      <SaleNav />
      <SaleSort />
      <SaleList
        apiLoading={apiLoading}
        apiError={apiError}
        bottomOfSalesToDisplay={bottomOfSalesToDisplay}
        salesToDisplay={salesToDisplay}
      />
    </>
  );
};

export default withPage(Sale);
