
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"





export const getsubcategory = createAsyncThunk(
    'subcategory/get',
    async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/sub_categories/list-subcategories");
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const addsubcategory = createAsyncThunk(
    'subcategory/add',
    async (data) => {
        console.log(data);
        try {
            const response = await axios.post("http://localhost:8000/api/v1/sub_categories/add-subcategory", data);
            console.log(response);
            const dataAdd = response.data.data;
            console.log(dataAdd);
            return dataAdd     
        } catch (error) {
            console.log(error);
        }
    }
);

export const deleteSubcategory=createAsyncThunk(
    'subcategory/delete',
    async (id) => {
        try {
             await axios.delete("http://localhost:8000/api/v1/sub_categories/delete-subcategory/"+id);
             return id;
           
        } catch (error) {
            console.log(error);
        }
    }
);

export const updateSubCategory=createAsyncThunk(
    'subcategory/edite',
    async (data) => {
        console.log(data);
        try {
            const response= await axios.put("http://localhost:8000/api/v1/sub_categories/update-subcategory/"+data._id,data);
            console.log(response.data.data);
            console.log(response.data);
            return response.data;
           
        } catch (error) {
            console.log(error);
        }
    }
)

const initialState={
    isloading:false,
    subcategory:[],
    error:null,
}

console.log(initialState);

const subcategorySlice=createSlice({
    name :"subcategories",
    "initialState":initialState ,
    reducers:{ },
    extraReducers:(builder)=>{
        builder
        .addCase(addsubcategory.fulfilled,(state,action)=>{
            console.log(action);
            state.subcategory=state.subcategory.concat(action.payload)
        })
        .addCase(getsubcategory.fulfilled,(state,action)=>{
            state.subcategory=action.payload.data
        })
        .addCase(deleteSubcategory.fulfilled,(state,action)=>{
            state.subcategory=state.subcategory.filter((v)=>v._id !==  action.payload)
        })
        .addCase(updateSubCategory.fulfilled,(state,action)=>{
            console.log(action);
            state.subcategory = state.subcategory.map((v) => {
                console.log(v._id);
                console.log(action.payload._id);
                if (v._id === action.payload._id) {
                    return action.payload;
                } else {
                    return v;
                }
            });
        })
    }
    
})

export default subcategorySlice.reducer;



