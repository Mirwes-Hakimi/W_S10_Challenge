import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react-dom/test-utils";


const initialState = {
    orders: [],
    loading: false,
    error: null,
}

//async thunk to fetch pizza order history
export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async () => {
        const response = await 
        axios.get('http://localhost:9009/api/pizza/history');
        console.log('API response', response.data)
        return response.data;
    }
)

export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (orderData, {dispatch, rejectWithValue}) => {
        try{
            const response = await axios.post('http://localhost:9009/api/pizza/order',orderData)
                dispatch(fetchOrders());/// after creating, it fetch the updated orders
                return response.data;
            
        }catch(err){
            return rejectWithValue(err.response.data.message)
        }// by using rejectWithValue pass the specific error messages string
    }
)


const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        /// cases for fetching orders
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
            /// ensure it always store string for the error message
            state.error = action.error.message || 'Faild to fetch orders.';
        })
        .addCase(createOrder.pending, state => {
            state.loading = true; /// makes message appear
            state.error = null;
        })

        .addCase(createOrder.fulfilled,( state, action) => {
           // do nothing here
           // fetchOrders() will run, and that will set loading=true
           // only fetchOrders.fulfilled will finally set loading=false
        })

        .addCase(createOrder.rejected, (state, action) => {
            state.loading = false;// also make the message disappear
            state.error = action.payload;
        })
    },
});

export default ordersSlice.reducer;

