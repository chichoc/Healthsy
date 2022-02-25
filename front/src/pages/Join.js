import React, { useState } from 'react';
import JoinForm from '../components/JoinForm';
import withPage from './withPage';
import axios from 'axios';

const Join = () => {
  const emailDomain = [{ domain: 'naver.com' }, { domain: 'gmail.com' }, { domain: 'apple.com' }];

  const [inputJoin, setInputJoin] = useState({});
  const [inputEmailId, setInputEmailId] = useState('');

  const onChangeInputJoin = (e) => {
    setInputJoin({ ...inputJoin, [e.target.name]: e.target.value });
    if (e.target.name === 'email' && e.target.value.includes('@')) {
      let emailIdIndex = e.target.value.indexOf('@');
      setInputEmailId(e.target.value.substr(0, emailIdIndex));
      e.target.setAttribute('list', 'email-domain');
    }
  };

  const onClickJoin = () => {
    axios
      .post('http://localhost:8888/join', {
        email: inputJoin.email,
        password: inputJoin.password,
      })
      .then((response) => {
        console.log('join:', response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <JoinForm
        emailDomain={emailDomain}
        inputEmailId={inputEmailId}
        onChangeInputJoin={onChangeInputJoin}
        onClickJoin={onClickJoin}
      />
    </>
  );
};

export default withPage(Join);
