import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  tempEmp: any | null;
}
  
const initialState: AuthState = {
  tempEmp:{},
};

export const serviceSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
      addTempEmp: (state, {payload}) => {
        state.tempEmp= payload;
      },
      removeTempEmp:(state)=>{
        state.tempEmp=null;
      }
    }
});

export const {addTempEmp} = serviceSlice.actions;

export default serviceSlice.reducer;