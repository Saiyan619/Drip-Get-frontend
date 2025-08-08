import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes } from "react-router-dom";
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
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/sign-in/*", element: _jsx(SignInPage, {}) }), _jsx(Route, { path: "/sign-up/*", element: _jsx(SignUpPage, {}) }), _jsx(Route, { path: '/', element: _jsx(Home, {}) }), _jsx(Route, { path: '/search', element: _jsx(SearchPage, {}) }), _jsx(Route, { path: '/product/:id', element: _jsx(ProductDetails, {}) }), _jsx(Route, { path: '/cart', element: _jsx(ProtectedRoute, { children: _jsx(Cart, {}) }) }), _jsx(Route, { path: '/create-order', element: _jsx(ProtectedRoute, { children: _jsx(CreateOrder, {}) }) }), _jsx(Route, { path: '/create-order/verify-order/:id', element: _jsx(ProtectedRoute, { children: _jsx(VerifyOrder, {}) }) }), _jsx(Route, { path: '/payment-success', element: _jsx(ProtectedRoute, { children: _jsx(PaymentSuccessPage, {}) }) }), _jsx(Route, { path: '/userProfile', element: _jsx(ProtectedRoute, { children: _jsx(ProfilePage, {}) }) }), _jsx(Route, { path: '/admin', element: _jsx(ProtectedAdminRoutes, { children: _jsx(AdminDashboard, {}) }) })] }));
};
export default AppRoutes;
