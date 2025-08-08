import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from './AppRoutes';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/sonner';
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});
export default function App() {
    return (_jsx(Router, { children: _jsxs(QueryClientProvider, { client: queryClient, children: [_jsx(ThemeProvider, { defaultTheme: "dark", storageKey: "vite-ui-theme", children: _jsxs("div", { className: "min-h-screen bg-background", children: [_jsx(Navbar, {}), _jsx(AppRoutes, {}), _jsx(Footer, {})] }) }), _jsx(Toaster, {})] }) }));
}
