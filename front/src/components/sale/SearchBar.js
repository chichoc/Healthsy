import React from 'react';
import { BsSearch } from 'react-icons/bs';
import styled from '@emotion/styled';

const SearchBar = ({ isInSaleList, setInputToSearch, isFocusedinputToSearch, setIsFocusedInputToSearch }) => {
  return (
    <DivSearchBar>
      <input
        className={isInSaleList && !isFocusedinputToSearch ? 'sale' : ''}
        type='search'
        placeholder='제품명 검색'
        onChange={(e) => setInputToSearch(e.target.value)}
        onFocus={() => setIsFocusedInputToSearch(true)}
        onBlur={() => setIsFocusedInputToSearch(false)}
      />
      <BsSearch className='inner_button_left' title={'검색'} size={19} />
    </DivSearchBar>
  );
};

const DivSearchBar = styled.div`
  input {
    font-size: 20px;
    width: 100%;
    letter-spacing: 1px;
    border-radius: 20px 20px 0 0;
    border: 0.5px solid #ababab;
    border-bottom: none;
    padding: 20px 20px 20px 55px;
  }
  input.sale {
    font-size: 20px;
    border-radius: 30px;
    border: 0.5px solid #ababab;
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
    left: 5px;
    color: #616161;
    padding: 20px;
  }
`;

export default SearchBar;
