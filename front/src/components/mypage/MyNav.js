import React from 'react';
import { Link } from 'react-router-dom';
import dataMyMenu from '../../assets/api/dataMyMenu';
import { NavMyPage } from '../../styles/mypage/mynav';

const MyNav = () => {
  return (
    <NavMyPage>
      {Object.keys(dataMyMenu).map((menu) => (
        <>
          <h2>{menu}</h2>
          <ul>
            {dataMyMenu[menu].map(({ name, link }) => (
              <li key={link}>
                <Link to={`/mypage/${link}`}>{name}</Link>
              </li>
            ))}
          </ul>
        </>
      ))}
    </NavMyPage>
  );
};

export default MyNav;
