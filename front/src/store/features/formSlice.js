import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
  inputValue: {
    check: { checkAge: false, checkService: false, checkInfo: false, checkMarketing: false },
    verifyEmail: false,
    inputEmailId: '',
  },
  focusedInputName: {},
  isCheckAll: false,
  isModal: undefined,
  isDisabled: true,
};

export const formSlice = createSlice({
  name: 'form',
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    ableClick: (state) => {
      state.value.isDisabled = false;
    },
    disableClick: (state) => {
      state.value.isDisabled = true;
    },
    onChangeInput: (state, action) => {
      const { inputValue } = state.value;
      const { name, value } = action.payload;
      state.value.inputValue = { ...inputValue, [name]: value };
      if (name === 'email' && value.includes('@')) {
        let emailIdIndex = value.indexOf('@');
        state.value.inputValue.inputEmailId = value.substr(0, emailIdIndex);
        action.payload.setAttribute('list', 'email-domain');
      }
      if (
        state.value.inputValue.email &&
        state.value.inputValue.verifyEmail &&
        state.value.inputValue.password &&
        state.value.inputValue.passwordCheck &&
        state.value.inputValue.username &&
        state.value.inputValue.phoneNumber
      )
        state.value.isDisabled = false;
      else state.value.isDisabled = true;
    },

    onFocusInput: (state, action) => {
      const { focusedInputName } = state.value;
      state.value.focusedInputName = { ...focusedInputName, [action.payload]: true };
    },
    onBlurInput: (state, action) => {
      const { focusedInputName } = state.value;
      state.value.focusedInputName = { ...focusedInputName, [action.payload]: false };
    },

    onCheck: (state, action) => {
      const { inputValue } = state.value;
      state.value.inputValue = {
        ...inputValue,
        check: { ...inputValue.check, [action.payload]: !inputValue.check[action.payload] },
      };
      const { checkAge, checkService, checkInfo, checkMarketing } = state.value.inputValue.check;
      // 약관 일일이 모두 체크하면 전체 선택 버튼도 체크
      if (checkAge && checkService && checkInfo && checkMarketing) {
        state.value.isCheckAll = true;
      } // 하나라도 체크 해제되면 전체 선택 버튼 해제
      else if (checkAge || checkService || checkInfo || checkMarketing) {
        state.value.isCheckAll = false;
      }
    },
    onCheckAll: (state) => {
      const { isCheckAll } = state.value;
      state.value.inputValue.check = isCheckAll
        ? { checkAge: false, checkService: false, checkInfo: false, checkMarketing: false }
        : { checkAge: true, checkService: true, checkInfo: true, checkMarketing: true };
      state.value.isCheckAll = !isCheckAll;
    },
    changeCheckAll: (state) => {
      const { isCheckAll } = state.value;
      state.value.isCheckAll = !isCheckAll;
    },

    successVerifyEmail: (state) => {
      const { inputValue } = state.value;
      state.value.inputValue = { ...inputValue, verifyEmail: true };
    },
  },
});

export const {
  ableClick,
  disableClick,
  onChangeInput,
  onFocusInput,
  onBlurInput,
  onCheck,
  onCheckAll,
  changeCheckAll,
  successVerifyEmail,
} = formSlice.actions;

export default formSlice.reducer;
