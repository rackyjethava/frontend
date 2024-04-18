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
            const index=state.cart.findIndex((v)=>v.pid === action.payload)
         
                state.cart[index].qty++;
           
            
        },

        decrementCart:(state,action)=>{
            console.log(action);
            const index=state.cart.findIndex((v)=>v.pid===action.payload)
            
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
