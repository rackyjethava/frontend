import { ADD_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY, GET_CATEGORY } from "../ActionType";

const categorydata={
    isloading: false,
    category: [],
    error: null
}

export const categoryReducer=(state=categorydata,action)=>{
    switch (action.type) {
               
        case GET_CATEGORY:
            return{
                ...state,
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
                category: state.category.filter(v => v.id !== action.payload)
            }

        case EDIT_CATEGORY:
            return {
                ...state,
                isloading:false,
                category: state.category.map((v)=>{
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