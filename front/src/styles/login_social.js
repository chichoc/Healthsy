import styled from '@emotion/styled';

const Div = styled.div`
  /* background-color: red; */
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

const Button = styled.button`
  padding: 15px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 0 5px;
  /* background-color: #e8f3f1; */
  background-color: ${(props) => (props.kakatalk ? 'yellow' : props.naver ? '#19ce60' : '#1877f2')}
  }
`;

export { Div, Button };
