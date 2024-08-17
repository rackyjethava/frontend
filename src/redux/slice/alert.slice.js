import { createSlice } from "@reduxjs/toolkit"

const initialstate = {
    color: "",
    message: ""

}


const AlertSlice = createSlice({
    name: "Alert",
    initialState: initialstate,
    reducers: {
        setAlert: (state, action) => {
            console.log(action.payload);
            state.color = action.payload.color
            state.message = action.payload.message
        },

        resatAlert: (state, action) => {
            console.log(action.payload);
            
            state.color = ""
            state.message = ""
        }
    }
})


export const {setAlert,resatAlert}=AlertSlice.actions

export default AlertSlice.reducer