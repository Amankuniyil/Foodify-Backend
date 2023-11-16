import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import UserRouter from './Router/UserRouter';
import RestaurantRouter from './Router/RestaurantsRouter';
import AdminRouter from './Router/AdminRouter';
import { useSelector } from 'react-redux';
import React from 'react';
function App() {
  const user = useSelector(state => state.user);

  const isUser = user && user.user_type === 'User';
  const isRestaurant = user && user.user_type === 'Restaurant';
  const isAdmin = user && user.user_type === 'Admin';

  return (
    
    <BrowserRouter>
      <Routes>
        {/* Common Routes for all users */}
        <Route path="/*" element={<UserRouter />} />
        <Route path="/Restaurant/*" element={<RestaurantRouter />} />
        <Route path="/admin/*" element={<AdminRouter />} />


                  {/* ADMIN
                  {isAdmin ? (
            <Route path="/admin/*" element={<AdminRouter />} />
          ) : (
            <Route path="/admin/*" element={<Navigate to="/login" />} />
          )}
       */}


        {/* Restaurant Routes based on user type */}
        {/* {isRestaurant || isAdmin ? (
          <Route path="/Restaurant/*" element={<RestaurantRouter />} />
        ) : (
          <Route path="/Restaurant/*" element={<Navigate to="/login" />} />
        )} */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
