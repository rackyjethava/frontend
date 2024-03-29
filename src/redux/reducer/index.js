import { combineReducers } from "redux";
import { facilitiReducer } from "./facilities.reducer";

 export const  rootreducer=combineReducers({
    facilities:facilitiReducer
 })