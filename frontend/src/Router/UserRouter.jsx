import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Cart from '../Components/User/Cart';
import Home from '../Components/User/Home';
import Order from '../Components/User/Order';
import AddAddress from '../Components/User/AddAddress';
import Address from '../Components/User/Address';
// import Payment from '../Components/User/Payment';
import FoodPayment from '../Components/User/FoodPayment';
import UserProfile from '../Components/User/UserProfile';
import Login from '../Components/Auth/Login';
import Logout from '../Components/Auth/Logout';
import Signup from '../Components/Auth/Signup';
import PaymentSuccessPage from '../Components/User/PaymentSuccess';
import ResMenu from '../Components/User/ResMenu';
import UserOder from '../Components/User/UserOrder';
import OrderDetail from '../Components/User/OrderDetail';
import OtpVerification from '../Components/Auth/OtpVerification';

function UserRouter() {
  return (
    <>
      {/* Define the routes and their corresponding components */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/Resmenu/:profileId" element={<ResMenu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/payment/:orderId" element={<FoodPayment />} />
        <Route path="/orderdetail/:orderId" element={<OrderDetail />} />
        <Route path="/add-address" element={<AddAddress />} />
        <Route path="/address" element={<Address />} />
        <Route path="/userorder" element={<UserOder />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/payment/success/" element={<PaymentSuccessPage />} />
      </Routes>
    </>
  );
}

export default UserRouter;
