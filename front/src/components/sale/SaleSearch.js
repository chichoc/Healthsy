import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeSearchWord } from '../../store/features/saleSlice';
import SearchBar from './SearchBar';
import productImg from '../../assets/img/testSale.jpeg';
import { DivSaleSearch } from '../../styles/sale/sale_search';

const SaleSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const wordSearched = useSelector((state) => state.sale.search.word);

  const [inputToSearch, setInputToSearch] = useState(wordSearched || '');
  const [isFocusedinputToSearch, setIsFocusedInputToSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isInSaleList, setIsInSaleList] = useState(location.pathname.includes('sale'));
  //request state
  const [searchApiLoading, setSearchApiLoading] = useState(false);
  const [searchApiError, setSearchApiError] = useState('');
  const searchRef = useRef();

  const saveSearchWord = (word = inputToSearch) => {
    const currnetDate = new Date();
    const month = currnetDate.getMonth() + 1;
    const date = currnetDate.getDate();
    const DateToSave = [(month < 10 ? '0' : '') + month, (date < 10 ? '0' : '') + date];
    const historyToSave = [word, ...DateToSave];
    const savedHistory = localStorage.getItem('searchWord');
    if (savedHistory) {
      // 중복된 검색어는 최신 날짜로 갱신
      const addedHistory = new Map(JSON.parse(savedHistory));
      addedHistory.set(word, DateToSave);
      localStorage.setItem('searchWord', JSON.stringify([...addedHistory]));
    } else localStorage.setItem('searchWord', JSON.stringify([historyToSave]));
  };

  const removeSearchWord = (string) => {
    const savedHistory = JSON.parse(localStorage.getItem('searchWord'));
    const removedHistory = savedHistory.filter((history) => history[0] !== string);
    localStorage.setItem('searchWord', JSON.stringify(removedHistory));
    setSearchHistory(removedHistory);
  };

  const removeAllSearchWord = () => {
    localStorage.setItem('searchWord', JSON.stringify([]));
    setSearchHistory([]);
  };

  const searchSales = async () => {
    try {
      setSearchApiLoading(true);
      const { data } = await axios.post('http://localhost:8888/sale/searchSaleSimplify', { input: inputToSearch });
      // 상품 목록에서는 검색된 결과 목록으로 띄우지만, 그 외에서는 searchResults
      setSearchResults(data);
    } catch (error) {
      setSearchApiError(error);
      console.log(error);
    } finally {
      setSearchApiLoading(false);
    }
  };

  const ListForSearchResults = (
    <>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.slice(0, 9).map((result) => (
            <li
              key={result.id}
              className='horizontal_flex search_sales'
              onClick={() => {
                saveSearchWord();
                dispatch(changeSearchWord(inputToSearch));
                navigate(`/product/${result.id}`);
              }}
            >
              <img src={productImg} alt='제품 이미지' />
              <div className='vertical_flex search_sales'>
                <span>{result.brand}</span>
                <span>{result.PRDLST_NM}</span>
              </div>
            </li>
          ))}
          {searchResults.length > 9 && (
            <li
              key='moreSearch'
              className='search_sales'
              onClick={() => {
                dispatch(changeSearchWord(inputToSearch));
                navigate(`/sale/brand`);
              }}
            >
              더 알아보기 &#10095;
            </li>
          )}
        </ul>
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </>
  );

  const ListForSearchHistory =
    searchHistory?.length > 0 ? (
      <>
        <header className='horizontal_flex'>
          <h3>최근 검색어</h3>
          <button onClick={removeAllSearchWord}>전체 삭제</button>
        </header>
        <ul>
          {searchHistory.map(([word, [month, day]]) => (
            <li key={word} className='horizontal_flex'>
              <div
                className='horizontal_flex search_history'
                onClick={() => {
                  setInputToSearch(word);
                  saveSearchWord(word);
                  isInSaleList && dispatch(changeSearchWord(word));
                  setIsFocusedInputToSearch(false);
                }}
              >
                <span>{word}</span>
                <span>
                  {month}.{day}
                </span>
              </div>
              <button onClick={() => removeSearchWord(word)}>&#x2715;</button>
            </li>
          ))}
        </ul>
      </>
    ) : (
      <h3>최근 검색 기록이 없습니다.</h3>
    );

  useEffect(() => {
    if (inputToSearch.length === 0 || isInSaleList) return;
    searchSales();
  }, [inputToSearch, isInSaleList]);

  useEffect(() => {
    setIsInSaleList(location.pathname.includes('sale'));
  }, [location]);

  useEffect(() => {
    // 입력창 focus될 때마다 최근 기록 받아옴
    if (isFocusedinputToSearch) setSearchHistory(JSON.parse(localStorage.getItem('searchWord')));
  }, [isFocusedinputToSearch]);

  useEffect(() => {
    if (!isInSaleList || !searchRef.current) return;
    const handleMouseDown = (e) => {
      if (!searchRef.current?.contains(e.target)) setIsFocusedInputToSearch(false);
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [isInSaleList]);

  return (
    <DivSaleSearch className={`vertical_flex ${isInSaleList ? 'sale' : ''}`} ref={searchRef}>
      <SearchBar
        isInSaleList={isInSaleList}
        inputToSearch={inputToSearch}
        setInputToSearch={setInputToSearch}
        isFocusedinputToSearch={isFocusedinputToSearch}
        setIsFocusedInputToSearch={setIsFocusedInputToSearch}
        saveSearchWord={saveSearchWord}
      />

      {((isInSaleList && isFocusedinputToSearch) || !isInSaleList) && (
        // 상품 목록이면 입력창에 focus된 경우 또는 상품 목록 아닌 경우 결과창 보임
        <section>
          {searchApiError ? (
            <p>오류가 발생했습니다. 잠시 후에 다시 시도해주시기 바랍니다.</p>
          ) : (
            <>{inputToSearch.length > 0 && !isInSaleList ? ListForSearchResults : ListForSearchHistory}</>
          )}
        </section>
      )}
    </DivSaleSearch>
  );
};

export default SaleSearch;
