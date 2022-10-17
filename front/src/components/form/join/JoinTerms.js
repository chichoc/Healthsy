import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onModalOpen } from '../../../store/features/modalSlice';
import Portal from '../../../Portal';
import TermService from './TermService';
import TermInfo from './TermInfo';
import TermMarketing from './TermMarketing';
import CircleCheck from '../../reusable/CircleCheck';
import dataJoinTerms from '../../../assets/api/dataJoinTerms';
import { Terms } from '../../../styles/form/join/join_terms';

const JoinTerms = ({ inputJoin, setInputJoin }) => {
  const dispatch = useDispatch();
  const isModal = useSelector((state) => state.modal.isModal.joinTerm);
  const { checkAge, checkService, checkInfo, checkMarketing } = inputJoin.check;

  useEffect(() => {
    const inputToCheck = [checkAge, checkService, checkInfo, checkMarketing];
    // 약관 일일이 모두 체크하면 전체 선택 버튼 체크
    // 하나라도 체크 해제되면 전체 선택 버튼 해제
    const checkValueToChange = inputToCheck.every((checkValue) => checkValue) ? true : false;
    setInputJoin({ ...inputJoin, check: { ...inputJoin.check, checkAll: checkValueToChange } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkAge, checkService, checkInfo, checkMarketing]);

  const onCheck = (id) => {
    setInputJoin({ ...inputJoin, check: { ...inputJoin.check, [id]: !inputJoin.check[id] } });
  };
  const onCheckAll = (id) => {
    const checkValueToChange = !inputJoin.check[id];
    setInputJoin((prev) => {
      const changedAllCheckValues = {};
      Object.keys(prev.check).forEach((key) => (changedAllCheckValues[key] = checkValueToChange));
      return { ...inputJoin, check: changedAllCheckValues };
    });
  };

  const setTermModal = (index, termProps) => {
    const mapIndexToComponent = {
      2: <TermService {...termProps} />,
      3: <TermInfo {...termProps} />,
      4: <TermMarketing {...termProps} />,
    };
    return mapIndexToComponent[index];
  };

  const setTermComponent = (id, termData, index) => {
    return (
      <li key={id}>
        <CircleCheck
          id={id}
          headerSpan={termData.header}
          checked={inputJoin.check[id]}
          onChangeMethod={id === 'checkAll' ? onCheckAll : onCheck}
          detailSpan={termData.detail}
        />

        {termData.button && (
          <button
            className='termBtn'
            onClick={(e) => {
              e.preventDefault();
              dispatch(onModalOpen({ component: 'joinTerm', isModal: index }));
            }}
          >
            &#10095;
          </button>
        )}
        {isModal === index && <Portal>{setTermModal(index, { termHeader: termData.header.slice(0, -3) })}</Portal>}
      </li>
    );
  };

  return (
    <Terms className='vertical_flex'>
      {dataJoinTerms.map((term, index) => setTermComponent(term.id, dataJoinTerms[index], index))}
    </Terms>
  );
};

export default JoinTerms;
