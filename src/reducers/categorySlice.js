import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


export const fetchCategory = createAsyncThunk('category/categorySlice', async () => {
    const { data } = await axios.get('https://ecomnode.onrender.com/api/v1/category')
    return data
})



const initialState = {
    loading: false,
    category: [],
    error: ""
}

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategory.pending, (state) => {
            state.loading = true

        })
        builder.addCase(fetchCategory.fulfilled, (state, action) => {
            state.loading = false
            state.category = action.payload
        })
        builder.addCase(fetchCategory.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})


export default categorySlice.reducer