import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filter',
    initialState: 'All', ///default filter
    reducers: {
        setFilter: (state, action) => action.payload,
    },

});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;