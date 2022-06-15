import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from '../../store/features/formSlice';
import InputForm from '../form/InputForm';
import JoinTerms from '../form/join/JoinTerms';
import { Join, Title, Form, Button } from '../../styles/mypage/info_edit';

const InfoEdit = () => {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.form.inputValue);
  const status = useSelector((state) => state.form.status);
  const userId = useSelector((state) => state.page.userId);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchUserInfo(userId));
    // if (status === 'succeeded')
  }, [dispatch, status, userId]);

  return (
    <>
      <Join>
        <Title>회원 정보</Title>
        <Form className='vertical_flex' align='start'>
          <div>
            <InputForm label='이메일' className='ovalInputWithButton' name='email' placeHolder='이메일' button='수정' />
          </div>
          <div>
            <InputForm
              label='비밀번호'
              className='ovalInputWithButton'
              type='password'
              name='password'
              placeHolder='비밀번호'
              button='수정'
            />
          </div>

          {/* <InputForm
              label='비밀번호 확인'
              className='oval pw_check'
              type='password'
              name='passwordCheck'
              placeHolder='비밀번호 확인'
            /> */}

          <div className='horizontal_flex'>
            <InputForm label='이름' className='oval' name='userName' placeHolder='이름' />
            <InputForm
              label='연락처'
              className='oval'
              name='phoneNumber'
              placeHolder='연락처'
              condition=' - 제외하고 번호 입력'
            />
          </div>
          <div className='horizontal_flex'>
            <InputForm label='우편번호' className='oval' name='userName' placeHolder='우편번호' />
            <InputForm
              label='연락처'
              className='oval'
              name='phoneNumber'
              placeHolder='연락처'
              condition=' - 제외하고 번호 입력'
            />
          </div>
          <div>
            <input type='radio' id='sexmale' name='checkSex' value='male'></input>
            <label for='sexmale'>남자</label>
            <input type='radio' id='sexFemale' name='checkSex' value='female'></input>
            <label for='sexFemale'>여자</label>
          </div>

          <div>
            <Button type='submit' className='oval join_btn'>
              돌아가기
            </Button>
            <Button type='submit' className='oval join_btn'>
              수정하기
            </Button>
            <button>탈퇴하기</button>
          </div>
        </Form>
      </Join>
    </>
  );
};

export default InfoEdit;
