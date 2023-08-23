import { createSlice } from "@reduxjs/toolkit";

export const CounterSlice=createSlice({
    name:"counter",
    initialState:{
        quantity:0,
    },
    reducers:{
        incrementByAmount:(state,action)=>{

          state.quantity += action.payload;
        },

    }
});
export const {incrementByAmount}=CounterSlice.actions

export default CounterSlice.reducer; 
