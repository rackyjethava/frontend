import { createContext, useReducer } from "react"
import { themeReducer } from "./reducer/theamreducer"
import { type } from "@testing-library/user-event/dist/type"
import { TOOGLE_THEM } from "./ActionType"


const initialState={
    theme:'light'
}


export const ThemeContext=createContext()

export const ThemeProvider=({children})=>{
    const [state,dispatch]=useReducer(themeReducer,initialState)

    const toggleTheme=(val)=>{
        console.log(val);
        const newtheme=val==='light'?'dark':'light';
        console.log(newtheme);
        dispatch({type:TOOGLE_THEM,payload:newtheme})
    }


    return(
        <ThemeContext.Provider
        
            value={{
                ...state,
                toggleTheme
            }}
        >

            {children}
        </ThemeContext.Provider>
    )
}