import React from 'react';
import { DivSocial, BtnSocial } from '../../../styles/form/login/login_social';
import kakao from '../../../assets/img/kakaoLoginLargeNarrow.png';
import naver from '../../../assets/img/naverLoginCircle.png';
import google from '../../../assets/img/googleLightNormalSignin.svg';

const LoginSocial = () => {
  return (
    <DivSocial className='horizontal_flex'>
      <span>or</span>
      <BtnSocial
        style={{ backgroundImage: `url(${kakao})` }}
        kakao
        onClick={() =>
          (window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY_KAKAO}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI_KAKAO}&response_type=code`)
        }
      ></BtnSocial>
    </DivSocial>
  );
};

export default LoginSocial;
