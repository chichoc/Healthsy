import React from 'react';
import { PopUp, Term } from '../styles/with_modal';

const withModal = (WrappedComponent) => {
  const Component = ({ termHeader, onModalClose }) => {
    return (
      <PopUp>
        <Term>
          <nav className='horizontal_flex'>
            <h1>{termHeader}</h1>
            <button onClick={onModalClose}>&#x2715;</button>
          </nav>
          <WrappedComponent />
        </Term>
      </PopUp>
    );
  };
  return Component;
};

export default withModal;
