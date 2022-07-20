import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { onModalOpen } from '../../store/features/modalSlice';
import InputForm from '../reusable/InputForm';
import PrimaryButton from '../reusable/PrimaryButton';
import TermMarketing from '../form/join/TermMarketing';
import Modal from '../../Modal';
import DaumPostcode from './DaumPostcode';
import dataJoinTerms from '../../assets/api/dataJoinTerms';
import { Join, Form } from '../../styles/mypage/info_edit';
import { Terms } from '../../styles/form/join/join_terms';

const InfoEdit = () => {
  const [inputEdit, setInputEdit] = useState({});
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.page.userId);
  const isModal = useSelector((state) => state.modal.isModal.searchAddress);

  const onCheckEdit = (e) => {
    const { name } = e.target;
    setInputEdit({
      ...inputEdit,
      [name]: !inputEdit[name],
    });
  };

  const onSearchAddress = (e) => {
    e.preventDefault();
    dispatch(onModalOpen({ component: 'searchAddress', isModal: true }));
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await axios.post('http://localhost:8888/mypage/fetchUserInfo', {
        userId,
      });
      const marketingChecked = response.data[0].checkMarketing === 'Y' ? true : false;
      setInputEdit({ ...response.data[0], checkMarketing: marketingChecked });
    };
    fetchUserInfo();
  }, []);

  return (
    <>
      <Join>
        <h1>회원 정보</h1>
        <Form className='vertical_flex' align='start'>
          <div>
            <InputForm
              label='이메일'
              className='ovalInputWithButton'
              name='email'
              placeHolder='이메일'
              button='수정'
              value={inputEdit.email && inputEdit.email}
            />
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
            <InputForm label='이름' className='oval' name='userName' placeHolder='이름' value={inputEdit.name} />
            <InputForm
              label='연락처'
              className='oval'
              name='phone'
              placeHolder='연락처'
              condition=' - 제외하고 번호 입력'
              value={inputEdit.phone && inputEdit.phone}
            />
          </div>
          <div>
            <InputForm
              label='우편번호'
              className='ovalInputWithButton'
              row_set='true'
              name='email'
              placeHolder='우편번호'
              button='검색'
              btnClickMethod={onSearchAddress}
              value={inputEdit.zip_code && inputEdit.zip_code}
            />
            <div className='horizontal_flex'>
              <InputForm
                label='기본주소'
                className='oval'
                name='phoneNumber'
                placeHolder='기본주소'
                value={inputEdit.address && inputEdit.address}
              />
              <InputForm
                label='상세주소'
                className='oval'
                name='userName'
                placeHolder='상세주소'
                value={inputEdit.detailedAddress && inputEdit.detailedAddress}
              />
            </div>
          </div>
          {isModal && (
            <Modal>
              <DaumPostcode termHeader={'우편번호 찾기'} inputEdit={inputEdit} setInputEdit={setInputEdit} />
            </Modal>
          )}

          <div>
            <fieldset>
              <legend>성별</legend>
              <input type='radio' id='sexmale' name='checkSex' value='male' />
              <label htmlFor='sexmale'>남자</label>
              <input type='radio' id='sexFemale' name='checkSex' value='female' />
              <label htmlFor='sexFemale'>여자</label>
            </fieldset>
          </div>

          <Terms>
            <li key={'checkMarketing'}>
              <input
                type='checkbox'
                id={'checkMarketing'}
                name={'checkMarketing'}
                checked={inputEdit.checkMarketing}
                onChange={() => onCheckEdit('checkMarketing')}
              />
              <label htmlFor={'checkMarketing'}>{dataJoinTerms[4].header}</label>
              {dataJoinTerms[4].detail ? (
                <span className={dataJoinTerms[4].detailClassName}>&nbsp;{dataJoinTerms[4].detail}</span>
              ) : (
                ''
              )}
              {dataJoinTerms[4].button && (
                <button
                  className='termBtn'
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(onModalOpen({ component: 'joinTerm', isModal: 4 }));
                  }}
                >
                  &#10095;
                </button>
              )}
              {isModal === 4 && (
                <Modal>
                  <TermMarketing termHeader={dataJoinTerms[4].header.slice(0, -3)} />
                </Modal>
              )}
            </li>
          </Terms>

          <div className='horizontal_flex_button'>
            <PrimaryButton buttonName={'취소하기'} className={'cancel'} />
            <PrimaryButton type={'submit'} buttonName={'수정하기'} />
          </div>
        </Form>
      </Join>
    </>
  );
};

export default InfoEdit;
