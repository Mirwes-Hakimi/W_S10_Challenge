import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../state/ordersSlice';


export default function OrderList() {
  
  const dispatch = useDispatch();/// get the dispatch func trigger redux actions
  const orders = useSelector(state => state.orders.orders || []);// select orders slice of state from redux
  
  console.log('state orders', orders)

  useEffect(() => {
    console.log('orderList Mounted')
    dispatch(fetchOrders()); // get orders on mount

  }, [dispatch])

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          orders.map(order => {
        
            const toppingsText = order.toppings.length === 0 ? 'no toppings' : order.toppings.join(', ');
            return (
              <li key={order.id}>
                <div>
                  {order.fullName || order.customer || '[No Name]'} ordered a size {order.size} with {toppingsText}
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
            const className = `button-filter${size === 'All' ? ' active' : ''}`
            return <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}>{size}</button>
          })
        }
      </div>
    </div>
  )
}
