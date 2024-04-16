// import { ADD_TO_CART, GET_CART_DATA } from "../ActionType";

// const initilize={
//     isloadibg:false,
//     cart:[],
//     error:null
// }


// export const cartReducer=(state=initilize,action)=>{
//     // console.log(action);
//     switch (action.type) {
//         case ADD_TO_CART:
//             return{
//                 ...state,
//                 cart:state.cart.concat(action.payload)
//             }

//             case GET_CART_DATA:
//                 return{
//                     isloadibg:false,
//                     cart:action.payload,

//                 }
            
    
//         default:
//             return state;
//     }
// }