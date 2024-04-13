import axios from "axios"
import { ADD_TO_CART, GET_CART_DATA } from "../ActionType"
import { BATCH_URL } from "../../utilitis/Utiliti"

export const addtocart=(data)=>async(dispatch)=>{
    try {
        await axios.post(BATCH_URL+'cart',data)
        .then((responce)=>dispatch({type:ADD_TO_CART,payload:responce.data}) )
      .catch((error)=>console.log(error))
    } catch (error) {
        
    }
}

export const getcart=()=>async(dispatch)=>{
    try {
      await axios.get(BATCH_URL+'cart')
       .then((responce)=>{
          dispatch({type:GET_CART_DATA,payload:responce.data})
  
       })
       .catch((error)=>{

       })
       
    } catch (error) {
       
    }
    
  }