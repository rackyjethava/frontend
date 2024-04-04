import { BATCH_URL } from "../../utilitis/Utiliti";
import { GET_PRODUCT } from "../ActionType"
import axios from 'axios';

 export const getproduct=(data)=>(dispatch)=>{
  
   try {
      axios.get(BATCH_URL+'Fruits')
      .then((responce)=>{
       console.log(responce.data);
      })
      .catch((error)=>{
         console.log(error);
      })
      
   } catch (error) {
      
   }
   dispatch({type:GET_PRODUCT,payload:data})
 
 }