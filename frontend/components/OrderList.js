import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../state/ordersSlice';
import { setFilter } from '../state/filterSlice';


export default function OrderList() {
  
  const dispatch = useDispatch();/// get the dispatch func trigger redux actions
  const allOrders = useSelector(state => state.orders.orders || []);// select orders slice of state from redux
  const activeFilter = useSelector(state => state.filter);
  // get the current active filter
 

  useEffect(() => {
    console.log('orderList Mounted')
    dispatch(fetchOrders()); // get orders on mount

  }, [dispatch])
  /// filter the orders based on the activeFilter Before rendering
  const filteredOrders = activeFilter === 'All' ? allOrders : allOrders.filter(order => order.size === activeFilter);

  const handleFilterChange = (size) => {
    dispatch(setFilter(size)); /// Dispatch action to change the filter
  };

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          /// MAP over the new filterOrders array
          filteredOrders.map(order => {
            /// safety check if orders.toppings is missing use an empty arr
            const toppings = order.toppings || [];
            
          /// generate text based on the count of toppings
            const toppingsText = 
            toppings.length === 0
             ? 'no toppings' 
             : toppings.length === 1
            ? '1 topping'
             : `${toppings.length} toppings`;
             
             const customerName = order.fullName || order.customer || '[No Name]';
             
            return (
              <li key={order.id}>
                <div>
                  {customerName} ordered a size {order.size} with {toppingsText}
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            // set active class dynamically based on the activeFilter from redux
            const className = `button-filter${size === activeFilter ? ' active' : ''}`
            return <button
              onClick={() => handleFilterChange(size)}
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}>{size}</button>
          })
        }
      </div>
    </div>
  )
}