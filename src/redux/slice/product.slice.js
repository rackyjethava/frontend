import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = 'http://localhost:8000/api/v1/products';


export const fetchProducts = createAsyncThunk(
    'products/fetch',
    async () => {
        try {
            const response = await axios.get(`${API_URL}/list-products`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch products:', error);
            throw error;
        }
    }
);


export const addProduct = createAsyncThunk(
    'products/add',
    async (data) => {
        try {
            const response = await axios.post(`${API_URL}/add-product`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data.data;  
        } catch (error) {
            console.error('Failed to add product:', error);
            throw error;
        }
    }
);

// Async thunk to delete a product
export const deleteProduct = createAsyncThunk(
    'products/delete',
    async (id) => {
        try {
            await axios.delete(`${API_URL}/delete-product/${id}`);
            return id;  
        } catch (error) {
            console.error('Failed to delete product:', error);
            throw error;
        }
    }
);


export const updateProduct = createAsyncThunk(
    'products/update',
    async (data) => {
        try {
            const response = await axios.put(`${API_URL}/update-product/${data._id}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;  
        } catch (error) {
            console.error('Failed to update product:', error);
            throw error;
        }
    }
);

// Initial state for the product slice
const initialState = {
    isLoading: false,
    products: [],
    error: null,
};

// Create the product slice
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.data;  
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products = state.products.concat(action.payload);
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter((product) => product._id !== action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.products = state.products.map((product) => 
                    product._id === action.payload._id ? action.payload : product
                );
            });
    },
});

export default productSlice.reducer;
