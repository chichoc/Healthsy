import React from 'react';
import withModal from '../../withModal';

const TermInfo = () => {
  return (
    <main>
      <p>
        Healthsy(는) 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여, 적법하게
        개인정보를 처리하고 안전하게 관리하고 있습니다. 이에 「개인정보 보호법」 제30조에 따라 정보주체에게 개인정보
        처리에 관한 절차 및 기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과
        같이 개인정보 처리방침을 수립·공개합니다.
      </p>
    </main>
  );
};

export default withModal(TermInfo);