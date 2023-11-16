import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logout from '../Auth/Logout';
import  { useEffect} from 'react';
import api from '../../api/axiosConfig';
import { Link, useNavigate } from 'react-router-dom';

function SubTotal() {

    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const user = useSelector(state => state.user);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const shouldShowSellerButton = !user || user.user_type === 'User';
    const location = useLocation();





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
        const total = calculateTotalPrice();
      }
    //   useEffect(() => {
    //     // Fetch cart items and calculate total
    //     const total = calculateTotalPrice();
    
    //     // Pass the total to the parent component
    //     onTotalChange(total);
    // }, []);

    return (
        <div>
            
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
              {/* {cartItems.map((cartItem) => (
              <li key={cartItem.id}>
                <span>
                  {cartItem.food_item.name} - Quantity: {cartItem.quantity} - Price: {cartItem.price}
                </span>
              </li>
            ))} */}
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
              {/* <Link to="/order">
                <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover-bg-blue-600">
                  Check out
                </button>
              </Link> */}
            </div>




        </div>
    );
    
}

export default SubTotal;
















