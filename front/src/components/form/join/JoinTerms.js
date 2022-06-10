import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onCheck, onCheckAll } from '../../../store/features/formSlice';
import { onModalOpen } from '../../../store/features/modalSlice';
import Modal from '../../../Modal';
import TermService from './TermService';
import TermInfo from './TermInfo';
import TermMarketing from './TermMarketing';
import dataJoinTerms from '../../../assets/api/dataJoinTerms';
import { Terms } from '../../../styles/form/join/join_terms';

const JoinTerms = () => {
  const formInputValueCheck = useSelector((state) => state.form.value.inputValue.check);
  const isCheckAll = useSelector((state) => state.form.value.isCheckAll);
  const isModal = useSelector((state) => state.modal.value.isModal.joinTerm);
  const { agreeAge, agreeService, agreeInfo, agreeMarketing } = formInputValueCheck;
  const dispatch = useDispatch();

  const checkedValues = [
    {
      isCheckAll: isCheckAll,
      agreeAge: agreeAge,
      agreeService: agreeService,
      agreeInfo: agreeInfo,
      agreeMarketing: agreeMarketing,
    },
  ];

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
        <input
          type='checkbox'
          id={id}
          name={id}
          checked={checkedValues[index]}
          onChange={id === 'checkAll' ? () => dispatch(onCheckAll()) : () => dispatch(onCheck(id))}
        ></input>
        <label htmlFor={id}>{termData.header}</label>
        {termData.detail ? <span className={termData.detailClassName}>&nbsp;{termData.detail}</span> : ''}
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
        {isModal === index && <Modal>{setTermModal(index, { termHeader: termData.header.slice(0, -3) })}</Modal>}
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
