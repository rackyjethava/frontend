import { GET_PRODUCT } from "../ActionType";

const facilitidata = {
    isloading: false,
    fruits: [],
    error: null
}


export const productReducer=(state=facilitidata,action)=>{
    console.log(action);
    switch (action.value) {
        case GET_PRODUCT:
                return{
                    ...state,
                    fruits:state.fruits.concat(action.payload),
                }
           
    
        default:
            return state;
    }
}