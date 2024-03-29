import { ADD_FACILITIES } from "../ActionType"

 
 export const add_facilities=(data)=>(dispatch)=>{
    dispatch({type:ADD_FACILITIES, payload :data})
 }