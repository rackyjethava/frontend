import { createSlice } from "@reduxjs/toolkit"

const initialState={
    isloading:false,
    cart:[],
    error:null,
}


 const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            console.log(action);

            const index=state.cart.findIndex((v)=>v.pid===action.payload)

            if(index !== -1){
                

                state.cart[index].qty++;
            }else{
                state.cart.push({pid:action.payload,qty:1})
            }

            
        }
    }
})

export const {addToCart}=cartSlice.actions;
export default cartSlice.reducer;
