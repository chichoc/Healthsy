import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import TermService from '../form/join/TermService';
import TermInfo from '../form/join/TermInfo';
import TermMarketing from '../form/join/TermMarketing';
import { NavHelp, ArticleHelp } from '../../styles/help/help_term';

const Term = () => {
  let { termType } = useParams();

  const termContent = {
    service: {
      name: '이용약관',
      component: <TermService />,
    },
    info: {
      name: '개인정보 처리방침',
      component: <TermInfo />,
    },
    marketing: {
      name: '마케팅 정보 수신 및 활용',
      component: <TermMarketing />,
    },
  };

  return (
    <>
      <h1>약관 및 정책</h1>
      <NavHelp>
        {Object.entries(termContent).map(([link, { name }]) => (
          <NavLink key={link} to={`/help/term/${link}`}>
            {({ isActive }) => <button className={isActive ? 'select' : undefined}>{name}</button>}
          </NavLink>
        ))}
      </NavHelp>

      <ArticleHelp>
        {termType ? termContent[termType].component : <p className='none'>확인하고 싶은 내용을 선택해주세요.</p>}
      </ArticleHelp>
    </>
  );
};

export default Term;
