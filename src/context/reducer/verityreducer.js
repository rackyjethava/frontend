import { DATA_ADD, DATA_GET, DATA_REMOVE, DATA_UPDATE } from "../ActionType";


export const verityReducer = (state, action) => {
    console.log(action);

    switch (action.type) {
        case DATA_GET:
            return {
                ...state,
                verity: action.payload
            }

        case DATA_ADD:
            return {
                ...state,
                verity: state.verity.concat(action.payload)
            }

        case DATA_UPDATE:
            return {
                ...state,
                verity: state.verity.map((v) => v.id === action.payload.id ? action.payload : v)
            }

        case DATA_REMOVE:
            return {
                isLoading: false,
                verity: state.verity.filter((v) => v.id !== action.payload),
                error: null
            }

        default:
            return state
    }

}