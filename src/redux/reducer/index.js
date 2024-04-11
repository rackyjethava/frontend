import { combineReducers } from "redux";
import { facilitiReducer } from "./facilities.reducer";
import { productReducer } from "./Product.reducer";
import { reviewReducer } from "./Review.reducer";

 export const  rootreducer=combineReducers({
    facilities:facilitiReducer,
    products:productReducer,
   review:reviewReducer,
 })

