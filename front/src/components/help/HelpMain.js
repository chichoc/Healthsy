import React from 'react';
import { useParams } from 'react-router-dom';
import { MainHelp } from '../../styles/help/help_nav';
import Notice from './Notice';
import Term from './Term';

const HelpMain = () => {
  let { helpmenu } = useParams();
  const mainContent = {
    notice: <Notice />,
    term: <Term />,
  };

  return <MainHelp>{mainContent[helpmenu]}</MainHelp>;
};

export default HelpMain;
