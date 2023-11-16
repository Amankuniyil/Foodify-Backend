import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams
import NavbarRes from '../Layout/NavbarRes';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../Layout/Loading';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api/axiosConfig';

function UserOrder() {
  const { userId } = useParams(); // Get the user ID from the URL



  const [isLoading, setIsLoading] = useState(true);
  const [userOrders, setUserOrders] = useState([]);
  const [userItems, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);


useEffect(() => {
  async function fetchUserOrders() {
    setIsLoading(true);
    try {
      const response = await api.get('http://127.0.0.1:8000/orders/userorders', {
        params: {
          order_by: 'timestamp', // Assuming this is how your API supports ordering by timestamp
        },
      });

      setUserOrders(response.data.orders);
      setItems(response.data.orders.order_items);
      
    } catch (error) {
      console.error('Error fetching user orders', error);
    } finally {
      setIsLoading(false);
    }
  }

  fetchUserOrders();
}, []);


  // useEffect(() => {
  //   // Retrieve the user's token from local storage
  //   const userToken = localStorage.getItem('userToken'); // Adjust this as per your application's storage method

  //   // Include the user's token in the request headers
  //   const config = {
  //     headers: {
  //       Authorization: `Token ${userToken}`,
  //     },
  //   };

  //   // Define the API URL with the user ID
  //   const apiUrl = `http://127.0.0.1:8000/orders/userorders/?user_id=${userId}`;

  //   // Send the GET request with the token in the headers
  //   axios
  //     .get(apiUrl, config)
  //     .then((response) => {
  //       setUserOrders(response.data.orders);
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, [userId]);


return (
    <div className='ml-8'>
        <br /><br /><br />
        <h1 className="mb-10 text-center text-2xl font-bold">Your Orders</h1>

        {isLoading && <p>Loading...</p>}

        {error && <p>Error: {error}</p>}


        <ul>
            {cartItems.map((item) => (
                <li key={item.id}>
                    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                        <h5 className="mb-10 text-center text-2xl">Item</h5>
                        <div className="mb-2 flex justify-between">
                            <p className="text-gray-700">Item ID</p>
                            <p className="text-gray-700">
                                {item.id}
                            </p>
                        </div>
                        {/* Render other item details here */}
                    </div>
                </li>
            ))}
        </ul>


        <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
        <ul>
            {userOrders.map((order) => (
                <li key={order.id}>
                    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                        <h5 className="mb-10 text-center text-2xl ">Order-{order.id}</h5>
                        <div className="mb-2 flex justify-between">
                            <p className="text-gray-700">Address</p>
                            <p className="text-gray-700">
                                {order.address.address_line1}-{order.address.address_line2}
                            </p>
                        </div>
                        <div className="mb-2 flex justify-between">
                        <p className="text-gray-700">Ordered At</p>
                        <p className="text-gray-700">
                          {order.created_at} {/* Display the created_at timestamp */}
                        </p>
                      </div>
                        <div className="flex justify-between">
                            <p className="text-gray-700">Delivery</p>
                            <button className="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                <p className="text-gray-700">
                                    {order.status}-{order.user.first_name}
                                </p>
                            </button>
                        </div>
                        
                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <p className="text-lg font-bold">Total</p>
                            <div>
                                <p className="mb-1 text-lg font-bold">{order.order_total}</p>
                                <p className="text-sm text-gray-700">including VAT</p>
                            </div>
                        </div>
                        
                        <Link to={`/orderdetail/${order.id}`}>
                            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                View Details
                            </button>
                        </Link>
                    </div>
                </li>
            ))}
        </ul>
        
    </div>
);
}

export default UserOrder;

