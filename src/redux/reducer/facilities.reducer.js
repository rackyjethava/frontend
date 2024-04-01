import { ADD_FACILITIES, DELETE, EDIT } from "../ActionType";

const facilitidata = {
    isloading: false,
    facilities: [],
    error: null
}

export const facilitiReducer = (state = facilitidata, action) => {
    console.log(action);
    switch (action.type) {
        case ADD_FACILITIES:
            return {
                ...state,
                facilities: state.facilities.concat(action.payload)
            }

        case DELETE:
            return {
                ...state,
                facilities: state.facilities.filter(v => v.id !== action.payload)
            }

        case EDIT:
            return {
                ...state,
                facilities: state.facilities.map((item) => item.id === action.payload.id ? action.payload : item)

            }


        default:
            return state;
    }
} 