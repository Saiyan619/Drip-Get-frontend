import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
const BasicInfo = ({ newProduct, setNewProduct, categories }) => {
    return (_jsx("div", { children: _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Basic Information" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "name", children: "Product Name *" }), _jsx(Input, { id: "name", value: newProduct.name, onChange: (e) => setNewProduct({ ...newProduct, name: e.target.value }), placeholder: "e.g., Stussy jorts" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "category", children: "Category *" }), _jsx("select", { id: "category", value: newProduct.category, onChange: (e) => setNewProduct({ ...newProduct, category: e.target.value }), className: "w-full px-3 py-2 border rounded-lg", children: categories.map((cat) => (_jsx("option", { value: cat.value, children: cat.label }, cat.value))) })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "description", children: "Description *" }), _jsx(Textarea, { id: "description", value: newProduct.description, onChange: (e) => setNewProduct({ ...newProduct, description: e.target.value }), placeholder: "e.g., made by lil yatvhy", rows: 3 })] })] }) }));
};
export default BasicInfo;
