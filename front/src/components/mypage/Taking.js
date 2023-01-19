import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import HorizontalList from '../reusable/HorizontalList';
import ComparingTable from '../reusable/ComparingTable';
import NotFound from '../reusable/NotFound';
import dataTaking from '../../assets/api/dataTaking';
import { SectionTaking } from '../../styles/mypage/my_taking';

const Taking = () => {
  const userId = useSelector((state) => state.page.userId);

  const [takings, setTakings] = useState([]);
  const [checkedTakings, setCheckedTakings] = useState([]);
  const [selectedTakings, setSelectedTakings] = useState([]);
  // request state
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const findDiffProperty = () => {
    if (selectedTakings.length === 0 && checkedTakings.length === 0) return undefined;
    const selectedProductIds = selectedTakings.map((taking) => taking.id);
    return checkedTakings.find((taking) => !selectedProductIds.includes(taking.id))?.id;
  };

  const handleCheck = (id, e) => {
    if (e.target.tagName === 'path' || e.target.tagName === 'svg' || e.target.tagName === 'BUTTON') return;
    const isChecked = checkedTakings.some((taking) => taking.id === id);
    if (isChecked) setCheckedTakings((prev) => prev.filter((taking) => taking.id !== id));
    else {
      const { takingsId, PRDLST_NM, brand, status } = takings.find((taking) => taking.id === id);
      setCheckedTakings((prev) => [...prev, { takingsId, id, PRDLST_NM, brand, status }]);
    }
  };

  const handleRemove = async (id) => {
    const isRemoved = window.confirm('해당 상품을 복용함에서 삭제하시겠습니까?');
    if (isRemoved) {
      const { data } = await axios.post('http://localhost:8888/mypage/removeTaking', {
        userId,
        productId: id,
      });
      setTakings((prev) => prev.filter((taking) => taking.id !== id));
      const isChecked = checkedTakings.some((taking) => taking.id === id);
      if (isChecked) setCheckedTakings((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const findContent = (name, text, standard, unit) => {
    // 표시량(의) (함량/전체함량)
    // 0.001g = 1mg = 1,000mcg = 1,000ug
    if (text.indexOf(name) === -1) return { content: 0, percent: 0 };
    const splittedText = text.split(name)[1];
    const [start, end] = ['(', '/'].map((str) => splittedText.indexOf(str));
    const content = splittedText.slice(start + 1, end).replaceAll(/\s/g, '');

    if (/^\D/.test(content)) return { content: 0, percent: 0 };

    let [numOfContent, unitOfContent] = content.replaceAll(',', '').split(/([^0-9.]+)/);
    const unitObj = {
      g: 1,
      mg: 2,
      'mga-TE': 2,
      'mgα-TE': 2,
      mgNE: 2,
      mcg: 3,
      ug: 3,
      '㎍RE': 3,
      ugRE: 3,
      ugRAE: 3,
      µgRE: 3,
    };
    const differenceOfUnit = unitObj[unit] - unitObj[unitOfContent];

    if (differenceOfUnit !== 0)
      numOfContent *= differenceOfUnit > 0 ? 1000 ** differenceOfUnit : 1 / 1000 ** Math.abs(differenceOfUnit);

    return {
      content: +numOfContent % 1 === 0 ? numOfContent : (+numOfContent).toFixed(12),
      percent: +((numOfContent * 100) / standard).toFixed(12),
    };
  };

  const fetchTakings = async () => {
    try {
      setApiLoading(true);
      const { data } = await axios.post('http://localhost:8888/mypage/fetchTakings', {
        userId,
      });
      setTakings([]);
      setCheckedTakings([]);
      data.forEach(({ STDR_STND, IFTKN_ATNT_MATR_CN, POG_DAYCNT, ...rest }) => {
        const obj = {};
        dataTaking.forEach(
          ({ header, standard, unit }) => (obj[header] = findContent(header, STDR_STND, standard, unit))
        );

        setTakings((prev) => [
          ...prev,
          {
            ...rest,
            IFTKN_ATNT_MATR_CN,
            POG_DAYCNT,
            STDR_STND: obj,
          },
        ]);
        setCheckedTakings((prev) => [...prev, rest]);
      });
    } catch (error) {
      setApiError(error);
      console.log(error);
    } finally {
      setApiLoading(false);
    }
  };

  useEffect(() => {
    fetchTakings();
  }, []);

  useEffect(() => {
    if (selectedTakings.length === checkedTakings.length && !findDiffProperty()) return;
    if (selectedTakings.length > checkedTakings.length) {
      // 선택 해제
      const checkedProductIds = checkedTakings.map((c) => c.id);
      setSelectedTakings((prev) => prev.filter((p) => checkedProductIds.includes(p.id)));
    } else {
      // 선택 추가
      const productIdToAdd = findDiffProperty();
      const { takingsId, id, STDR_STND, IFTKN_ATNT_MATR_CN, POG_DAYCNT } = takings.find(
        ({ id, ...rest }) => id === productIdToAdd
      );
      setSelectedTakings((prev) => [...prev, { takingsId, id, STDR_STND, IFTKN_ATNT_MATR_CN, POG_DAYCNT }]);
    }
  }, [checkedTakings]);

  if (apiError) return <NotFound text={'오류가 발생했습니다.\n 잠시 후에 다시 시도해주시기 바랍니다.'} />;

  return (
    <SectionTaking>
      <h1>복용함</h1>
      {takings.length > 0 ? (
        <p className='guide'>
          최소 1개 이상 선택해야 합니다.{' '}
          <span>
            ({checkedTakings.length}/{takings.length})
          </span>
        </p>
      ) : (
        <NotFound text={'아직 담으신 상품이 없습니다!'} width={200} />
      )}

      <HorizontalList
        salesToDisplay={takings}
        check={true}
        checkedSales={checkedTakings}
        remove={true}
        handleCheck={handleCheck}
        handleRemove={handleRemove}
      />
      <h2>1일 섭취량 당 함량</h2>
      <ComparingTable
        columns={[{ header: '제품 주요 정보', sum: true }, ...dataTaking]}
        checkedSales={checkedTakings}
        datasOfCheckedSales={selectedTakings.map((taking) => ({ id: taking.id, STDR_STND: taking.STDR_STND }))}
      />
      <h2>유통기한</h2>
      <ComparingTable
        columns={[{ header: '제품 주요 정보' }, { header: '유통기한', code: 'POG_DAYCNT' }]}
        checkedSales={checkedTakings}
        datasOfCheckedSales={selectedTakings.map((taking) => ({ id: taking.id, POG_DAYCNT: taking.POG_DAYCNT }))}
      />
      <h2>섭취시 주의 사항</h2>
      <ComparingTable
        columns={[{ header: '제품 주요 정보' }, { header: '섭취시 주의사항', code: 'IFTKN_ATNT_MATR_CN' }]}
        checkedSales={checkedTakings}
        datasOfCheckedSales={selectedTakings.map((taking) => ({
          id: taking.id,
          IFTKN_ATNT_MATR_CN: taking.IFTKN_ATNT_MATR_CN,
        }))}
      />
    </SectionTaking>
  );
};

export default Taking;
