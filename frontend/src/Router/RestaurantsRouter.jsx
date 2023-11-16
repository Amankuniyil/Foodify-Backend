import React from 'react'
import { Routes, Route, Router } from 'react-router-dom'
import App from '../Components/Restaurants/AddFood'
import RestaurantRegister from '../Components/Restaurants/RestaurantRegister'
import RestaurantHome from '../Components/Restaurants/RestaurantHome'
import OrderDetail from '../Components/Restaurants/OrderDetail'


import ResOrder from '../Components/Restaurants/ResOrder'
import Menu from '../Components/Restaurants/Menu'
import Pending from '../Components/Restaurants/Pending'


function RestaurantRouter() {
  return (
    <Routes>

        <Route path="/register" element={<RestaurantRegister />} />
        <Route path="/resorders" element={<ResOrder />} />
        <Route path="/orderdetail/:orderId" element={<OrderDetail />} />
        <Route path="/" element={<RestaurantHome />} />
        <Route path="/pending" element={<RestaurantHome />} />
        <Route path="/menu" element={<Menu />} />
        

        { <Route path="/addfood" element={<App />} /> }
     
        

    </Routes>
  )
}

export default RestaurantRouter