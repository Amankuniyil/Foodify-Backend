import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Layout/Navbar';
import SubTotal from '../Layout/SubTotal';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCartItems() {
      setIsLoading(true);
      try {
        const response = await api.get('http://127.0.0.1:8000/cart/items');
        setCartItems(response.data.cart_items);
      } catch (error) {
        console.error('Error fetching cart items', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCartItems();
  }, []);

  function calculateTotalPrice() {
    return cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
  }

  async function handleDeleteCartItem(cartItemId) {
    try {
      await api.delete(`http://127.0.0.1:8000/cart/items/${cartItemId}`);
      // Update the cartItems state to reflect the item deletion
      setCartItems(cartItems.filter(item => item.id !== cartItemId));
    } catch (error) {
      console.error('Error deleting cart item', error);
    }
  }
  async function handleAddCartItem(cartItemId) {
    try {
      // Construct the URL with cartItemId and use the correct endpoint path
      await api.post(`http://127.0.0.1:8000/cart/addq/${cartItemId}/`);
  
      // Find the item in the cartItems array and update its quantity
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === cartItemId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
  
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error('Error adding cart item', error);
    }
  }
  function calculateTotalCost(quantity, price) {
    return quantity * price;
  }
  

  async function handleMinusCartItem(cartItemId) {
    try {
      // Construct the URL with cartItemId and use the correct endpoint path
      await api.post(`http://127.0.0.1:8000/cart/minus/${cartItemId}/`);
      // Update the cartItems state to reflect the item addition
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === cartItemId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
  
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error('Error adding cart item', error);
    }
  }
  

  return (
    <div>
      <Navbar />
      
      {isLoading ? (
        <p>Loading cart items...</p>
      ) : cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        
        <div className="h-screen bg-gray-100 pt-20">
          <div className="mb-10  ">
          
          <h1 class="mb-10 bg-white text-center text-2xl font-bold text-yellow-400">Cart Items</h1>

          
          
          <div className="mx-auto max-w-5xl justify-between px-6 md:flex md:space-x-6 xl:px-0">
            
            <p></p>
            <div className="rounded-lg md:w-2/3">
              
              {cartItems.map((cartItem) => (
                <div key={cartItem.id}>
                  <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                    <img
                      src={process.env.REACT_APP_API_BASE_URL + cartItem.food_item.image}
                      alt="card-image"
                      style={{ width: '200px', height: '150px' }}
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-xl font-bold text-gray-900">{cartItem.name}</h2>
                        <p className="mt-1 text-lg text-gray-700">{cartItem.price}</p>
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">
                          <button onClick={() => handleMinusCartItem(cartItem.id)}>
                          <span className="cursor-pointer rounded-l bg-yellow-400 py-1 px-3.5 duration-100 text-white">
                            {' '}
                            -{' '}
                          </span> 
                          </button>
                          <p className="cursor-pointer bg-yellow-400  py-1 px-3 duration-100 hover-bg-blue-500 hover-text-blue-50 text-white">{cartItem.quantity}</p>
                          
                          <button onClick={() => handleAddCartItem(cartItem.id)}>
                          <span className="cursor-pointer rounded-r bg-yellow-400 py-1 px-3   text-white">
                            {' '}
                            +{' '}
                          </span>
                          </button>
                        </div>
                        <br />
                        <div className="flex items-center space-x-4 text-lg">
                          <p className="text-sm">{cartItem.quantity} X {cartItem.price} = {calculateTotalCost(cartItem.quantity, cartItem.price)}</p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            onClick={() => handleDeleteCartItem(cartItem.id)}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5 cursor-pointer duration-150 hover-text-red-500"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">{calculateTotalPrice()}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Delivery</p>
                <p className="text-gray-700">0</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div>
                  <p className="mb-1 text-lg font-bold">{calculateTotalPrice()}</p>
                  <p className="text-sm text-gray-700">including VAT</p>
                </div>
              </div>
              <Link to="/order">
                <button className="mt-6 w-full rounded-md bg-yellow-400 py-1.5 font-medium text-blue-50 hover-bg-blue-600">
                  Check out
                </button>
              </Link>
            </div>
          </div>
          </div>
        
        </div>
      )}
    </div>
  );
}

export default Cart;
