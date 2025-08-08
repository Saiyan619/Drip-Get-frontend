import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { User, Package, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetUser, useUpdateUser } from "@/apiServices/UserApi";
import { useUser } from "@clerk/clerk-react";
import PersonalInformation from "./components/PersonalInformation";
import ProfileOrders from "./components/ProfileOrders";
export default function ProfilePage() {
    const { currentUser } = useGetUser();
    const { updateUser } = useUpdateUser();
    const { user } = useUser();
    console.log(currentUser);
    useEffect(() => {
        if (currentUser) {
            setProfileData({
                firstName: currentUser.firstName || "",
                lastName: currentUser.lastName || "",
                email: currentUser.email || "",
                phone: currentUser.phone || "",
                address: {
                    street: currentUser.address?.street || "",
                    city: currentUser.address?.city || "",
                    state: currentUser.address?.state || "",
                    zipCode: currentUser.address?.zipCode || "",
                    country: currentUser.address?.country || "",
                },
            });
        }
    }, [currentUser]);
    // console.log(user)
    const [activeTab, setActiveTab] = useState("profile");
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        firstName: currentUser?.firstName || "",
        lastName: currentUser?.lastName || "",
        email: currentUser?.email || "",
        phone: currentUser?.phone || "",
        address: {
            street: currentUser?.address?.street || "",
            city: currentUser?.address?.city || "",
            state: currentUser?.address?.state || "",
            zipCode: currentUser?.address?.zipCode || "",
            country: currentUser?.address?.country || "",
        },
    });
    console.log(profileData.firstName);
    const handleSave = () => {
        setIsEditing(false);
        // Save profile data
        updateUser({
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            email: profileData.email,
            phone: profileData.phone,
            address: {
                street: profileData.address.street,
                city: profileData.address.city,
                state: profileData.address.state,
                zipCode: profileData.address.zipCode,
                country: profileData.address.country
            },
        });
    };
    return (_jsx("div", { className: "container mx-auto px-4 py-8", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsxs("div", { className: "flex items-center gap-4 mb-8", children: [_jsx("div", { className: "relative", children: _jsx("img", { src: user?.imageUrl || "/placeholder.svg", alt: "niyi", width: 80, height: 80, className: "rounded-full" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: profileData.firstName }), _jsx("p", { className: "text-gray-600", children: profileData.email })] })] }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [_jsxs(TabsTrigger, { value: "profile", className: "flex items-center gap-2", children: [_jsx(User, { className: "h-4 w-4" }), "Profile"] }), _jsxs(TabsTrigger, { value: "orders", className: "flex items-center gap-2", children: [_jsx(Package, { className: "h-4 w-4" }), "Orders"] }), _jsxs(TabsTrigger, { value: "wishlist", className: "flex items-center gap-2", children: [_jsx(Heart, { className: "h-4 w-4" }), "Wishlist"] })] }), _jsx(TabsContent, { value: "profile", className: "mt-6", children: _jsx(PersonalInformation, { setProfileData: setProfileData, profileData: profileData, setIsEditing: setIsEditing, handleSave: handleSave, isEditing: isEditing }) }), _jsx(TabsContent, { value: "orders", className: "mt-6", children: _jsx(ProfileOrders, {}) }), _jsx(TabsContent, { value: "wishlist", className: "mt-6", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Wishlist" }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: [1, 2, 3].map((item) => (_jsxs("div", { className: "group relative", children: [_jsx("div", { className: "aspect-square overflow-hidden rounded-lg bg-gray-100 relative", children: _jsx(Button, { variant: "ghost", size: "icon", className: "absolute top-2 right-2 bg-white/80 hover:bg-white", children: _jsx(Heart, { className: "h-4 w-4 fill-red-500 text-red-500" }) }) }), _jsxs("div", { className: "mt-4 space-y-2", children: [_jsxs("h3", { className: "font-medium", children: ["Designer Item ", item] }), _jsx("p", { className: "text-sm text-gray-600", children: "Brand Name" }), _jsx("p", { className: "font-semibold", children: "$299" }), _jsx(Button, { size: "sm", className: "w-full", children: "Add to Cart" })] })] }, item))) }) })] }) })] })] }) }));
}
