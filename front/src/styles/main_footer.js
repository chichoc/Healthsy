import styled from '@emotion/styled';

const Footer = styled.footer`
  background-color: #344b47;
  color: #96b1ac;
  border-top: solid 1px #e8f3f1;
  margin-top: 30px;
  padding: 70px 120px;
  flex-shrink: 0;
  nav {
    padding-bottom: 20px;
  }
`;

const Ul = styled.ul`
  justify-content: start;
`;

const Company = styled.div`
  p {
    padding: 3px 0;
  }
`;

const Caution = styled.div`
  margin: 10px 0;
  color: #e8f3f1;
`;

export { Footer, Ul, Company, Caution };
