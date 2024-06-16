import { createSlice } from "@reduxjs/toolkit";
import { IauthorState } from "../type/type";
import { authCheckAsync,loginAsync } from "../Asyncthunks/authAsync";
import { IAuthor, IProfile } from "../../types/app";

const storedToken = localStorage.getItem('token');
const initialIsLogin = storedToken ? true : false;

const initialState: IauthorState = {
    isLogin: initialIsLogin,
    token: storedToken || "",
    profile: {} as IAuthor
};

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
            state.profile = action.payload;
         })
         builder.addCase(authCheckAsync.rejected,(_,action)=>{
            console.log(`rejected ${action}`);
         })
         builder.addCase(authCheckAsync.pending,(_,action)=>{
            console.log(`pending ${action}`);
         })
         
     },
     
})

export const {LOGIN}= authSlice.actions
export default authSlice.reducer;