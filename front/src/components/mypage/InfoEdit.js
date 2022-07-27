import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { onModalOpen } from '../../store/features/modalSlice';
import InputForm from '../reusable/InputForm';
import PrimaryButton from '../reusable/PrimaryButton';
import TermMarketing from '../form/join/TermMarketing';
import Modal from '../../Modal';
import DaumPostcode from './DaumPostcode';
import dataJoinTerms from '../../assets/api/dataJoinTerms';
import { Join, Form, DivInfoEdit } from '../../styles/mypage/info_edit';
import { Terms } from '../../styles/form/join/join_terms';

const InfoEdit = () => {
  const [inputEdit, setInputEdit] = useState({});
  const [inputAble, setInputAble] = useState({});
  const detailedAddressRef = useRef();

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.page.userId);
  const isModal = useSelector((state) => state.modal.isModal.searchAddress);

  const onInputEditChanged = (e) => {
    const { name, value } = e.target;
    setInputEdit({ ...inputEdit, [name]: value });
  };

  const onCheckEdit = (e) => {
    const { name } = e.target;
    setInputEdit({
      ...inputEdit,
      [name]: !inputEdit[name],
    });
  };

  const onEditPrimary = (name, e) => {
    e.preventDefault();
    setInputAble({ ...inputAble, [name]: !inputAble[name] });
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
      if (!response.data[0]) return;
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
              label='현재 이메일'
              className='ovalInputWithButton'
              row_set={inputAble.email ? true : false}
              name='email'
              placeHolder='현재 이메일'
              button={inputAble.email ? '수정 취소' : '수정'}
              value={inputEdit.email || ''}
              disabled={true}
              btnClickMethod={(e) => onEditPrimary('email', e)}
            />
          </div>
          {inputAble.email && (
            <div>
              <InputForm
                label='새 이메일'
                className='ovalInputWithButton'
                row_set='true'
                name='newEmail'
                placeHolder='새 이메일'
                button='중복 확인'
              />
              <InputForm
                label='인증번호'
                className='ovalInputWithButton'
                name='emailVerifyCode'
                placeHolder='인증번호 입력'
                condition='제한 시간 내로 입력해주세요'
                button='확인'
              />
            </div>
          )}
          <div>
            <InputForm
              label='비밀번호'
              className='ovalInputWithButton'
              type='password'
              name='password'
              placeHolder='비밀번호'
              button='수정'
              value='12345678'
              disabled={inputAble.password ? false : true}
              btnClickMethod={(e) => onEditPrimary('password', e)}
            />
          </div>
          {inputAble.password && (
            <div className='horizontal_flex'>
              <InputForm
                label='새 비밀번호'
                className='oval pw_check'
                type='password'
                name='newPassword'
                placeHolder='새 비밀번호'
                condition='영문과 숫자 포함하여 8~20자'
              />
              <InputForm
                label='새 비밀번호 확인'
                className='oval pw_check'
                type='password'
                name='newPasswordCheck'
                placeHolder='새 비밀번호 확인'
              />
            </div>
          )}

          <DivInfoEdit className='horizontal_flex' basis={'40%'}>
            <InputForm
              label='이름'
              className='oval'
              name='userName'
              placeHolder='이름'
              value={inputEdit.userName || ''}
              changeMethod={onInputEditChanged}
            />
            <InputForm
              label='연락처'
              className='oval'
              name='phone'
              placeHolder='연락처'
              condition=' - 제외하고 번호 입력'
              value={inputEdit.phone || ''}
              changeMethod={onInputEditChanged}
            />
          </DivInfoEdit>
          <div>
            <DivInfoEdit className='horizontal_flex' basis={'20%'}>
              <InputForm
                label='우편번호'
                className='ovalInputWithButton'
                row_set='true'
                name='zipCode'
                placeHolder='우편번호'
                disabled={true}
                button='검색'
                btnClickMethod={onSearchAddress}
                value={inputEdit.zipCode || ''}
              />
              <InputForm
                label='기본주소'
                className='oval'
                name='address'
                placeHolder='기본주소'
                disabled={true}
                value={inputEdit.address || ''}
              />
            </DivInfoEdit>
            <InputForm
              label='상세주소'
              className='oval'
              name='detailedAddress'
              placeHolder='상세주소'
              value={inputEdit.detailedAddress || ''}
              changeMethod={onInputEditChanged}
              outerRef={detailedAddressRef}
            />
          </div>
          {isModal && (
            <Modal>
              <DaumPostcode
                termHeader={'우편번호 찾기'}
                inputEdit={inputEdit}
                setInputEdit={setInputEdit}
                detailedAddressRef={detailedAddressRef}
              />
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
