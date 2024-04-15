import { createSlice } from "@reduxjs/toolkit";

const initialState={
    cart:[]
}

export const cartSlice=createSlice({
    name:'cart',
    initialState:initialState,
    reducer:{
        addtoocart:(state,action)=>{
            console.log(action);
            state.cart.push(action.payload)
        },
    }
})

export const {addtoocart}=cartSlice.actions
export default cartSlice.reducer