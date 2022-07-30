import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthUser {
  name: string,
  uid: string,
  phone: string,
  email: string,
  verified: boolean,
  photo: string,
}

export interface LoginState {
  isLoading: boolean,
  isFirstSignin: boolean,
  user: AuthUser|null|undefined,
}

export interface KellnerState {
  loginState: LoginState,
  otherState: number,
}

const initialState: KellnerState = {
  loginState: {
    isLoading: true,
    isFirstSignin: true,
    user: null,
  },
  otherState: 0
}

export const kellnerSlice = createSlice({
  name: 'kellner',
  initialState,
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
    flagAppLoading: (state) => {
      state.loginState.isLoading = true;
    },
    flagAppLoaded: (state) => {
      state.loginState.isLoading = false;
    },
    setAuthedUser: (state, action: PayloadAction<AuthUser>) => {
      state.loginState.user = action.payload;
    },
    clearAuthedUser: (state) => {
      state.loginState.user = null;
    },
    updateFirstSignin: (state, action: PayloadAction<boolean>) => {
      state.loginState.isFirstSignin = action.payload;
    },
    updateLoginState: (state, action: PayloadAction<LoginState>) => {
      state.loginState = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { flagAppLoading, flagAppLoaded, setAuthedUser, clearAuthedUser, updateLoginState, updateFirstSignin } = kellnerSlice.actions

export default kellnerSlice.reducer