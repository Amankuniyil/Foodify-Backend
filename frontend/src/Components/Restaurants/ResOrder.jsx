import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarRes from '../Layout/NavbarRes';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../Layout/Loading';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api/axiosConfig';

function ResOrder() {
  const [isLoading, setIsLoading] = useState(true);
  const [restaurantProfileId, setRestaurantProfileId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const statusOptions = ['Order Confirmed', 'Cooking', 'Out for delivery', 'Delivered'];

  const handleChangeOrderStatus = async (orderId) => {
    setIsLoading(true);

    try {
      console.log('Sending request to change order status...');

      // Find the current status of the order
      const order = orders.find((order) => order.id === orderId);

      if (!order) {
        toast.error('Order not found.');
        return;
      }

      // Find the index of the current status in the predefined status options
      const currentIndex = statusOptions.indexOf(order.status);

      if (currentIndex === -1 || currentIndex === statusOptions.length - 1) {
        toast.error('Invalid status or order is already delivered.');
        return;
      }

      // Get the next status based on the index
      const newStatus = statusOptions[currentIndex + 1];

      // Perform your status change logic here
      const response = await api.post(`orders/change-order-status/${orderId}/`, {
        newStatus: newStatus,
      });

      // Update the order status in the state
      const updatedOrders = orders.map((o) =>
        o.id === orderId ? { ...o, status: newStatus } : o
      );
      setOrders(updatedOrders);

      toast.success('Order status changed successfully to ' + newStatus);
    } catch (error) {
      console.error('Error changing order status:', error);
      toast.error('Error changing order status.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const apiUrl = 'http://127.0.0.1:8000/orders/resorders/';

    axios
      .get(apiUrl)
      .then((response) => {
        setRestaurantProfileId(response.data.restaurant_profile_id);
        setOrders(response.data.orders);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <NavbarRes />
      <br /><br /><br />
      <h1 className="mb-10 text-center text-2xl font-bold">Restaurant Orders</h1>

      {isLoading && <p>Loading...</p>}

      {error && <p>Error: {error}</p>}

      <ul className="flex justify-center flex-wrap">
        {orders.map((order) => (
          <li key={order.id} className="m-4">
            <div className="h-full rounded-lg border bg-white p-6 shadow-md w-96">
              <h5 className="mb-4 text-center text-xl font-semibold">Order -{order.id}</h5>
              <div className="mb-2">
                
                <p className="text-gray-700 text-lg">
                  {order.user.first_name} {order.user.last_name}-{order.user.phone_number}
                </p>
                <br />
                <p className="text-gray-700">
                  {order.user.email} 
                </p>
                <br />
                <p className="text-gray-700">
                  {order.address.address_line1}-{order.address.address_line2}
                </p>
                <br />
                <p className="text-gray-700">
                 {order.address.city}--{order.address.pincode}
                </p>
                <br />
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Order-status</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
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
              <button
                className="mt-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={() => handleChangeOrderStatus(order.id)}
              >
                Change Status
              </button>
              <Link to={`/orderdetail/${order.id}`}>
                <button
                  className="mt-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
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

export default ResOrder;
