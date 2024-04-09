import { type } from "@testing-library/user-event/dist/type";
import { BATCH_URL } from "../../utilitis/Utiliti";
import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, ERROR_PRODUCT, GET_PRODUCT, LOADING_PRODUCT } from "../ActionType"
import axios from 'axios';


const loadingProduct=()=>async(dispatch)=>{
   dispatch({type:LOADING_PRODUCT})
}

const errorProduct=(error)=>async(dispatch)=>{
   dispatch({type:ERROR_PRODUCT,payload:error});
}

 export const getproduct=()=>async(dispatch)=>{
  
   try {
      dispatch(loadingProduct());
     await axios.get(BATCH_URL+'Fruits')
      .then((responce)=>{
         dispatch({type:GET_PRODUCT,payload:responce.data})
 
      })
      .catch((error)=>{
        dispatch(errorProduct(error.message))
      })
      
   } catch (error) {
      
   }
   
 }

 export const addproduct=(data)=>async(dispatch)=>{
   try {
      dispatch(loadingProduct());
      await axios.post(BATCH_URL+'Fruits',data)
      .then((responce)=>dispatch({type:ADD_PRODUCT,payload:responce.data}) )
      .catch((error)=>console.log(error))
   } catch (error) {
      dispatch(errorProduct(error.message))
   }
 }

 export const deletproduct=(id)=>async(dispatch)=>{
   try {
      dispatch(loadingProduct());
      await axios.delete(BATCH_URL+'Fruits/'+id)
      .then((responce)=>dispatch({type:DELETE_PRODUCT,payload:id}) )
      .catch((error)=>console.log(error))
   } catch (error) {
      dispatch(errorProduct(error.message))
   }
 }

 export const editeProduct=(data)=>async(dispatch)=>{
   try {
      dispatch(loadingProduct());
      await axios.put(BATCH_URL+'Fruits/'+data.id,data)
      .then((responce)=>dispatch({type:EDIT_PRODUCT,payload:data}))
      .catch((error)=>console.log(error))
   } catch (error) {
      dispatch(errorProduct(error.message))
   }
 }