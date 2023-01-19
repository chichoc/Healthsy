import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { onModalOpen } from '../../store/features/modalSlice';
import { onLogIn } from '../../store/features/pageSlice';
import TermMarketing from '../form/join/TermMarketing';
import Portal from '../../Portal';
import DaumPostcode from './DaumPostcode';
import { IoIosArrowForward } from 'react-icons/io';
import InputForm from '../reusable/InputForm';
import PrimaryButton from '../reusable/PrimaryButton';
import CircleCheck from '../reusable/CircleCheck';
import CircleRadio from '../reusable/CircleRadio';
import useEmailVerification from '../customHook/useEmailVerification';
import dataJoinTerms from '../../assets/api/dataJoinTerms';
import { Join, Form } from '../../styles/mypage/info_edit';
import { Terms } from '../../styles/form/join/join_terms';

const InfoEdit = () => {
  const [inputSaved, setInputSaved] = useState({});
  const [inputEdited, setInputEdited] = useState({});
  const [inputAble, setInputAble] = useState({});
  const [isValidated, setIsValidated] = useState({});
  const [isUpdate, setIsUpdate] = useState(false); // 중복 누름 방지
  const [isEnterAllRequired, setIsEnterAllRequired] = useState(false);
  const [requiredInput, setRequiredInput] = useState(['userName', 'phone']);
  // request state
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const detailedAddressRef = useRef();
  const newEmailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.page.userId);
  const isModal = useSelector((state) => state.modal.isModal);

  const [emailVerification, sendCodeToEmail, verifyEmail] = useEmailVerification({
    email: inputEdited.newEmail,
    setApiError,
    setApiLoading,
  });

  const labelOfValue = {
    verificatedEmail: '이메일',
    newPassword: '비밀번호',
    userName: '이름',
    phone: '연락처',
    zipCode: '우편번호',
    address: '기본주소',
    detailedAddress: '상세주소',
    sex: '성별',
    checkMarketing: dataJoinTerms[4].header,
  };

  let isValidatedAllEdit = Object.values(isValidated).every((value) => !!value);
  let enableEdit = isEnterAllRequired && isValidatedAllEdit;

  const onChangeInputEdited = (e) => {
    const { name, value } = e.target;
    setInputEdited({ ...inputEdited, [name]: value });
  };

  const onCheckInputEdited = (name) => {
    setInputEdited({
      ...inputEdited,
      [name]: !inputEdited[name],
    });
  };

  const onEditPrimary = (name, e) => {
    e.preventDefault();
    setInputAble({ ...inputAble, [name]: !inputAble[name] });
  };

  const checkPassword = (valueToCompare) => {
    return inputEdited.newPassword === valueToCompare;
  };

  const onSearchAddress = (e) => {
    e.preventDefault();
    dispatch(onModalOpen({ component: 'searchAddress', isModal: true }));
  };

  const resetInput = () => setInputEdited({ ...inputSaved });

  const onClickReset = () => {
    const isReset = window.confirm('수정하신 정보는 저장되지 않습니다. 수정하신 정보를 모두 되돌리겠습니까?');
    if (isReset) resetInput();
  };

  const findDifferentInput = () => {
    const keyToEdit = Object.keys(inputEdited).filter((key) => inputEdited[key] !== inputSaved[key]);
    const inputToEdit = {};
    for (const key of keyToEdit) {
      if (labelOfValue[key] === undefined) continue;
      else inputToEdit[key] = inputEdited[key];
    }
    if (inputAble.email) inputToEdit.verificatedEmail = emailVerification.verificatedEmail;
    return inputToEdit;
  };

  const onClickEdit = async (e) => {
    e.preventDefault();
    setIsUpdate(true);
    const inputToEdit = findDifferentInput();
    const editedInputToShow = Object.entries(inputToEdit)
      .map(([key, value]) => {
        if (key === 'checkMarketing') value = value ? '동의' : '비동의';
        else if (key === 'sex') value = value === 'male' ? '남자' : '여자';
        return `${labelOfValue[key]} : ${value}\n`;
      })
      .join('');
    if (Object.keys(inputToEdit).length === 0) alert('수정하신 정보가 없습니다!');
    else window.confirm(`${editedInputToShow} \n위와 같이 수정하시겠습니까?`) && (await updateDB(inputToEdit));
    setIsUpdate(false);
  };

  const updateDB = async (dataToEdit) => {
    try {
      const { data } = await axios.post(
        'http://localhost:8888/mypage/updateUserInfo',
        {
          userId,
          password: inputAble.password ? inputEdited.password : '',
          ...dataToEdit,
        },
        { withCredentials: true }
      );

      if (data.result) {
        alert('회원정보가 수정되었습니다!');
        fetchInput(data.updatedData);
        const { userId, userName } = data.updatedData;
        dispatch(onLogIn({ userId, userName }));
      } else if (data.content === 'password') {
        alert('현재 비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.log(error);
      setApiError(error);
    } finally {
      setApiLoading(false);
    }
  };

  const fetchInput = (data) => {
    const sex = data.sex === 'M' ? 'male' : 'female';
    const checkMarketing = data.checkMarketing === 'Y' ? true : false;
    setInputSaved({ ...data, sex, checkMarketing });
    setInputEdited({ ...data, sex, checkMarketing });
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const { data } = await axios.post('http://localhost:8888/mypage/fetchUserInfo', {
        userId,
      });
      if (!data) return;
      fetchInput(data);
    };
    fetchUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (inputAble.password) {
      passwordRef.current && passwordRef.current.focus();
      setRequiredInput((prev) => [...prev, 'password', 'newPassword', 'newPasswordToCheck']);
    } else setRequiredInput((prev) => prev.filter((p) => !/password/i.test(p)));

    if (newEmailRef.current && inputAble.email) newEmailRef.current.focus();
  }, [inputAble]);

  useEffect(() => {
    // 수정 버튼 클릭 여부에 따라 필수 입력값이 달라짐
    if (inputAble.email)
      setIsEnterAllRequired(requiredInput.every((key) => Boolean(inputEdited[key])) && emailVerification.isVerificated);
    else setIsEnterAllRequired(requiredInput.every((key) => Boolean(inputEdited[key])));
  }, [requiredInput, inputEdited]);

  return (
    <Join>
      <h1>회원 정보</h1>
      <Form className='vertical_flex' align='start'>
        <InputForm
          label='현재 이메일'
          className='ovalInputWithButton'
          rowSet={inputAble.email ? true : false}
          name='email'
          typeToValidate={'email'}
          isValidated={isValidated}
          setIsValidated={setIsValidated}
          placeHolder='현재 이메일'
          changeMethod={onChangeInputEdited}
          button={inputAble.email ? '수정 취소' : '수정'}
          btnDark={true}
          value={inputEdited.email}
          readOnly={true}
          btnClickMethod={(e) => onEditPrimary('email', e)}
        />
        {inputAble.email && (
          <div className='distinguish'>
            <InputForm
              label='새 이메일'
              className='ovalInputWithButton'
              rowSet={true}
              name='newEmail'
              typeToValidate={'email'}
              isValidated={isValidated}
              setIsValidated={setIsValidated}
              placeHolder='새 이메일'
              button='인증 요청'
              outerRef={newEmailRef}
              changeMethod={onChangeInputEdited}
              btnClickMethod={sendCodeToEmail}
              btnDisabled={!isValidated.newEmail || emailVerification.verificatedEmail === inputEdited.newEmail}
            />
            <InputForm
              label='인증번호'
              className='ovalInputWithButton'
              name='newEmailVerificationCode'
              isValidated={isValidated}
              setIsValidated={setIsValidated}
              placeHolder='인증번호 입력'
              button='확인'
              changeMethod={onChangeInputEdited}
              inputDisabled={!emailVerification.sendedCode || emailVerification.isVerificated}
              btnDisabled={!inputEdited.newEmailVerificationCode || emailVerification.isVerificated}
              btnClickMethod={(e) => verifyEmail(e, inputEdited.newEmailVerificationCode)}
              condition={
                emailVerification.isVerificated
                  ? `아래 수정하기를 누르셔야 인증된 이메일(${emailVerification.verificatedEmail})로 변경됩니다.`
                  : '제한 시간 내로 입력해주세요'
              }
            />
          </div>
        )}

        <InputForm
          label='현재 비밀번호'
          className='ovalInputWithButton'
          rowSet={inputAble.password ? true : false}
          type='password'
          typeToValidate={'password'}
          isValidated={isValidated}
          setIsValidated={setIsValidated}
          name='password'
          placeHolder={inputAble.password ? '현재 비밀번호' : ''}
          changeMethod={onChangeInputEdited}
          value={inputAble.password ? inputEdited.password || '' : '12345678'}
          readOnly={!inputAble.password}
          button={inputAble.password ? '수정 취소' : '수정'}
          btnDark={true}
          btnClickMethod={(e) => onEditPrimary('password', e)}
          outerRef={passwordRef}
        />

        {inputAble.password && (
          <div className='horizontal_flex distinguish'>
            <InputForm
              label='새 비밀번호'
              className='oval'
              type='password'
              typeToValidate={'password'}
              isValidated={isValidated}
              setIsValidated={setIsValidated}
              name='newPassword'
              placeHolder='새 비밀번호'
              inputDisabled={!inputEdited.password}
              changeMethod={onChangeInputEdited}
              value={inputEdited.newPassword || ''}
              condition='영문과 숫자 포함하여 8~20자'
            />
            <InputForm
              label='새 비밀번호 확인'
              className='oval'
              type='password'
              typeToValidate={'password'}
              isValidated={isValidated}
              setIsValidated={setIsValidated}
              name='newPasswordToCheck'
              placeHolder='새 비밀번호 확인'
              changeMethod={onChangeInputEdited}
              value={inputEdited.newPasswordToCheck || ''}
              blurMethod={checkPassword}
              inputDisabled={!inputEdited.password}
            />
          </div>
        )}

        <div className='horizontal_flex'>
          <InputForm
            label='이름'
            className='oval'
            name='userName'
            placeHolder='이름'
            isValidated={isValidated}
            setIsValidated={setIsValidated}
            value={inputEdited.userName || ''}
            changeMethod={onChangeInputEdited}
          />
          <InputForm
            label='연락처'
            className='oval'
            name='phone'
            placeHolder='연락처'
            typeToValidate={'phone'}
            isValidated={isValidated}
            setIsValidated={setIsValidated}
            condition=' - 포함하여 번호 입력'
            value={inputEdited.phone || ''}
            changeMethod={onChangeInputEdited}
          />
        </div>

        <InputForm
          label='우편번호'
          className='ovalInputWithButton'
          rowSet={true}
          name='zipCode'
          placeHolder='우편번호'
          readOnly={true}
          button='검색'
          btnClickMethod={onSearchAddress}
          value={inputEdited.zipCode || ''}
        />
        <InputForm
          label='기본주소'
          className='oval'
          rowSet={true}
          name='address'
          placeHolder='기본주소'
          readOnly={true}
          value={inputEdited.address || ''}
        />
        <InputForm
          label='상세주소'
          className='oval'
          name='detailedAddress'
          isValidated={isValidated}
          setIsValidated={setIsValidated}
          placeHolder='상세주소'
          value={inputEdited.detailedAddress || ''}
          inputDisabled={!inputEdited.address}
          changeMethod={onChangeInputEdited}
          outerRef={detailedAddressRef}
        />

        {isModal.searchAddress && (
          <Portal>
            <DaumPostcode
              termHeader={'우편번호 찾기'}
              input={inputEdited}
              setInput={setInputEdited}
              detailedAddressRef={detailedAddressRef}
            />
          </Portal>
        )}

        <fieldset>
          <legend>성별</legend>
          <CircleRadio
            name={'sex'}
            value={'male'}
            checked={inputEdited.sex === 'male'}
            onChangeMethod={(e) => onChangeInputEdited(e)}
            headerSpan={'남자'}
          />
          <CircleRadio
            name={'sex'}
            value={'female'}
            checked={inputEdited.sex === 'female'}
            onChangeMethod={(e) => onChangeInputEdited(e)}
            headerSpan={'여자'}
          />
        </fieldset>

        <Terms>
          <li key={'checkMarketing'}>
            <CircleCheck
              id={'checkMarketing'}
              headerSpan={dataJoinTerms[4].header}
              checked={inputEdited.checkMarketing}
              onChangeMethod={onCheckInputEdited}
              detailSpan={dataJoinTerms[4].detail}
            />
            <IoIosArrowForward
              className='termBtn'
              onClick={(e) => {
                e.preventDefault();
                dispatch(onModalOpen({ component: 'joinTerm', isModal: 4 }));
              }}
            />

            {isModal.joinTerm === 4 && (
              <Portal>
                <TermMarketing termHeader={dataJoinTerms[4].header.slice(0, -3)} />
              </Portal>
            )}
          </li>
        </Terms>

        <div className='horizontal_flex_button'>
          <PrimaryButton buttonName={'되돌리기'} className={'cancel'} onClickMethod={onClickReset} />
          <PrimaryButton
            type={'submit'}
            disabled={!enableEdit || isUpdate}
            buttonName={'수정하기'}
            onClickMethod={onClickEdit}
          />
        </div>
      </Form>
    </Join>
  );
};

export default InfoEdit;
