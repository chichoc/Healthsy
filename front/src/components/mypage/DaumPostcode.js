import React from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { useDispatch } from 'react-redux';
import { onFocusInput } from '../../store/features/formSlice';
import { onModalClose } from '../../store/features/modalSlice';
import withModal from '../withModal';

const DaumPostcode = ({ props }) => {
  const dispatch = useDispatch();
  const { inputEdit, setInputEdit, inputRef } = props;

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setInputEdit({ ...inputEdit, zipCode: data.zonecode, address: fullAddress });
  };

  return (
    <>
      <DaumPostcodeEmbed
        onComplete={handleComplete}
        onClose={() => {
          dispatch(onModalClose());
          dispatch(onFocusInput('detailedAddress'));
          inputRef.current.focus();
        }}
      />
    </>
  );
};

export default withModal(DaumPostcode);
