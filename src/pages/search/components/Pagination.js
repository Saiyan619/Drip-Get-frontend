import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1)
        return null;
    return (_jsxs("div", { className: "flex justify-center items-center mt-8 gap-2", children: [_jsx(Button, { variant: "outline", disabled: currentPage === 1, onClick: () => onPageChange(currentPage - 1), children: _jsx(ChevronLeft, { className: "h-4 w-4" }) }), Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (_jsx(Button, { variant: currentPage === page ? "default" : "outline", onClick: () => onPageChange(page), size: "sm", children: page }, page))), _jsx(Button, { variant: "outline", disabled: currentPage === totalPages, onClick: () => onPageChange(currentPage + 1), children: _jsx(ChevronRight, { className: "h-4 w-4" }) })] }));
};
