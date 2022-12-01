import React, { useEffect, useState } from 'react';
import axios from 'axios';
import productImg from '../../assets/img/testSale.jpeg';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { DivSaleSearch } from '../../styles/sale/sale_search';

const SaleSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputToSearch, setInputToSearch] = useState('');
  const [isFocusedinputToSearch, setIsFocusedInputToSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isInSaleList, setIsInSaleList] = useState(location.pathname.includes('sale'));
  //request state
  const [searchApiLoading, setSearchApiLoading] = useState(false);
  const [searchApiError, setSearchApiError] = useState('');

  const searchSales = async () => {
    try {
      setSearchApiLoading(true);
      const { data } = await axios.post('http://localhost:8888/sale/searchSales', { input: inputToSearch });
      setSearchResults(data);
    } catch (error) {
      setSearchApiError(error);
      console.log(error);
    } finally {
      setSearchApiLoading(false);
    }
  };

  const ListForSearchHistory = (
    <>
      <header className='horizontal_flex'>
        <h3>최근 검색어</h3>
        <button>비우기</button>
      </header>
      <ul>
        {/* 날짜, 삭제 버튼 */}
        <li>임시1임시1임시1임시1임시1임시1임시1임시1임시1임시1임시1임시1임시1임시1임시1임시1임시1임시1임시1</li>
        <li>임시2</li>
        <li>임시3</li>
      </ul>
    </>
  );

  useEffect(() => {
    if (inputToSearch.length === 0) return;
    searchSales();
  }, [inputToSearch]);

  useEffect(() => {
    setIsInSaleList(location.pathname.includes('sale'));
  }, [location, isInSaleList]);

  return (
    <DivSaleSearch className={`vertical_flex ${isInSaleList ? 'sale' : ''}`}>
      <SearchBar
        isInSaleList={isInSaleList}
        setInputToSearch={setInputToSearch}
        isFocusedinputToSearch={isFocusedinputToSearch}
        setIsFocusedInputToSearch={setIsFocusedInputToSearch}
      />
      {((isInSaleList && isFocusedinputToSearch) || !isInSaleList) && (
        // 상품 목록 아닌 경우 또는 상품 목록이면 입력창에 focus된 경우에만 결과창 보임
        <section>
          {inputToSearch.length > 0 ? (
            <ul>
              {searchResults.map((result) => (
                <li key={result.id} className='horizontal_flex' onClick={() => navigate(`/product/${result.id}`)}>
                  <img src={productImg} alt='제품 이미지' />
                  <div className='vertical_flex'>
                    <span>{result.brand}</span>
                    <span>{result.PRDLST_NM}</span>
                  </div>
                </li>
              ))}
              {/* {searchResults.length > 7 && <li>더 알아보기</li>} */}
            </ul>
          ) : (
            ListForSearchHistory
          )}
          {inputToSearch.length > 0 && searchResults.length === 0 && <p>검색 결과가 없습니다.</p>}
        </section>
      )}
    </DivSaleSearch>
  );
};

export default SaleSearch;
