import { ADD_PRODUCT, DELETE_PRODUCT, GET_PRODUCT } from "../ActionType";

const facilitidata = {
    isloading: false,
    products: [],
    error: null
}


export const productReducer=(state=facilitidata,action)=>{
    console.log(action);
    switch (action.type) {
        case GET_PRODUCT:
                return{
                    isloading: false,
                    products:action.payload,
                    error: null
                }
           case ADD_PRODUCT:
            return{
                isloading: false,
                products:state.products.concat(action.payload),
                error: null
            }

            case DELETE_PRODUCT:
            return{
                isloading: false,
                products:state.products.filter((v)=>v.id !== action.payload),
                error: null
            }
    
        default:
            return state;
    }
}