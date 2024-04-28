import axios from "axios"
import { BATCH_URL } from "../utilitis/Utiliti";
import { DATA_ADD, DATA_GET, DATA_REMOVE, DATA_UPDATE } from "./ActionType";
import { verityReducer } from "./reducer/verityreducer";
import { createContext } from "react";
import { useReducer } from "react";

const initialState = {
    isLoading: false,
    verity: [],
    error: null
}

export const VerityContext = createContext()

export const VerityProvider = ({ children }) => {
    const [state, dispatch] = useReducer(verityReducer, initialState)

    
    const getVerity = async () => {    
            try {
                const response = await axios.get(BATCH_URL + 'verity')
                console.log(response);
                dispatch ({type:DATA_GET ,payload:response.data});
            } catch (error) {
                return error.message
            }
    
    }
    const addVerity = async (data) => {
        console.log(data);
        try {
            const response = await axios.post(BATCH_URL + 'verity', data)
            dispatch({ type: DATA_ADD, payload: response.data });
        } catch (error) {
            console.log(error)
        }
    }

    const editeVerty=async(data)=>{
        try {
            const response = await axios.put(BATCH_URL + 'verity/' + data.id, data)            
            dispatch({type:DATA_UPDATE,payload:response.data}) 
        } catch (error) {
           console.log(error);
        }
    }

    const deketeVerity=async(id)=>{
        try {
            await axios.delete(BATCH_URL + 'verity/' +id)            
            dispatch({type:DATA_REMOVE,payload:id}) 
        } catch (error) {
           console.log(error);
        }
    }


    return (
        <VerityContext.Provider
            value={{
                ...state,
                getVerity,
                addVerity,
                editeVerty,
                deketeVerity
            }}
        >
            {children}
        </VerityContext.Provider>
    )

}