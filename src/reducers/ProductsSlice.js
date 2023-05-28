import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


export const fetchProducts = createAsyncThunk('products/productSlice',async()=>{
    const {data} = await axios.get('https://ecomnode.onrender.com/api/v1/product/')
    return data
})



const initialState = {
    loading:false,
  products: [],
  error:""
} 

export const ProductSlice=createSlice({
    name:"products",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.pending,(state)=>{
            state.loading=true
            
        })
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            state.loading=false
            state.products=action.payload
        })
        builder.addCase(fetchProducts.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
    }
})


export const {} = ProductSlice.actions
export default ProductSlice.reducer