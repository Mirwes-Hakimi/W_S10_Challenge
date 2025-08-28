import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";


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
        axios
        // .get('http://localhost:9009/api/pizza/history');
        .get('http://localhost:9009/api/pizza/history');
        console.log('API response', response.data)
        return response.data;
    }
)

export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (orderData, {dispatch, rejectWithValue}) => {
        try{
            const response = await axios.post('http://localhost:9009/api/pizza/order',orderData)
                dispatch(fetchOrders());
                return response.data;
            
        }catch(err){
            return rejectWithValue(err.response.data.message)
        }
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
        })
        .addCase(createOrder.pending, state => {
            state.loading = true; /// makes message appear
            state.error = null;
        })

        .addCase(createOrder.fulfilled, state => {
            state.loading = false; /// make the message disappear
        })

        .addCase(createOrder.rejected, (state, action) => {
            state.loading = false;// also make the message disappear
            state.error = action.payload;
        })
    },
});

export default ordersSlice.reducer;





