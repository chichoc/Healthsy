import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { changeSearchWord } from '../../store/features/saleSlice';
import styled from '@emotion/styled';

const SearchBar = ({
  isInSaleList,
  inputToSearch,
  setInputToSearch,
  isFocusedinputToSearch,
  setIsFocusedInputToSearch,
  saveSearchWord,
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    inputToSearch.length > 0 ? saveSearchWord() : alert('검색어를 입력해주세요');
    isInSaleList && dispatch(changeSearchWord(inputToSearch));
  };

  return (
    <DivSearchBar>
      <input
        className={isInSaleList && !isFocusedinputToSearch ? 'sale' : ''}
        type='search'
        placeholder='제품명 검색'
        value={inputToSearch || ''}
        onChange={(e) => setInputToSearch(e.target.value)}
        onFocus={() => setIsFocusedInputToSearch(true)}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      />
      <BsSearch className='inner_button_left' title={'검색'} size={19} onClick={() => handleClick()} />
      <button
        className='inner_button_right'
        onClick={() => {
          setInputToSearch('');
          dispatch(changeSearchWord(''));
        }}
      >
        &#x2715;
      </button>
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
    padding: 20px 55px 20px 55px;
  }
  input.sale {
    border-radius: 30px;
    border: 0.5px solid #ababab;
  }
  input::placeholder {
    color: #616161;
  }
  input[type='search']::-webkit-search-cancel-button {
    display: none;
  }
  svg.inner_button_left {
    cursor: pointer;
    position: absolute;
    left: 5px;
    color: #616161;
    padding: 20px; /* input과 겹침 */
  }
  button.inner_button_right {
    cursor: pointer;
    position: absolute;
    top: 23px;
    right: 20px;
    padding-left: 5px;
    color: #616161;
  }

  button.inner_button_right:hover {
    color: #ff3300;
  }
`;

export default SearchBar;
