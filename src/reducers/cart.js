import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

export const cartSlice = createSlice({
    initialState: {
        cartitem:localStorage.getItem("cartitem")
            ? JSON.parse(localStorage.getItem("cartitem"))
            : [],
        cartQuantity: 0,
        cartAamout: 0,
    },
    name: "cartSlice",
    reducers: {
        addtoCart: (state, action) => {
            const findproduct = state.cartitem.find(
                (product) => product._id === action.payload._id
            );
            if (findproduct) {
                findproduct.cartQuantity += 1;
                toast.success(`Increased ${action.payload.name} qauntity` , {
                    position: "top-right",
                });
            } else {
                const productClone = { ...action.payload, cartQuantity: 1 };
                state.cartitem.push(productClone);
                toast.success(`${action.payload.name} added Successfully'`, {
                    position: "top-right",
                });
            }
            localStorage.setItem("cartitem", JSON.stringify(state.cartitem));
        },
        removeFromCart(state, action) {
            const rmCart = state.cartitem.filter(
                (product) => product._id !== action.payload._id
            );
            state.cartitem = rmCart;
            localStorage.setItem("cartitem", JSON.stringify(state.cartitem));
            toast.error(`Removed ${action.payload.name} Successfully`, {
                position: "top-right",
            });
        },
descressQuantity:(state,action)=>{
const itemIndex=state.cartitem.findIndex(cart=>cart._id === action.payload._id)
if(state.cartitem[itemIndex].cartQuantity > 1){
state.cartitem[itemIndex].cartQuantity -=1
localStorage.setItem("cartitem", JSON.stringify(state.cartitem));
toast.error(`Decreased ${action.payload.name} cart quantity`, {
    position: "bottom-left",
});
   } else if(state.cartitem[itemIndex].cartQuantity === 1){
    const rmCart = state.cartitem.filter(
        (product) => product._id !== action.payload._id
        
    );
    state.cartitem = rmCart;
    
    toast.error(`Removed ${action.payload.name} Successfully`, {
        position: "bottom-left",
    });
   }   
   localStorage.setItem("cartitem", JSON.stringify(state.cartitem));
  },
        ClearCart: (state, action) => {
            state.cartitem = [];
            toast.error(`All Products Deleted`, {
                position: "top-left",
            });
            localStorage.setItem("cartitem", JSON.stringify(state.cartitem));
        },
       
 
    },
});
export const { filterProducts,addtoCart, removeFromCart, ClearCart ,descressQuantity} = cartSlice.actions;
export default cartSlice.reducer;