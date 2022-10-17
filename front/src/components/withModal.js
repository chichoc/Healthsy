import React from 'react';
import { useDispatch } from 'react-redux';
import { onModalClose } from '../store/features/modalSlice';
import { ArticleModal } from '../styles/with_modal';

const withModal = (WrappedComponent) => {
  const Modal = ({ termHeader, ...props }) => {
    const dispatch = useDispatch();

    return (
      <ArticleModal>
        <header className='horizontal_flex'>
          <h1>{termHeader}</h1>
          <button onClick={() => dispatch(onModalClose())}>&#x2715;</button>
        </header>
        <WrappedComponent props={props} />
      </ArticleModal>
    );
  };
  return Modal;
};

export default withModal;
