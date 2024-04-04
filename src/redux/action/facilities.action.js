import { ADD_FACILITIES, DELETE, EDIT,  GET_FACILITIES,  SET_LOADING } from "../ActionType"

const handleloading=()=>(dispatch)=>{
   dispatch({type:SET_LOADING})
}

 export const get_facilities=()=>(dispatch)=>{
   dispatch({type:GET_FACILITIES})
 }
export const add_facilities = (data) => (dispatch) => {
   dispatch(handleloading())
   setTimeout(()=>[
      dispatch({ type: ADD_FACILITIES, payload: data })
   ],2000)
   
}

export const remove_facalty = (data) => (dispatch) => {
   dispatch({ type: DELETE, payload: data })
}

export const edite_facilities=(data)=>(dispatch)=>{
   dispatch({type:EDIT,payload:data})
}
