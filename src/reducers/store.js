import { configureStore } from "@reduxjs/toolkit";
import  categorySlice  from "./categorySlice";
import  ProductSlice  from "./ProductsSlice";
import  cartSlice  from "./cart";




export const store=configureStore({
    reducer:{
        category:categorySlice,
        products:ProductSlice,
        cart:cartSlice,
    }
})