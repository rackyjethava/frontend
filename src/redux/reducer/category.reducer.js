import { ADD_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY, GET_CATEGORY } from "../ActionType";

const initialstate={
    isloading: false,
    category: [],
    error: null
}

export const categoryReducer=(state=initialstate,action)=>{
    switch (action.type) {
        
               
        case GET_CATEGORY:
            return{
                ...state,
                category:action.payload,
                isloading:false
            }
         

        case ADD_CATEGORY:
            return {
                ...state,
                isloading:false,
                category: state.category.concat(action.payload)
            }

        case DELETE_CATEGORY:
            return {
                ...state,
                isloading:false,
                category: state.category.filter(v => v._id !== action.payload)
            }

        case EDIT_CATEGORY:
            return {
                ...state,
                isloading:false,
                category: state.category.map((v)=>{
                    if(v._id===action.payload._id){
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