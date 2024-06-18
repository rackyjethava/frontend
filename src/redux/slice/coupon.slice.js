
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { useDispatch } from "react-redux"
import { BATCH_URL } from "../../utilitis/Utiliti"


export const addcoupontdata = createAsyncThunk(
    'coupons/add',
    async (data) => {
        try {
            const response = await axios.post(BATCH_URL + 'coupons', data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getcoupontdata = createAsyncThunk(
    'coupons/get',
    async () => {
        try {
            const response = await axios.get(BATCH_URL + 'coupons');
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const deleteCoupon=createAsyncThunk(
    'coupons/delete',
    async (id) => {
        try {
             await axios.delete(BATCH_URL + 'coupons/'+id);
             return id;
           
        } catch (error) {
            console.log(error);
        }
    }
);

export const editeCoupon=createAsyncThunk(
    'coupons/edite',
    async (data) => {
        try {
            const response = await axios.put(BATCH_URL + 'coupons/'+data.id,data);
            return response.data;
           
        } catch (error) {
            console.log(error);
        }
    }
)

const initialState={
    isloading:false,
    coupons:[],
    error:null,
}



const couponSlice=createSlice({
    name :"coupons",
    "initialState":initialState ,
    reducers:{ },
    extraReducers:(builder)=>{
        builder
        .addCase(addcoupontdata.fulfilled,(state,action)=>{
            state.coupons=state.coupons.concat(action.payload)
        })
        .addCase(getcoupontdata.fulfilled,(state,action)=>{
            state.coupons=action.payload
        })
        .addCase(deleteCoupon.fulfilled,(state,action)=>{
            state.coupons=state.coupons.filter((v)=>v.id !==  action.payload)
        })
        .addCase(editeCoupon.fulfilled,(state,action)=>{
            state.coupons = state.coupons.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload;
                } else {
                    return v;
                }
            });
        })
    }
    
})


export const {addcoupon}=couponSlice.actions;
export default couponSlice.reducer;



