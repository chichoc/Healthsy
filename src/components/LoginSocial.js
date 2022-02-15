import React from 'react';
import { Div, Button } from '../styles/login_social';

const LoginSocial = () => {
  return (
    <Div className='social'>
      <span>or</span>
      <Button kakatalk>카톡</Button>
      <Button naver>네버</Button>
      <Button>페북</Button>
    </Div>
  );
};

export default LoginSocial;
