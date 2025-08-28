/// pulls in redux Toolkits method for creating a redux store
import { configureStore } from '@reduxjs/toolkit';
/// Imports the reducer that handles the pizza order history
import ordersReducer from './ordersSlice';
//Imports the reducer that tracks the filter state (s/m/l/all)
import filterReducer from './filterSlice';
const exampleReducer = (state = {count: 0 }) => {
  return state
}
/// function builds and returns the redux store
export const resetStore = () => configureStore({
  reducer: {
    example: exampleReducer,
   orders: ordersReducer, //the pizza order history from the backend
   filter: filterReducer, // the size filter state (s/m/l/all)

  },
  middleware: getDefault => getDefault().concat(
    // if using RTK Query for your networking: add your middleware here
    // if using Redux Thunk for your networking: you can ignore this
  ),
})

export const store = resetStore()



