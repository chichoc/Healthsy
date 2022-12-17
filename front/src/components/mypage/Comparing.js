import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import HorizontalList from '../reusable/HorizontalList';
import ComparingTable from '../reusable/ComparingTable';
import NotFound from '../reusable/NotFound';
import dataComparing from '../../assets/api/dataComparing';

const Comparing = () => {
  const userId = useSelector((state) => state.page.userId);

  const [comparings, setComparings] = useState([]);
  const [selectedComparings, setSelectedComparings] = useState([]);
  // request state
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleCheck = (id) => {
    const isSelected = selectedComparings.findIndex((comparing) => comparing.id === id);
    isSelected !== -1
      ? setSelectedComparings((prev) => prev.filter((comparing) => comparing.id !== id))
      : setSelectedComparings((prev) => [...prev, { ...comparings.find((comparing) => comparing.id === id) }]);
  };

  const fetchComparings = async () => {
    try {
      setApiLoading(true);
      const { data } = await axios.post('http://localhost:8888/mypage/fetchComparings', {
        userId,
      });
      setComparings(data);
    } catch (error) {
      setApiError(error);
      console.log(error);
    } finally {
      setApiLoading(false);
    }
  };

  const fetchSelectedComparings = async () => {
    try {
      setApiLoading(true);
      const { data } = await axios.post('http://localhost:8888/mypage/fetchSelectedComparings', {
        userId,
        productIds: selectedComparings.map((comparing) => comparing.id),
      });
      setComparings(data);
    } catch (error) {
      setApiError(error);
      console.log(error);
    } finally {
      setApiLoading(false);
    }
  };

  useEffect(() => {
    fetchComparings();
  }, []);

  useEffect(() => {
    fetchSelectedComparings();
  }, [selectedComparings]);

  return (
    <>
      <h1>비교함 {!apiError && comparings.length}</h1>
      {apiError ? (
        <NotFound text={'오류가 발생했습니다. \n잠시 후에 다시 시도해주시기 바랍니다.'} />
      ) : (
        <>
          <p>
            최대 3개까지 선택 가능합니다 <span>({selectedComparings.length}/3)</span>
          </p>
          <HorizontalList
            salesToDisplay={comparings}
            check={true}
            checkedSales={selectedComparings}
            handleCheck={handleCheck}
          />
          <ComparingTable columns={dataComparing} datas={selectedComparings} />
        </>
      )}
    </>
  );
};

export default Comparing;
