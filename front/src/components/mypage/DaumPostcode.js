import React from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import withModal from '../withModal';

const DaumPostcode = ({ inputEdit, setInputEdit }) => {
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

    console.log(fullAddress);
    setInputEdit({ ...inputEdit, address: fullAddress });
  };

  return (
    <>
      <DaumPostcodeEmbed onComplete={handleComplete} />
    </>
  );
};

export default withModal(DaumPostcode);
