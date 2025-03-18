import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IFormAuthorization {
  login: string;
  password: string;
  isLoginValid: boolean;
  isPasswordValid: boolean;
}

const initialState: IFormAuthorization = {
  login: '',
  password: '',
  isLoginValid: true,
  isPasswordValid: true,
};

export const formAuthorizationSlice = createSlice({
  name: 'formAuthorization',
  initialState: initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<string>) => {
      state.login = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setIsLoginValid: (state, action) => {
      state.isLoginValid = action.payload;
    },
    setIsPasswordValid: (state, action) => {
      state.isPasswordValid = action.payload;
    },
    resetFormAuthorization: (state) => {
      state.login = '';
      state.password = '';
    },
  },
});
export const { setLogin, setPassword, setIsLoginValid, setIsPasswordValid, resetFormAuthorization } =
  formAuthorizationSlice.actions;
export default formAuthorizationSlice.reducer;
