import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from './pages/admin/AdminDashboard';
import Home from './pages/home/Home';
import ProtectedAdminRoutes from './auth/ProtectedAdminRoutes';
import SearchPage from './pages/search/SearchPage';
import ProductDetails from './pages/productDetails/ProductDetails';
import Cart from './pages/cart/Cart';
import ProfilePage from './pages/profile/Profile';
import CreateOrder from './pages/createOrder/CreateOrder';
import VerifyOrder from './pages/verifyOrder/VerifyOrder';
import PaymentSuccessPage from './pages/paymentSuccess/PaymentSuccess';
import ProtectedRoute from './auth/ProtectedRoutes';
import SignInPage from './auth/sign-in';
import SignUpPage from './auth/sign-up';

const AppRoutes = () => {
    return (
        <Routes>
             <Route path="/sign-in/*" element={<SignInPage />} />
      <Route path="/sign-up/*" element={<SignUpPage />} />
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path='/create-order' element={<ProtectedRoute><CreateOrder /></ProtectedRoute>} />
            <Route path='/create-order/verify-order/:id' element={<ProtectedRoute><VerifyOrder /></ProtectedRoute>} />
            <Route path='/payment-success' element={<ProtectedRoute><PaymentSuccessPage /></ProtectedRoute>} />
                        <Route path='/userProfile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

                <Route path='/admin' element={
                    <ProtectedAdminRoutes>
                    <AdminDashboard />
                    </ProtectedAdminRoutes> } />
        </Routes>
  )
}

export default AppRoutes
