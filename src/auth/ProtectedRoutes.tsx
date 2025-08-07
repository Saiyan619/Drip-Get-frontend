import { useUser } from '@clerk/clerk-react';
import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isSignedIn, isLoaded } = useUser();
  const location = useLocation();

  // Show loading state while Clerk is determining auth status
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not signed in, redirect to sign-in page with return URL
  if (!isSignedIn) {
    return (
      <Navigate 
        to="/sign-in" 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  // User is authenticated, render children
  return <>{children}</>;
};

export default ProtectedRoute;