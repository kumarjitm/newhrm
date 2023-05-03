import {createSlice} from '@reduxjs/toolkit';

export interface AuthState {
  isLoggedIn: boolean;
  userId: any | null;
  currentUser: any;
}

const initialState: AuthState = {
  isLoggedIn: !!localStorage.getItem('token'),
  userId:{},
  currentUser: {
    email: 'mail@example.com',
    picture: null
  }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, {payload}) => {
      // localStorage.setItem('token', payload);
      state.isLoggedIn = true;
      state.userId= payload;
    },
    logoutUser: (state) => {
      localStorage.clear();
      state.currentUser = {};
      state.isLoggedIn = false;
      state.userId = null;
    },
    loadUser: (state, {payload}) => {
      state.currentUser = payload;
    }
  }
});

export const {loginUser, logoutUser, loadUser} = authSlice.actions;

export default authSlice.reducer;
