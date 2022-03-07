import React from 'react';
import { Terms } from '../styles/join_terms';
import ModalTerm from './ModalTerm';
import Modal from '../Modal';

const JoinTerms = ({ inputJoin, isCheckAll, isModal, setIsModal, onCheck, onCheckAll, onModalOpen, onModalClose }) => {
  const { checkAge, checkService, checkInfo, checkMarketing } = inputJoin.check;
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
      content: '서비스 이용약관',
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
      content: 'SMS/ 이메일 (마케팅 정보) 수신 동의',
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
      {terms.map((term) => (
        <li>
          <input
            type='checkbox'
            id={term.id}
            name={term.id}
            checked={term.checkedValue}
            onChange={term.onChangeMethod}
          ></input>
          <label for={term.id}>{term.content}</label>
          {term.detail ? <span className={term.detailClassName}>&nbsp;{term.detail}</span> : ''}
          {term.button && (
            <button className='termBtn' onClick={onModalOpen}>
              &#10095;
            </button>
          )}
        </li>
      ))}
      {isModal && (
        <Modal>
          <ModalTerm onModalClose={onModalClose} />
        </Modal>
      )}
    </Terms>
  );
};

export default JoinTerms;
