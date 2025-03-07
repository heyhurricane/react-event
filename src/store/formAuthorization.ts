import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IFormAutorization {
  login: string;
  password: string;
  isLoginValid : boolean;
  isPasswordValid: boolean;
}

const initialState: IFormAutorization = {
  login: '',
  password: '',
  isLoginValid : true,
  isPasswordValid: true
};

export const formAuthorizationSlice = createSlice({
  name: 'formAuthorization',
  initialState: initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<string>) => {
      state.login = action.payload;
      //formAuthorizationSlice.caseReducers.setEmailError(state);
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
      //formAuthorizationSlice.caseReducers.setPasswordError(state);
    },
    setIsLoginValid: (state, action) => {
      /*const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (state.login && !emailRegex.test(state.login)) {
        state.emailError = 'Введите корректный email-адрес';
      } else {
        state.emailError = '';
      }*/
      state.isLoginValid  = action.payload;
    },
    setIsPasswordValid: (state, action) => { 
      /*if (state.password.length < 5) {
        state.passwordError = 'Пароль не менее 5 символов';
      } else {
        state.passwordError = '';
      }*/
      state.isPasswordValid  = action.payload;
    },
    resetFormAuthorization: (state) => {
      state.login = '';
      state.password = '';
    },
  },
});
export const { setLogin, setPassword, setIsLoginValid, setIsPasswordValid, resetFormAuthorization } = formAuthorizationSlice.actions;
export default formAuthorizationSlice.reducer;
