
import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { useDispatch } from "react-redux"
import { BATCH_URL } from "../../utilitis/Utiliti"



export const addcoupontdata=(data)=>async(dispatch)=>{
  
    try {
      await axios.post(BATCH_URL+'coupons',data)
      .then((res)=>{
        dispatch(addcoupon(res.data))
      })
        
     
    } catch (error) {
       
    }
    
  }

  export const getcoupon=()=>async(dispatch)=>{
  
    try {
      await axios.get(BATCH_URL+'coupons')
      
       dispatch(getcoupon)
    } catch (error) {
       
    }  
  }


const initialState={
    isloading:false,
    coupons:[],
    error:null,
}

console.log(initialState);

const couponSlice=createSlice({
    name :"coupons",
    "initialState":initialState ,
    reducers:{
        addcoupon:(state,action)=>{
            console.log(action.payload);
            state.coupons.concat(action.payload)
        }
        
    }


})


export const {addcoupon}=couponSlice.actions;
export default couponSlice.reducer;



