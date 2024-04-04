import { combineReducers } from "redux";
import { facilitiReducer } from "./facilities.reducer";
import { productReducer } from "./Product.reducer";

 export const  rootreducer=combineReducers({
    facilities:facilitiReducer,
    products:productReducer,
  
 })

