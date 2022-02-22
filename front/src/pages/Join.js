import React, { useState } from 'react';
import JoinForm from '../components/JoinForm';
import MainHeader from '../components/MainHeader';
import MainTop from '../components/MainTop';

const Join = () => {
  const [inputJoin, setInputJoin] = useState({});
  const [inputEmailId, setInputEmailId] = useState('');

  const emailDomain = [{ domain: 'naver.com' }, { domain: 'gmail.com' }, { domain: 'apple.com' }];

  const onChangeInputJoin = (e) => {
    setInputJoin({ ...inputJoin, [e.target.name]: e.target.value });
    if (e.target.name === 'email' && e.target.value.includes('@')) {
      let emailIdIndex = e.target.value.indexOf('@');
      setInputEmailId(e.target.value.substr(0, emailIdIndex));
      e.target.setAttribute('list', 'email-domain');
    }
  };

  return (
    <>
      <MainTop />
      <MainHeader />
      <JoinForm emailDomain={emailDomain} inputEmailId={inputEmailId} onChangeInputJoin={onChangeInputJoin} />
    </>
  );
};

export default Join;
