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
            console.log(action.payload.id);
            console.log(action.payload.qty);

            const index=state.cart.findIndex((v)=>v.pid===action.payload.id)
      
            if(index !== -1){
                

                state.cart[index].qty = state.cart[index].qty += action.payload.qty;
            }else{
                state.cart.push({pid:action.payload.id,qty:action.payload.qty})
            }

            
        },

        incrementCart:(state,action)=>{
            console.log(action.payload);
            console.log(state.cart);
            const index= state.cart.findIndex((v)=>v.pid === action.payload)
            console.log(index);
                state.cart[index].qty++;
            
        },

        decrementCart:(state,action)=>{
            console.log(action);
            const index=state.cart.findIndex((v)=>v.pid===action.payload)
            console.log(index);
            if (state.cart[index].qty > 1 ) {
                state.cart[index].qty--;
            }

                        
        },

        removeData:(state,action)=>{
            console.log(action);
            state.cart= state.cart.filter((v)=>v.pid!==action.payload)

        }
    }
})

export const {addToCart,incrementCart,decrementCart,removeData}=cartSlice.actions;
export default cartSlice.reducer;
