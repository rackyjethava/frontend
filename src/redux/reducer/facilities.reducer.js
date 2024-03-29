import { ADD_FACILITIES } from "../ActionType";

const facilitidata={
    isloading:false,
    facilities:[],
    error:null
}

export const facilitiReducer=(state=facilitidata,action)=>{
    console.log(action);
    switch (action.key) {
        case ADD_FACILITIES:
             return{
                ...state,
                facilities:state.facilities.concat(action.payload )
             }
      
    
        default:
          return state;
    }
}