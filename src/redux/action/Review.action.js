
import axios from 'axios';
import { BATCH_URL } from '../../utilitis/Utiliti';
import { ADD_REVIEW, GET_REVIEW } from '../ActionType';

export const addreviews=(data)=>async(dispatch)=>{
    console.log(data);
    try {
        await axios.post(BATCH_URL+'Reviews',data)
        .then((responce)=>dispatch({type:ADD_REVIEW,payload:responce.data}) )
      .catch((error)=>console.log(error))
    } catch (error) {
        console.log(error);
    }
}
export const getreview=()=>async(dispatch)=>{
    try {
      await axios.get(BATCH_URL+'Reviews')
       .then((responce)=>{
          dispatch({type:GET_REVIEW,payload:responce.data})
  
       })
       .catch((error)=>{

       })
       
    } catch (error) {
       
    }
    
  }