import { applyMiddleware, createStore } from "redux"
import { thunk } from "redux-thunk"
import { rootreducer } from "./reducer";


export const configstore=()=>{
    const store=createStore(rootreducer,applyMiddleware(thunk))

    return store;
}