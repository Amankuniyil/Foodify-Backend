import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminDashboard from '../Components/Admin/AdminDashboard'
import AdminUserManagement from '../Components/Admin/AdminUserManagement'
import AdminResManagement from '../Components/Admin/AdminResManagement'
import RestaurantProfile from '../Components/Admin/ResProfile'


function AdminRouter() {
  return (
    <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/users" element={<AdminUserManagement />} />
        <Route path="/restaurants" element={<AdminResManagement />} />
        <Route path="/restaurant-profile/:profileId" element={<RestaurantProfile /> } />

    </Routes>
  )
}

export default AdminRouter