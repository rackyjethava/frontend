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

            
        },

        incrementCart:(state,action)=>{
            console.log(action);
            const index=state.cart.findIndex((v)=>v.pid===action.payload)
            if(index !== -1){
                state.cart[index].qty++;
            }
            
        },

        decrementCart:(state,action)=>{
            console.log(action);
            const index=state.cart.findIndex((v)=>v.pid===action.payload)
            if(index !== -1){
                state.cart[index].qty--;
            }
        }
       

         
    }
})

export const {addToCart,incrementCart,decrementCart}=cartSlice.actions;
export default cartSlice.reducer;
