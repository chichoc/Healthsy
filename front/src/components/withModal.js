import React from 'react';
import { useDispatch } from 'react-redux';
import { onModalClose } from '../store/features/modalSlice';
import { PopUp, Term } from '../styles/with_modal';

const withModal = (WrappedComponent) => {
  const Component = ({ termHeader, ...props }) => {
    const dispatch = useDispatch();

    return (
      <PopUp>
        <Term>
          <nav className='horizontal_flex'>
            <h1>{termHeader}</h1>
            <button onClick={() => dispatch(onModalClose())}>&#x2715;</button>
          </nav>
          <WrappedComponent props={props} />
        </Term>
      </PopUp>
    );
  };
  return Component;
};

export default withModal;
