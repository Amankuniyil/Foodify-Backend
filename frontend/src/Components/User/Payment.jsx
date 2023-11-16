// Payment.js
import SubTotal from '../Layout/SubTotal';
import React from 'react';
import { useParams } from 'react-router-dom';

function Payment() {
  // Use useParams to get the orderId from the URL
  const { orderId } = useParams();

  return (
    <div>
      <h2>Payment Page</h2>
      <p>Order ID: {orderId}</p>
      <SubTotal />
      
    </div>
  );
}

export default Payment;
