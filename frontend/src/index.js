import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ShopContextProvider from './Context/ShopContext'
import { Provider } from 'react-redux'
import cartReducer from './reducers';
import {configureStore} from '@reduxjs/toolkit'
import store from './store';
// const store = configureStore({
//   reducer: {
//     cart: cartReducer
//   }
// })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ShopContextProvider>
  <Provider store={store}>
    <App />
   </Provider>
  </ShopContextProvider>
);

