import React from 'react';
import { DivSocial, BtnSocial } from '../../../styles/form/login/login_social';
import kakaoLogo from '../../../assets/img/kakaoLoginLargeNarrow.png';
import naverLogo from '../../../assets/img/naverLoginCircle.png';
import googleLogo from '../../../assets/img/googleLightNormalSignin.svg';

const LoginSocial = () => {
  const infoOfPlaform = {
    google: {
      img: googleLogo,
      url: `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.REACT_APP_CLIENT_KEY_GOOGLE}&scope=openid%20email%20profile&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}/google&state=${process.env.REACT_APP_STATE}`,
    },
    naver: {
      img: naverLogo,
      url: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_CLIENT_KEY_NAVER}&state=${process.env.REACT_APP_STATE}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}/naver`,
    },
    kakao: {
      img: kakaoLogo,
      url: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY_KAKAO}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}/kakao&response_type=code`,
    },
  };
  return (
    <DivSocial className='horizontal_flex'>
      <span>or</span>
      {Object.keys(infoOfPlaform).map((platform) => (
        <BtnSocial
          key={platform}
          style={{ backgroundImage: `url(${infoOfPlaform[platform].img})` }}
          platform={platform}
          onClick={() => (window.location.href = infoOfPlaform[platform].url)}
        />
      ))}
    </DivSocial>
  );
};

export default LoginSocial;
