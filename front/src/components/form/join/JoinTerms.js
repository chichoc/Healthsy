import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onCheck, onCheckAll } from '../../../store/features/formSlice';
import { onModalOpen } from '../../../store/features/modalSlice';
import Modal from '../../../Modal';
import TermService from './TermService';
import TermInfo from './TermInfo';
import TermMarketing from './TermMarketing';
import { Terms } from '../../../styles/join_terms';

const JoinTerms = () => {
  const formInputValueCheck = useSelector((state) => state.form.value.inputValue.check);
  const isCheckAll = useSelector((state) => state.form.value.isCheckAll);
  const isModal = useSelector((state) => state.modal.value.isModal);
  const { checkAge, checkService, checkInfo, checkMarketing } = formInputValueCheck;
  const dispatch = useDispatch();

  const setTermComponent = (index, termProps) => {
    const mapIndexToComponent = {
      2: <TermService {...termProps} />,
      3: <TermInfo {...termProps} />,
      4: <TermMarketing {...termProps} />,
    };
    return mapIndexToComponent[index];
  };

  const terms = [
    {
      header: '아래 내용에 모두 동의합니다.',
      id: 'checkAll',
      checkedValue: isCheckAll,
      button: false,
    },
    {
      header: '만 14세 이상입니다.',
      id: 'checkAge',
      checkedValue: checkAge,
      detail: '(필수)',
      detailClassName: 'required',
      button: false,
    },
    {
      header: '서비스 이용약관 동의',
      id: 'checkService',
      checkedValue: checkService,
      detail: '(필수)',
      detailClassName: 'required',
      button: true,
    },
    {
      header: '개인정보 처리방침 동의',
      id: 'checkInfo',
      checkedValue: checkInfo,
      detail: '(필수)',
      detailClassName: 'required',
      button: true,
    },
    {
      header: '마케팅 정보 수신 및 활용 동의',
      id: 'checkMarketing',
      checkedValue: checkMarketing,
      detail: '(선택)',
      detailClassName: 'optional',
      button: true,
    },
  ];

  return (
    <Terms className='vertical_flex'>
      {terms.map((term, index) => (
        <li key={term.id}>
          <input
            type='checkbox'
            id={term.id}
            name={term.id}
            checked={term.checkedValue}
            onChange={term.id === 'checkAll' ? () => dispatch(onCheckAll()) : () => dispatch(onCheck(term.id))}
          ></input>
          <label htmlFor={term.id}>{term.header}</label>
          {term.detail ? <span className={term.detailClassName}>&nbsp;{term.detail}</span> : ''}
          {term.button && (
            <button
              className='termBtn'
              onClick={(e) => {
                e.preventDefault();
                dispatch(onModalOpen(index));
              }}
            >
              &#10095;
            </button>
          )}

          {isModal === index && <Modal>{setTermComponent(index, { termHeader: term.header.slice(0, -3) })}</Modal>}
        </li>
      ))}
    </Terms>
  );
};

export default JoinTerms;
