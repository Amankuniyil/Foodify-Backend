import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrderDetail({ match }) {
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(true);


  const [restaurantProfileId, setRestaurantProfileId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);


  const [socket, setSocket] = useState(null);


  useEffect(() => {
    const orderId = match.params.orderId; // Extract the order ID from the URL
    const apiUrl = `orders/order-detail/${orderId}/`;

    axios
      .get(apiUrl)
      .then((response) => {
 
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
        <h3>hello</h3>
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>

      {isLoading && <p>Loading...</p>}

      {error && <p>Error: {error}</p>}

      {!isLoading && !error && (
        <form>
          <div>
            <label htmlFor="orderNumber">Order Number</label>
            <input
              type="text"
              id="orderNumber"
              name="orderNumber"
              value={order.orderNumber}
              readOnly
            />
          </div>
          

          <div>
            <label htmlFor="totalAmount">Total Amount</label>
            <input
              type="text"
              id="totalAmount"
              name="totalAmount"
              value={order.totalAmount}
              readOnly
            />
          </div>

          <div>
            <label htmlFor="customerName">Customer Name</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={`${order.user.first_name} ${order.user.last_name}`}
              readOnly
            />
          </div>

          <div>
            <label htmlFor="orderStatus">Order Status</label>
            <input
              type="text"
              id="orderStatus"
              name="orderStatus"
              value={order.status}
              readOnly
            />
          </div>
        </form>
      )}
    </div>
  );
}

export default OrderDetail;
