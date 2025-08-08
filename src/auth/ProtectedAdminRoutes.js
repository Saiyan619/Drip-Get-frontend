import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
const ProtectedAdminRoutes = ({ children }) => {
    const { user, isSignedIn, isLoaded } = useUser();
    if (!isLoaded) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) }));
    }
    if (!isSignedIn) {
        return _jsx(Navigate, { to: "/sign-in", replace: true });
    }
    if (user?.publicMetadata?.role !== 'admin') {
        return _jsx(Navigate, { to: "/", replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
export default ProtectedAdminRoutes;
