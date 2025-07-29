import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/home/Home';
import { SignIn, SignUp } from '@clerk/clerk-react';
import ProtectedAdminRoutes from './auth/ProtectedAdminRoutes';
import SearchPage from './pages/search/SearchPage';
import ProductDetails from './pages/productDetails/ProductDetails';
import Cart from './pages/cart/Cart';
import ProfilePage from './pages/profile/Profile';
import CreateOrder from './pages/createOrder/CreateOrder';
import VerifyOrder from './pages/verifyOrder/VerifyOrder';

const AppRoutes = () => {
    return (
        <Routes>
             <Route path="/sign-in/*" element={<SignIn />} />
      <Route path="/sign-up/*" element={<SignUp />} />
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/create-order' element={<CreateOrder />} />
            <Route path='/verify-order' element={<VerifyOrder />} />
            
                <Route path='/admin' element={
                    <ProtectedAdminRoutes>
                    <AdminDashboard />
                    </ProtectedAdminRoutes> } />
            <Route path='/userProfile' element={<ProfilePage />} />
        </Routes>
  )
}

export default AppRoutes
