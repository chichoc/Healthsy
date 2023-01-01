import reactDom from 'react-dom';
import styled from '@emotion/styled';

const Portal = ({ children }) => {
  const el = document.getElementById('portal');

  return reactDom.createPortal(
    <DivPortal className={children.type?.name === 'Modal' ? 'modal' : ''}>{children}</DivPortal>,
    el
  );
};

export default Portal;

const DivPortal = styled.div`
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
  &.modal {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  }
`;
