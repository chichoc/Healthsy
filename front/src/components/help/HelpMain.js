import React from 'react';
import { useParams } from 'react-router-dom';
import Notice from './Notice';
import Term from './Term';
import { MainHelp } from '../../styles/help/help_nav';

const HelpMain = () => {
  let { helpmenu } = useParams();

  const mainContent = {
    notice: <Notice />,
    term: <Term />,
  };

  return <MainHelp>{mainContent[helpmenu]}</MainHelp>;
};

export default HelpMain;
