import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Layout/Loading';
import api from '../../api/axiosConfig';

function OrderDetail() {
  const { orderId } = useParams(); // Get the order ID from the URL
  const [orderItems, setOrderItems] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrderDetails() {
      setIsLoading(true);
      try {
        const response = await api.get(`orders/detail/${orderId}`);
        setOrderDetails(response.data); // Update with the actual API response structure
        setError(null); // Clear any previous errors on success
      } catch (error) {
        console.error('Error fetching order details', error);
        setError('Error fetching order details');
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrderDetails();
  }, [orderId]);

  useEffect(() => {
    async function fetchOrderItems() {
      try {
        const response = await api.get(`orders/items/${orderId}`); // Replace with the actual API endpoint for order items
        setOrderItems(response.data);
      } catch (error) {
        console.error('Error fetching order items', error);
        // You can set an error state here if needed
      }
    }

    fetchOrderItems();
  }, [orderId]); // Fetch order items whenever the order ID changes



  return (
    <div>
      <h1 className="mb-10 text-center text-2xl font-bold">Order Details</h1>
      

      {isLoading && <Loading />}

      {error && <p className="text-red-500">Error: {error}</p>}

      {!isLoading && !error && (
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md">
          <h2 className="text-xl font-bold mb-2">Order Details</h2>
          <p>Order ID: {orderDetails.id}</p>
          <p>Order Total: {orderDetails.order_total}</p> {/* Corrected a typo here */}
          
          {/* Render other order details here */}
        </div>
        
      )}
      <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md">
        <h2 className="text-xl font-bold mb-2">Order Items</h2>
        <ul>
          {orderItems.map((item) => (
            <li key={item.id}>
                
                {item.id}-{item.food_item} - Quantity: {item.quantity} - Price: {item.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OrderDetail;
