import React from 'react';
import styled from '@emotion/styled';
import { BsSearch } from 'react-icons/bs';

const SearchForm = ({ name, placeHolder }) => {
  return (
    <DivSearchForm className='vertical_flex'>
      <input type='search' name={name} placeholder={placeHolder} />
      <BsSearch className='inner_button_left' title={'검색'} size={19} />
      <section>
        <h3>최근 검색어</h3>
        <ul>
          <li>임시1</li>
          <li>임시2</li>
          <li>임시3</li>
        </ul>
      </section>
    </DivSearchForm>
  );
};

const DivSearchForm = styled.div`
  position: relative;
  font-size: 15px;
  input {
    width: 100%;
    letter-spacing: 1px;
    border-radius: 20px 20px 0 0;
    border: 0.5px solid #ababab;
    padding: 10px 20px 10px 45px;
  }
  input::placeholder {
    color: #616161;
  }

  input[type='search']::-webkit-search-cancel-button {
    margin-left: 17px;
  }

  svg.inner_button_left {
    cursor: pointer;
    position: absolute;
    margin: auto 0;
    top: 12px;
    left: 15px;
    color: #616161;
  }

  section {
    max-width: 100%;
    background-color: white;
    border-radius: 0 0 20px 20px;
    border: 0.5px solid #ababab;
    padding: 20px 45px 20px;
    box-sizing: border-box;
    h3 {
      color: #616161;
      padding-bottom: 2px;
    }
    li {
      letter-spacing: 1px;
      margin-top: 10px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      padding: 5px 0;
    }
    li:hover {
      background-color: #f0f0f0;
    }
  }
`;

export default SearchForm;
