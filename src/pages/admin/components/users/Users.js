import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllUsers } from "@/apiServices/UserApi";
const Users = () => {
    const { allUsers } = useGetAllUsers();
    // console.log(allUsers)
    return (_jsx("div", { children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Customers" }) }), _jsx(CardContent, { children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Name" }), _jsx(TableHead, { children: "Email" }), _jsx(TableHead, { children: "Orders" }), _jsx(TableHead, { children: "Total Spent" }), _jsx(TableHead, { children: "Join Date" })] }) }), _jsx(TableBody, { children: allUsers?.map((user) => {
                                    return (_jsxs(TableRow, { children: [_jsxs(TableCell, { className: "font-medium", children: [user.firstName, " ", user.lastName] }), _jsx(TableCell, { children: user.email }), _jsx(TableCell, { children: user.orders.length }), _jsxs(TableCell, { children: ["$", user.totalOrderAmount] }), _jsx(TableCell, { children: new Date(user.createdAt).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                }) })] }));
                                }) })] }) })] }) }));
};
export default Users;
