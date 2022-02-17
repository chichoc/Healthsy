import React, { useState } from 'react';
import JoinForm from '../components/JoinForm';
import MainHeader from '../components/MainHeader';
import MainTop from '../components/MainTop';

const Join = () => {
  const [inputJoin, setInputJoin] = useState({});
  const [inputEmailId, setInputEmailId] = useState('');

  const onChangeInputJoin = (e) => {
    setInputJoin({ ...inputJoin, [e.target.name]: e.target.value });
    if (e.target.name === 'email' && inputJoin.email.includes('@')) {
      let userEnd = inputJoin.email.indexOf('@');
      setInputEmailId(inputJoin.email.substr(0, userEnd));
      e.target.setAttribute('list', 'email-domain');
    }
  };

  return (
    <>
      <MainTop />
      <MainHeader />
      <JoinForm inputEmailId={inputEmailId} onChangeInputJoin={onChangeInputJoin} />
    </>
  );
};

export default Join;
