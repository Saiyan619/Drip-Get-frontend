import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const Pricing = ({ newProduct, setNewProduct }) => {
    return (_jsx("div", { children: _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Pricing" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "price", children: "Regular Price *" }), _jsx(Input, { id: "price", type: "number", min: "0", step: "0.01", value: newProduct.price, onChange: (e) => setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) || 0 }), placeholder: "50.00" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "salePrice", children: "Sale Price (Optional)" }), _jsx(Input, { id: "salePrice", type: "number", min: "0", step: "0.01", value: newProduct.salePrice, onChange: (e) => setNewProduct({ ...newProduct, salePrice: Number.parseFloat(e.target.value) || 0 }), placeholder: "30.00" })] })] })] }) }));
};
export default Pricing;
