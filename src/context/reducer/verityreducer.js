import { DATA_GET } from "../ActionType";



export const VerityReducer=(state,action)=>{
    console.log(action);

    switch (action.type) {
        case DATA_GET:
           return{
            verity:action.payload
           }
           
    
        default:
            return state;
    }
}