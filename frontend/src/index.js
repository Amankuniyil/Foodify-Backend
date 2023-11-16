import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App';
import { Provider } from 'react-redux';
import store from './Redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <App />
      <ToastContainer />
  </Provider>
);