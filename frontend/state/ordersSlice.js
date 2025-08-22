import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    orders: [],
    loading: false,
    error: null,
}

///async thunk to fetch pizza order history
export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async () => {
        const response = await 
        axios
        // .get('http://localhost:9009/api/pizza/history');
        .get('http://localhost:9009/api/pizza/history');
        console.log('API response', response.data)
        return response.data;
    }
)


const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(fetchOrders.pending, state => {
            state.loading = true;
            state.error = null;
        })

        .addCase(fetchOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        })

        .addCase(fetchOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default ordersSlice.reducer;