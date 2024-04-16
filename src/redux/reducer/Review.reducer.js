import { ADD_REVIEW, GET_REVIEW } from "../ActionType";

const intilize={
    isloading:false,
    error:null,
    review:[]
}

export const reviewReducer=(state=intilize,action)=>{
    // console.log(action);
    switch (action.type) {
        case ADD_REVIEW:
            return{
                isloading:false,
                review:state.review.concat(action.payload),
                
                error:null
            }

        case GET_REVIEW:
            return{
                isloading: false,
                review:action.payload,
                error: null
            }
            
        default:
            return state;
    }
}