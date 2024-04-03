import { applyMiddleware, createStore } from "redux"
import { thunk } from "redux-thunk"
import { rootreducer } from "./reducer";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


export const configstore = () => {
    const persistConfig = {
        key: 'root',
        storage,
        whitelist: ['facilities']
    }

    const persistedReducer = persistReducer(persistConfig, rootreducer)

    const store = createStore(persistedReducer, applyMiddleware(thunk))

    let persistor = persistStore(store)
    return { store, persistor }
}