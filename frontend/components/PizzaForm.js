// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createOrder } from '../state/ordersSlice';


// const initialFormState = {
//   fullName: '',
//   size: '',
//   '1': false,
//   '2': false,
//   '3': false,
//   '4': false,
//   '5': false,
// }

// export default function PizzaForm() {

//   const [formState, setFormState] = useState(initialFormState);
//   const dispatch = useDispatch();

//   /// Sselecting the loading state from redux
//   const isLoading = useSelector(state => state.orders.loading);
//   const errorMessage = useSelector(state => state.orders.error);
  
//   const handleChange = (e) => {
//        /// destricture tje properties we need from the event target
//        const {name, value, type, checked} = e.target;
//       /// if the input is a checkbox, it's new value is the checked boolean true/false
//           // update the state with new modified toppings arr otherwise it's value string from the text input or select
//           const valueToUpdate = type === 'checkbox' ? checked : value;
//           setFormState({
//             ...formState,
//              [name]: valueToUpdate
//              });

//         }
      

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     //GET arr of topping ids where the value in the state is true
//     const toppings = Object.keys(formState)
//     .filter(key => ['1', '2', '3', '4', '5'].includes(key) && formState[key]);

//     /// create the final paylaod for api
//     const orderPayload = {
//       fullName: formState.fullName,
//       size: formState.size,
//       toppings: toppings
//     };
//     /// dispatch the action on submit
//     dispatch(createOrder(orderPayload));
//     setFormState(initialFormState);
//   }
//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Pizza Form</h2>
//       {isLoading && <div className='pending'>Order in progress...</div>}
//       {errorMessage && <div className='failure'>Order failed: fullName is required</div>}

//       <div className="input-group">
//         <div>
//           <label htmlFor="fullName">Full Name</label><br />
//           <input
//             data-testid="fullNameInput"
//             id="fullName"
//             name="fullName"
//             placeholder="Type full name"
//             type="text"
//             value={formState.fullName}
//             onChange={handleChange}
//           />
//         </div>
//       </div>

//       <div className="input-group">
//         <div>
//           <label htmlFor="size">Size</label><br />
//           <select data-testid="sizeSelect" id="size" name="size" value={formState.size} onChange={handleChange}>
//             <option value="">----Choose size----</option>
//             <option value="S">Small</option>
//             <option value="M">Medium</option>
//             <option value="L">Large</option>
//           </select>
//         </div>
//       </div>

//       <div className="input-group">
//         <label>
//           <input data-testid="checkPepperoni" name="1" type="checkbox"  checked={formState['1']} onChange={handleChange} />
//           Pepperoni<br /></label>
//         <label>
//           <input data-testid="checkGreenpeppers" name="2" type="checkbox" checked={formState['2']} onChange={handleChange}/>
//           Green Peppers<br /></label>
//         <label>
//           <input data-testid="checkPineapple" name="3" type="checkbox" checked={formState['3']} onChange={handleChange} />
//           Pineapple<br /></label>
//         <label>
//           <input data-testid="checkMushrooms" name="4" type="checkbox" checked={formState['4']} onChange={handleChange} />
//           Mushrooms<br /></label>
//         <label>
//           <input data-testid="checkHam" name="5" type="checkbox" checked={formState['5']} onChange={handleChange}/>
//           Ham<br /></label>
//       </div>
//       <input data-testid="submit" type="submit" />
//     </form>
//   )
// }





// frontend/components/PizzaForm.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../state/ordersSlice';


const initialFormState = {
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
}

export default function PizzaForm() {

  const [formState, setFormState] = useState(initialFormState);
  const dispatch = useDispatch();

  /// Sselecting the loading state from redux
  const isLoading = useSelector(state => state.orders.loading);
  const errorMessage = useSelector(state => state.orders.error);
  
  const handleChange = (e) => {
        /// destricture tje properties we need from the event target
        const {name, value, type, checked} = e.target;
      /// if the input is a checkbox, it's new value is the checked boolean true/false
          // update the state with new modified toppings arr otherwise it's value string from the text input or select
          const valueToUpdate = type === 'checkbox' ? checked : value;
          setFormState({
            ...formState,
              [name]: valueToUpdate
            });

        }
      

  const handleSubmit = (e) => {
    e.preventDefault();
    //GET arr of topping ids where the value in the state is true
    const toppings = Object.keys(formState)
    .filter(key => ['1', '2', '3', '4', '5'].includes(key) && formState[key]);

    /// create the final paylaod for api
    const orderPayload = {
      fullName: formState.fullName,
      size: formState.size,
      toppings: toppings
    };
    /// dispatch the action on submit
    // FIX 1: Dispatch the correctly structured 'orderPayload' instead of 'formState'.
    dispatch(createOrder(orderPayload));
    setFormState(initialFormState);
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {isLoading && <div className='pending'>Order in progress...</div>}
      {/* FIX 2: Display the dynamic error message from the Redux store. */}
      {errorMessage && <div className='failure'>Order failed: {errorMessage}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={formState.fullName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" value={formState.size} onChange={handleChange}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox"  checked={formState['1']} onChange={handleChange} />
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" checked={formState['2']} onChange={handleChange}/>
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" checked={formState['3']} onChange={handleChange} />
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" checked={formState['4']} onChange={handleChange} />
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" checked={formState['5']} onChange={handleChange}/>
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}