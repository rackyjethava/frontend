import { createContext, useReducer } from "react"
import { contactReducer } from "./reducer/contact.reducer";
import { BATCH_URL } from "../utilitis/Utiliti";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";
import { CONTACT_GET } from "./ActionType";


const initialState={
    isloading:false,
    contact:[],
    error:null,
}


export const contactContext=createContext();


export const  ContactProvider = ({children})=>{

    const[state,dispatch]=useReducer(contactReducer,initialState)

    const addContact=async(data)=>{
        try {
          const responce=await axios.post(BATCH_URL+'contact',data);
          return responce.data

        } catch (error) {
            console.log(error.massage);
        }
    }


    const getContact= async () =>{
        try {
            const  responce= await axios.get(BATCH_URL+"contact");
            dispatch({type:CONTACT_GET,payload:responce.data});
        } catch (error) {
            
        }
    }


    return(
        <contactContext.Provider
        value={{
            ...state,
            addContact,
            getContact
        }}    
        >
            {children}
          
        </contactContext.Provider>

    )
    
}