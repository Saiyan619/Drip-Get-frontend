import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
export const ProductSkeleton = ({ count, viewMode }) => {
    return (_jsx("div", { className: `grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`, children: Array.from({ length: count }).map((_, i) => (_jsx(Card, { children: _jsxs(CardContent, { className: "p-6", children: [_jsx(Skeleton, { className: "h-48 w-full mb-4" }), _jsx(Skeleton, { className: "h-4 w-2/3 mb-2" }), _jsx(Skeleton, { className: "h-4 w-1/2 mb-4" }), _jsx(Skeleton, { className: "h-6 w-1/4" })] }) }, i))) }));
};
