import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  inputValue: {
    check: { checkAge: true, checkService: true, checkInfo: true, checkMarketing: false },
    verifyEmail: false,
    inputEmailId: '',
  },
  focusedInputName: {},
  isCheckAll: false,
};
// join: email, emailVerifyCode, password, passwordCheck, userName, phoneNumber

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    onFocusInput: (state, action) => {
      const { focusedInputName } = state;
      state.focusedInputName = { ...focusedInputName, [action.payload]: true };
    },
    onBlurInput: (state, action) => {
      const { focusedInputName } = state;
      state.focusedInputName = { ...focusedInputName, [action.payload]: false };
    },

    onCheck: (state, action) => {
      const { inputValue } = state;
      state.inputValue = {
        ...inputValue,
        check: { ...inputValue.check, [action.payload]: !inputValue.check[action.payload] },
      };
      const { checkAge, checkService, checkInfo, checkMarketing } = state.inputValue.check;
      // 약관 일일이 모두 체크하면 전체 선택 버튼도 체크
      if (checkAge && checkService && checkInfo && checkMarketing) {
        state.isCheckAll = true;
      } // 하나라도 체크 해제되면 전체 선택 버튼 해제
      else if (checkAge || checkService || checkInfo || checkMarketing) {
        state.isCheckAll = false;
      }
    },
    onCheckAll: (state) => {
      const { isCheckAll } = state;
      state.inputValue.check = isCheckAll
        ? { checkAge: false, checkService: false, checkInfo: false, checkMarketing: false }
        : { checkAge: true, checkService: true, checkInfo: true, checkMarketing: true };
      state.isCheckAll = !isCheckAll;
    },
    successVerifyEmail: (state) => {
      const { inputValue } = state;
      state.inputValue = { ...inputValue, verifyEmail: true };
    },
  },
});

export const {
  onFocusInput,
  onBlurInput,
  onCheck,
  onCheckAll,

  successVerifyEmail,
} = formSlice.actions;

export default formSlice.reducer;
