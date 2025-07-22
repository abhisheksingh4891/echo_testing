import { PayloadAction, createSlice } from "@reduxjs/toolkit";

 interface AppState {
  isAuthenticated: boolean;
  access_token: string;
  userData: object;
  pageStep:number;
  isGuestMode: boolean
}

const initialState: AppState = {
  isAuthenticated: false,
  access_token: "",
  userData: {},
  pageStep:0,
  isGuestMode:false
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      console.log(action)
      return({
      ...state,
      access_token :action.payload.token,
      userData : action.payload.userData,
      isAuthenticated : true,
      });
      // state.access_token = action.payload.token;
      // state.userData = action.payload.userData;
      // state.isAuthenticated = true;
      ////console.log(action);
    },
    devicePageStep: (state, action: PayloadAction<any>) => {
      state.pageStep = action.payload;
    },
    guestModeAction:(state, action: PayloadAction<boolean>)=>{
      state.isGuestMode = action.payload
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.access_token = "";
      state.userData = {};
     state.pageStep=0;
    },
  
  },
});

export const { login, logOut, devicePageStep, guestModeAction } = appSlice.actions;

export default appSlice.reducer;
