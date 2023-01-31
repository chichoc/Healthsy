import styled from '@emotion/styled';

const DivSocial = styled.div`
  text-align: center;
  border-top: solid 1px #a3abbd;
  width: 250px;
  margin: 30px auto 0;
  padding: 20px 0;
  position: relative;
  span {
    color: #a3abbd;
    background-color: white;
    position: absolute;
    top: 0;
    margin-top: -10px;
    left: 45%;
    text-transform: uppercase;
  }
`;

const BtnSocial = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0 5px;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1);

  background-position: ${(props) => (props.kakao ? '-8px center' : props.naver ? '0' : 'center')};
  background-size: ${(props) => (props.kakao ? '500%' : props.naver ? 'contain' : '150%')};
  background-repeat: no-repeat;
`;

export { DivSocial, BtnSocial };
