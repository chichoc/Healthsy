import React from 'react';
import { NavLink } from 'react-router-dom';
import dataMyMenu from '../../assets/api/dataMyMenu';
import { NavMyPage } from '../../styles/mypage/my_page';

const MyNav = () => {
  return (
    <NavMyPage>
      {Object.keys(dataMyMenu).map((menu) => (
        <>
          <h2>{menu}</h2>
          <ul>
            {dataMyMenu[menu].map(({ name, link }) => (
              <li key={link}>
                <NavLink to={`/mypage/${link}`} className={({ isActive }) => (isActive ? 'active' : undefined)}>
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </>
      ))}
    </NavMyPage>
  );
};

export default MyNav;
