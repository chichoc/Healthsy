import React, { createContext, useState } from 'react';

export const JoinContext = createContext();

const JoinProvider = (props) => {
  const [inputJoin, setInputJoin] = useState({
    check: { checkAge: false, checkService: false, checkInfo: false, checkMarketing: false },
    emailVerify: false,
  });
  const [inputFocusJoin, setInputFocusJoin] = useState({});
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const onFocusInputJoin = (e) => {
    setInputFocusJoin({ ...inputFocusJoin, [e.target.name]: true });
  };

  const onBlurInputJoin = (e) => {
    setInputFocusJoin({ ...inputFocusJoin, [e.target.name]: false });
  };

  const onCheck = (e) => {
    const { name } = e.target;
    const checkData = { ...inputJoin, check: { ...inputJoin.check, [name]: !inputJoin.check[name] } };
    setInputJoin(checkData);
  };

  const onCheckAll = () => {
    if (isCheckAll === true) {
      setInputJoin({
        ...inputJoin,
        check: { checkAge: false, checkService: false, checkInfo: false, checkMarketing: false },
      });
    } else {
      setInputJoin({
        ...inputJoin,
        check: { checkAge: true, checkService: true, checkInfo: true, checkMarketing: true },
      });
    }
    setIsCheckAll(!isCheckAll);
  };
  const onModalOpen = (e) => {
    e.preventDefault();
    setIsModal(true);
  };

  const onModalClose = () => {
    setIsModal(false);
  };

  return (
    <JoinContext.Provider
      value={{
        inputJoin,
        setInputJoin,
        inputFocusJoin,
        setInputFocusJoin,
        isCheckAll,
        setIsCheckAll,
        isModal,
        setIsModal,
        onFocusInputJoin,
        onBlurInputJoin,
        onCheck,
        onCheckAll,
        onModalOpen,
        onModalClose,
      }}
    >
      {props.children}
    </JoinContext.Provider>
  );
};

export default JoinProvider;
