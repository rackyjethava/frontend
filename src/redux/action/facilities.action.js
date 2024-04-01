import { ADD_FACILITIES, DELETE, EDIT } from "../ActionType"


export const add_facilities = (data) => (dispatch) => {
   dispatch({ type: ADD_FACILITIES, payload: data })
}

export const remove_facalty = (data) => (dispatch) => {
   dispatch({ type: DELETE, payload: data })
}

export const edite_facilities=(data)=>(dispatch)=>{
   dispatch({type:EDIT,payload:data})
}