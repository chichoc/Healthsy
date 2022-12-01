import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleSearchBar } from '../store/features/saleSlice';
import { BsSearch } from 'react-icons/bs';
import Portal from '../Portal';
import SaleSearch from './sale/SaleSearch';
import dataMainMenu from '../assets/api/dataMainMenu';
import { AsideMain, NavMain, UlMain } from '../styles/main_nav';

const MainNav = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [openSearchForm, setOpenSearchForm] = useState(false);
  const [isInSaleList, setIsInSaleList] = useState(location.pathname.includes('sale'));

  const isShowedSearchBar = useSelector((state) => state.sale.search.bar);

  const handleSaleSearch = () => {
    if (isInSaleList) dispatch(handleSearchBar());
    else setOpenSearchForm(!openSearchForm);
  };

  const selectedNavStyle = {
    color: '#000000',
    fontWeight: 500,
  };

  useEffect(() => {
    setIsInSaleList(location.pathname.includes('sale'));
  }, [location, isInSaleList]);

  return (
    <>
      {openSearchForm && (
        <Portal>
          <AsideMain>
            <SaleSearch name='searchMain' className='inner_button_left' placeHolder={'제품명 검색'} />
            <button className='form_close' onClick={handleSaleSearch}>
              &#x2715;
            </button>
            {/* 스크롤 이동 못 하게 막기 */}
          </AsideMain>
        </Portal>
      )}
      <NavMain className='horizontal_flex' searchForm={openSearchForm}>
        <Link to='/' className='logo'>
          Healthsy
        </Link>

        <UlMain className='horizontal_flex'>
          {dataMainMenu.map((menu, index) => (
            <li key={index}>
              <NavLink to={menu.link} style={({ isActive }) => (isActive ? selectedNavStyle : undefined)}>
                {menu.name}
              </NavLink>
            </li>
          ))}
          <li onClick={handleSaleSearch}>
            <BsSearch title={'검색'} size={19} color={isShowedSearchBar ? '#000000' : '#686868'} />
          </li>
        </UlMain>
      </NavMain>
    </>
  );
};

export default MainNav;
