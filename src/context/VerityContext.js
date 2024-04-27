import { createContext, useEffect, useReducer, useState } from "react"
import { VerityReducer } from "./reducer/verityreducer"
import { type } from "@testing-library/user-event/dist/type"
import { DATA_ADD, VERITY_GET } from "./ActionType"
import { getcoupontdata } from "../redux/slice/coupon.slice"
import axios from "axios"

const initialState = {
    verity: [],
}



export const VerityContext = createContext()


export const VerityProvider = ({ children }) => {
    const [coupons, setCoupons] = useState([]);
    const [state,dispatch]=useReducer(VerityReducer,initialState)

   
    const addCoupon = (data) => {
        console.log(data);
        dispatch({type:DATA_ADD,payload:data})
    };

    const updateCoupon = (id) => {
        console.log(id);
    };

    const deleteCoupon = (id) => {
        console.log(id);
    };



    return (
        <VerityContext.Provider value={{
            ...state,
            dispatch,
            addCoupon,
            updateCoupon,
            deleteCoupon
        }}>
            {children}
        </VerityContext.Provider>
    )

}

