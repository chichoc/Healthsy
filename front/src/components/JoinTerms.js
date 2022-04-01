import React, { useContext } from 'react';
import { Terms } from '../styles/join_terms';
import Modal from '../Modal';
import TermService from './TermService';
import TermInfo from './TermInfo';
import TermMarketing from './TermMarketing';
import { JoinContext } from '../contexts/JoinContext';

const JoinTerms = () => {
  const { inputJoin, isCheckAll, isModal, onCheck, onCheckAll, onModalOpen, onModalClose } = useContext(JoinContext);

  const { checkAge, checkService, checkInfo, checkMarketing } = inputJoin.check;

  const termComponent = [undefined, undefined, TermService, TermInfo, TermMarketing];

  let Term = isModal && termComponent[isModal];

  const terms = [
    {
      content: '아래 내용에 모두 동의합니다.',
      id: 'checkAll',
      checkedValue: isCheckAll,
      onChangeMethod: onCheckAll,
      button: false,
    },
    {
      content: '만 14세 이상입니다.',
      id: 'checkAge',
      checkedValue: checkAge,
      onChangeMethod: (e) => onCheck(e),
      detail: '(필수)',
      detailClassName: 'required',
      button: false,
    },
    {
      content: '서비스 이용약관 동의',
      id: 'checkService',
      checkedValue: checkService,
      onChangeMethod: (e) => onCheck(e),
      detail: '(필수)',
      detailClassName: 'required',
      button: true,
    },
    {
      content: '개인 정보 수집 및 이용 동의',
      id: 'checkInfo',
      checkedValue: checkInfo,
      onChangeMethod: (e) => onCheck(e),
      detail: '(필수)',
      detailClassName: 'required',
      button: true,
    },
    {
      content: '마케팅 정보 수신 및 활용 동의',
      id: 'checkMarketing',
      checkedValue: checkMarketing,
      onChangeMethod: (e) => onCheck(e),
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
            onChange={term.onChangeMethod}
          ></input>
          <label htmlFor={term.id}>{term.content}</label>
          {term.detail ? <span className={term.detailClassName}>&nbsp;{term.detail}</span> : ''}
          {term.button && (
            <button className='termBtn' onClick={onModalOpen(index)}>
              &#10095;
            </button>
          )}

          {isModal === index && (
            <Modal>
              <Term termHeader={term.content} onModalClose={onModalClose} />
            </Modal>
          )}
        </li>
      ))}
    </Terms>
  );
};

export default JoinTerms;
