import { ADD_FACILITIES, DELETE, EDIT, GET_FACILITIES, SET_LOADING } from "../ActionType";

const facilitidata = {
    isloading: false,
    facilities: [],
    error: null
}

export const facilitiReducer = (state = facilitidata, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
             ...state,
              isloading:true,
            };
            
        case GET_FACILITIES:
            return{
                ...state,
            }
         

        case ADD_FACILITIES:
            return {
                ...state,
                isloading:false,
                facilities: state.facilities.concat(action.payload)
            }

        case DELETE:
            return {
                ...state,
                isloading:false,
                facilities: state.facilities.filter(v => v.id !== action.payload)
            }

        case EDIT:
            return {
                ...state,
                isloading:false,
                facilities: state.facilities.map((v)=>{
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