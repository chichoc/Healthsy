import React, { useState } from 'react';
import JoinForm from '../components/JoinForm';
import MainHeader from '../components/MainHeader';
import MainTop from '../components/MainTop';

const Join = () => {
  const [inputJoin, setInputJoin] = useState({});

  const onChangeInputJoin = (e) => {
    setInputJoin({ ...inputJoin, [e.target.name]: e.target.value });
  };
  return (
    <>
      <MainTop />
      <MainHeader />
      <JoinForm onChangeInputJoin={onChangeInputJoin} />
    </>
  );
};

export default Join;
