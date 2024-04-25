import { TOOGLE_THEM } from "../ActionType";

export const themeReducer=(state,action)=>{
    
    console.log(action);
    switch (action.type) {
        case TOOGLE_THEM:
            return{
                theme:action.payload
            }
            
            
    
        default:
            return state;
    }

}