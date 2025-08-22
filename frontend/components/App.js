import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PizzaForm from './PizzaForm'
import OrderList from './OrderList';


export default function App() {
  const count = useSelector(state => state.example.count)
  const dispatch = useDispatch();
  return (
    
    <div id="app">
      <PizzaForm />
      <OrderList />
      <p>count from exmpleReducer: {count}</p>
    </div>
  )
}
