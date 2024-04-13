import { combineReducers } from "redux";
import { facilitiReducer } from "./facilities.reducer";
import { productReducer } from "./Product.reducer";
import { reviewReducer } from "./Review.reducer";
import { cartReducer } from "./Cart.reducer";

 export const  rootreducer=combineReducers({
    facilities:facilitiReducer,
    products:productReducer,
   review:reviewReducer,
   cart:cartReducer,
 })

