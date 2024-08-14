import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BAKEND_URL } from "../../utilitis/Utiliti"
import axios from "axios";
import axiosInstance from "../../utilitis/axiosInstance";



export const register = createAsyncThunk(
    'auth/register',

    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("users/register", data)

            console.log(response.data);

            if (response.status === 201) {
                return response.data;
            }

        } catch (error) {
            console.log(error);

            return rejectWithValue(error.response.data.message);
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("users/login",data);

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data.message);
        }
    }
);


export const logout = createAsyncThunk(
    'auth/logout',
    async (_id, { rejectWithValue }) => {
        console.log(_id);
        
        try {
            const response = await axiosInstance.post("users/logout", {_id});

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const chaekAuth = createAsyncThunk(
    'auth/chaekAuth',
    async (_, { rejectWithValue }) => {
        
        
        try {
            const response = await axiosInstance.get("users/chaekAuth");

            console.log(response);
            

            if (response.status === 200) {
                return response.data;
            }


        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data.message);
        }
    }
);

const initialstate = {
    isAuth: false,
    isLogout: true,
    user: null,
    loading: false,
    error: null
}

const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState: initialstate,
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state, action) => {
            state.isAuth = false;
            state.isLogout = true;
            state.user = action.payload;
            state.loading = false;
            state.error = null
        })
        builder.addCase(register.rejected, (state, action) => {
            state.isAuth = false;
            state.isLogout = true;
            state.user = null;
            state.loading = false;
            state.error = action.payload
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.isAuth = true;
            state.isLogout = false;
            state.user = action.payload.data;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isAuth = false;
            state.isLogout = true;
            state.user = null;
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isAuth = false;
            state.isLogout = true;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(chaekAuth.fulfilled, (state, action) => {
            state.isAuth = true;
            state.isLogout = false;
            state.user = action.payload.data;
            state.loading = false;
            state.error = null;
            console.log(action.payload.data);
            
        });
        builder.addCase(chaekAuth.rejected, (state, action) => {
            state.isAuth = false;
            state.isLogout = true;
            state.loading = false;
            state.error = action.payload;
        });
    }
})




export default AuthSlice.reducer;