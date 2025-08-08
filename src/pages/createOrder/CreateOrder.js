import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useCreateOrder } from "@/apiServices/orderServices";
import PlacingOrder from "./components/PlacingOrder";
import ShippingMethod from "./components/ShippingMethod";
import { useGetUser } from "@/apiServices/UserApi";
import { useUser } from "@clerk/clerk-react";
export default function CreateOrder() {
    const { createNewOrder, isPending } = useCreateOrder();
    const { currentUser } = useGetUser();
    const { user } = useUser();
    const [formData, setFormData] = useState({
        // email: user?.primaryEmailAddress, // Assuming user has emailAddresses
        firstName: "",
        lastName: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "Nigeria",
        phone: "",
    });
    const useAddress = () => {
        setFormData({
            ...formData,
            firstName: currentUser?.firstName || "",
            lastName: currentUser?.lastName || "",
            street: currentUser?.address.street || "",
            city: currentUser?.address.city || "",
            state: currentUser?.address.state || "",
            zipCode: currentUser?.address.zipCode || "",
            country: currentUser?.address.country || "",
            phone: currentUser?.phone || "",
        });
    };
    const shippingAddress = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        phone: formData.phone,
    };
    const orderData = {
        shippingAddress,
    };
    const orderSummary = {
        subtotal: 1548,
        shipping: 0,
        tax: 123.84,
        total: 1671.84,
    };
    const navigate = useNavigate();
    const handlePlacingOrder = () => {
        createNewOrder(orderData)
            .then((data) => {
            console.log("Order data:", data);
            navigate(`verify-order/${data.orderId}`);
        })
            .catch((error) => {
            console.error("Error placing order:", error);
        });
    };
    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };
    return (_jsx("div", { className: "container mx-auto px-4 py-8", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsx("h1", { className: "text-3xl font-bold mb-8", children: "Checkout" }), _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12", children: _jsxs("div", { className: "space-y-8", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx("span", { className: "bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm", children: "1" }), "Contact Information"] }) }), _jsx(CardContent, { className: "space-y-4", children: _jsxs("div", { children: [_jsx(Label, { htmlFor: "email", children: "Email Address" }), _jsx(Input, { id: "email", type: "email", value: user?.primaryEmailAddress?.emailAddress, disabled: true, placeholder: "your@email.com" })] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx("span", { className: "bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm", children: "2" }), "Shipping Address"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "firstName", children: "First Name *" }), _jsx(Input, { value: formData.firstName, onChange: (e) => handleInputChange("firstName", e.target.value), required: true, className: "h-12" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "lastName", children: "Last Name *" }), _jsx(Input, { id: "lastName", value: formData.lastName, onChange: (e) => handleInputChange("lastName", e.target.value), required: true, className: "h-12" })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "address", children: "Address *" }), _jsx(Input, { id: "street", value: formData.street, onChange: (e) => handleInputChange("street", e.target.value), placeholder: "123 Main Street", required: true, className: "h-12" })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "city", children: "City *" }), _jsx(Input, { id: "city", value: formData.city, onChange: (e) => handleInputChange("city", e.target.value), required: true, className: "h-12" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "state", children: "State *" }), _jsx(Input, { id: "state", value: formData.state, onChange: (e) => handleInputChange("state", e.target.value), required: true, className: "h-12" })] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "zipCode", children: "ZIP Code *" }), _jsx(Input, { id: "zipCode", value: formData.zipCode, onChange: (e) => handleInputChange("zipCode", e.target.value), required: true, className: "h-12" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "phone", children: "Phone *" }), _jsx(Input, { id: "phone", value: formData.phone, onChange: (e) => handleInputChange("phone", e.target.value), required: true, className: "h-12" })] })] }), _jsx(Button, { onClick: useAddress, children: "Use your Address" })] })] }), _jsx(ShippingMethod, {}), _jsx(PlacingOrder, { handlePlacingOrder: handlePlacingOrder, isPending: isPending, orderSummary: orderSummary })] }) })] }) }));
}
