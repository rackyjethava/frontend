import { combineReducers } from "redux";
import { facilitiReducer } from "./facilities.reducer";
import { productReducer } from "./Product.reducer";
import { reviewReducer } from "./Review.reducer";
import counterSlice from "./counter.slice";
import cartSlice from "./cart.slice";
import couponSlice from "../slice/coupon.slice";
import { categoryReducer } from "./category.reducer";
import subcategoriesSlice from "../slice/subcategories.slice";
import salsepeopleSlice from "../slice/salsepeople.slice";
import AuthSlice from "../slice/AuthSlice";



export const rootreducer = combineReducers({
  facilities: facilitiReducer,
  products: productReducer,
  review: reviewReducer,
  counter: counterSlice,
  cart_slice: cartSlice,
  coupon: couponSlice,
  category: categoryReducer,
  subcategory: subcategoriesSlice,
  salespeople: salsepeopleSlice,
  auth: AuthSlice
})

