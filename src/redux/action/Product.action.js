import { BATCH_URL } from "../../utilitis/Utiliti";
import { ADD_PRODUCT, DELETE_PRODUCT, GET_PRODUCT } from "../ActionType"
import axios from 'axios';

 export const getproduct=()=>async(dispatch)=>{
  
   try {
     await axios.get(BATCH_URL+'Fruits')
      .then((responce)=>{
         dispatch({type:GET_PRODUCT,payload:responce.data})
 
      })
      .catch((error)=>{
         console.log(error);
      })
      
   } catch (error) {
      
   }
   
 }

 export const addproduct=(data)=>async(dispatch)=>{
   try {
      await axios.post(BATCH_URL+'Fruits',data)
      .then((responce)=>dispatch({type:ADD_PRODUCT,payload:responce.data}) )
      .catch((error)=>console.log(error))
   } catch (error) {
      
   }
 }

 export const deletproduct=(id)=>async(dispatch)=>{
   try {
      await axios.delete(BATCH_URL+'Fruits/'+id)
      .then((responce)=>dispatch({type:DELETE_PRODUCT,payload:id}) )
      .catch((error)=>console.log(error))
   } catch (error) {
      
   }
 }