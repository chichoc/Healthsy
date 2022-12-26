import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import HorizontalList from '../reusable/HorizontalList';
import ComparingTable from '../reusable/ComparingTable';
import NotFound from '../reusable/NotFound';
import dataComparing from '../../assets/api/dataComparing';
import { SectionComparing } from '../../styles/mypage/my_comparing';

const Comparing = () => {
  const userId = useSelector((state) => state.page.userId);

  const [comparings, setComparings] = useState([]);
  const [checkedComparings, setCheckedComparings] = useState([]);
  const [selectedComparings, setSelectedComparings] = useState([]);
  // request state
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const findDiffProperty = () => {
    if (selectedComparings.length === 0 && checkedComparings.length === 0) return undefined;
    const selectedProductIds = selectedComparings.map((c) => c.id);
    return checkedComparings.find((comparing) => !selectedProductIds.includes(comparing.id))?.id;
  };

  const handleCheck = (id, e) => {
    if (e.target.tagName === 'path' || e.target.tagName === 'svg' || e.target.tagName === 'BUTTON') return;
    const isChecked = checkedComparings.some((comparing) => comparing.id === id);
    if (isChecked) setCheckedComparings((prev) => prev.filter((comparing) => comparing.id !== id));
    else if (checkedComparings.length === 4) alert(`최대 4개까지 선택가능합니다.`);
    else setCheckedComparings((prev) => [...prev, { ...comparings.find((comparing) => comparing.id === id) }]);
  };

  const handleRemove = async (id) => {
    const isRemoved = window.confirm('해당 상품을 비교함에서 삭제하시겠습니까?');
    if (isRemoved) {
      const { data } = await axios.post('http://localhost:8888/mypage/removeComparing', {
        userId,
        productId: id,
      });
      setComparings(data);
      const isChecked = checkedComparings.some((comparing) => comparing.id === id);
      if (isChecked) setCheckedComparings((prev) => prev.filter((comparing) => comparing.id !== id));
    }
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

  const fetchSelectedComparing = async () => {
    try {
      setApiLoading(true);
      const productIdToFetch = findDiffProperty();
      const { data } = await axios.post('http://localhost:8888/mypage/fetchSelectedComparing', {
        userId,
        productId: productIdToFetch,
      });
      setSelectedComparings((prev) => [...prev, data[0]]);
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
    if (selectedComparings.length === checkedComparings.length && !findDiffProperty()) return;

    if (selectedComparings.length > checkedComparings.length) {
      // 선택 해제
      const checkedProductIds = checkedComparings.map((c) => c.id);
      setSelectedComparings((prev) => prev.filter((p) => checkedProductIds.includes(p.id)));
    } else fetchSelectedComparing(); // 선택 추가
  }, [checkedComparings]);

  if (comparings.length === 0 && apiError)
    return <NotFound text={'오류가 발생했습니다.\n 잠시 후에 다시 시도해주시기 바랍니다.'} />;
  return (
    <SectionComparing>
      <h1>비교함 {!apiError && comparings.length}</h1>
      <p className='guide'>
        최대 4개까지 선택 가능합니다. <span>({checkedComparings.length}/4)</span>
      </p>
      <HorizontalList
        salesToDisplay={comparings}
        check={true}
        remove={true}
        checkedSales={checkedComparings}
        handleCheck={handleCheck}
        handleRemove={handleRemove}
        width='15%'
      />

      {checkedComparings.length < 2 ? (
        <NotFound text='최소 2개 이상 선택해주세요' />
      ) : (
        <ComparingTable
          columns={dataComparing}
          checkedSales={checkedComparings}
          datasOfCheckedSales={selectedComparings}
        />
      )}
    </SectionComparing>
  );
};

export default Comparing;
