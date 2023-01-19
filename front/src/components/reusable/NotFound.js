import React from 'react';
import styled from '@emotion/styled';
import notFoundImg from '../../assets/img/notFound.svg';

const NotFound = ({ text, width = 300 }) => {
  return (
    <Main className='vertical_flex' width={width}>
      <figure>
        <img src={notFoundImg} alt='notfound' />
        <figcaption>
          by Anggah Wahyu from{' '}
          <a
            href='https://thenounproject.com/browse/icons/term/not-found/'
            target='_blank'
            rel='noopener noreferrer'
            title='not found Icons'
          >
            Noun Project
          </a>
        </figcaption>
      </figure>
      <p>{text}</p>
    </Main>
  );
};
const Main = styled.main`
  padding: 0px 100px;
  align-items: center;
  figure {
    img {
      width: ${(props) => props.width}px;
      opacity: 0.3;
      margin: 10px 0 -70px 0;
    }
    figcaption {
      font-size: 6px;
      width: 200px;
      margin: 0 auto;
      text-align: right;
      color: #c0c0c0;
    }
  }
  p {
    margin: 20px 0;
    color: #989898;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    line-height: 1.8;
    letter-spacing: 1.2px;
    white-space: pre-wrap;
  }
`;

export default NotFound;
