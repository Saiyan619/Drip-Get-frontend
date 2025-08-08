import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useUser } from '@clerk/clerk-react';
import { Navigate, useLocation } from 'react-router-dom';
const ProtectedRoute = ({ children }) => {
    const { isSignedIn, isLoaded } = useUser();
    const location = useLocation();
    // Show loading state while Clerk is determining auth status
    if (!isLoaded) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) }));
    }
    // If not signed in, redirect to sign-in page with return URL
    if (!isSignedIn) {
        return (_jsx(Navigate, { to: "/sign-in", state: { from: location.pathname }, replace: true }));
    }
    // User is authenticated, render children
    return _jsx(_Fragment, { children: children });
};
export default ProtectedRoute;
