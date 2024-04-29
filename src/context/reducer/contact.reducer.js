import { CONTACT_ADD, CONTACT_GET } from "../ActionType";


export const contactReducer=(state,action)=>{
    console.log(action);

    switch (action.type) {
        case CONTACT_ADD:
           return{
            ...state,
            contact:state.contact.concate(action.payload)
           }

           case CONTACT_GET:
            return{
                ...state,
                contact: action.payload
            }
    
        default:
            return state
    }
}