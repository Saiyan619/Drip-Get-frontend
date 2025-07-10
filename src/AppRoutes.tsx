import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from './pages/AdminDashboard';
import UserProfile from './pages/UserProfile';
import Home from './pages/home/Home';
import { SignIn, SignUp } from '@clerk/clerk-react';
import ProtectedAdminRoutes from './auth/ProtectedAdminRoutes';
import SearchPage from './pages/search/SearchPage';

const AppRoutes = () => {
    return (
        <Routes>
             <Route path="/sign-in/*" element={<SignIn />} />
      <Route path="/sign-up/*" element={<SignUp />} />
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<SearchPage />} />
            
                <Route path='/admin' element={
                    <ProtectedAdminRoutes>
                    <AdminDashboard />
                    </ProtectedAdminRoutes> } />
            <Route path='/userProfile' element={<UserProfile />} />
        </Routes>
  )
}

export default AppRoutes
