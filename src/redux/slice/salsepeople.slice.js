import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const getSalespeople = createAsyncThunk(
    'salespeople/get',
    async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/salsepeople/get-salsepeople");
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const addSalespeople = createAsyncThunk(
    'salespeople/add',
    async (data) => {
        try {
            const response = await axios.post("http://localhost:8000/api/v1/salsepeople/add-salespeople", data);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const deleteSalespeople = createAsyncThunk(
    'salespeople/delete',
    async (id) => {
        try {
            await axios.delete("http://localhost:8000/api/v1/salsepeople/delete-salespeople/" + id);
            return id;
        } catch (error) {
            console.log(error);
        }
    }
);

export const updateSalespeople = createAsyncThunk(
    'salespeople/update',
    async (data) => {
        try {
            const response = await axios.put("http://localhost:8000/api/v1/salsepeople/update-salespeople/" + data.SNUM, data);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);



const initialState = {
    isLoading: false,
    salespeople: [],
    error: null,
}



const salespeopleSlice = createSlice({
    name: "salespeople",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addSalespeople.fulfilled, (state, action) => {
                state.salespeople = state.salespeople.concat(action.payload);
            })
            .addCase(getSalespeople.fulfilled, (state, action) => {
                state.salespeople = action.payload.data;
            })
            .addCase(deleteSalespeople.fulfilled, (state, action) => {
                state.salespeople = state.salespeople.filter((v) => v.SNUM !== action.payload);
            })
            .addCase(updateSalespeople.fulfilled, (state, action) => {
                state.salespeople = state.salespeople.map((v) => {
                    if (v.SNUM === action.payload.SNUM) {
                        return action.payload;
                    } else {
                        return v;
                    }
                });
            })
    }
});

export default salespeopleSlice.reducer;
