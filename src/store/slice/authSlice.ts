import { createSlice } from "@reduxjs/toolkit";
import { IauthorState } from "../type/type";
import { authCheckAsync,loginAsync } from "../Asyncthunks/authAsync";
import { IProfile } from "../../types/app";

const initialState : IauthorState = {
    isLogin:false,
    token:"",
    profile: {} as IProfile
}

export const authSlice = createSlice({
    name:"auth",
     initialState,
     reducers:{LOGIN: (state, action) => {
      console.log("FROM LOGIN ACTION", action.payload);

      state.isLogin = true;
        state.token = action.payload.token;
       state.profile = action.payload.profile;
   }  
     },
     extraReducers(builder) {
         builder.addCase(loginAsync.fulfilled,(state,action) => {            
            state.isLogin = true;
            state.token = action.payload;
            
         })
         builder.addCase(loginAsync.rejected,(_,action)=>{
            console.log(`rejected ${action}`);
         })
         builder.addCase(loginAsync.pending,(_,action)=>{
            console.log(`pending ${action}`);
         })
    
         builder.addCase(authCheckAsync.fulfilled,(state,action) => {
            state.isLogin = true;
            state.token = action.payload;
         })
         builder.addCase(authCheckAsync.rejected,(_,action)=>{
            console.log(`rejected ${action}`);
         })
         builder.addCase(authCheckAsync.pending,(_,action)=>{
            console.log(`pending ${action}`);
         })
         
     },
     
})

export default authSlice.reducer;
export const {LOGIN}= authSlice.actions