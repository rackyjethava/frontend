import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, ERROR_PRODUCT, GET_PRODUCT, LOADING_PRODUCT } from "../ActionType";

const facilitidata = {
    isloading: false,
    products: [],
    error: null
}


export const productReducer=(state=facilitidata,action)=>{
    console.log(action);
    switch (action.type) {
        case LOADING_PRODUCT:
            return{
                ...state,
                isloading: true

            }

            case ERROR_PRODUCT:
                return{
                    ...state,
                    isloading:false,
                    error:action.payload
                }

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

            case EDIT_PRODUCT:
                return{
                    isloading: false,
                    products:state.products.map((v)=>{
                        if(v.id===action.payload.id){
                            return action.payload
                        }else{
                            return v
                        }
                    })
                }
    
        default:
            return state;
    }
}