import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted)
        return null;
    return (_jsxs(Button, { variant: "outline", size: "icon", onClick: () => setTheme(theme === "dark" ? "light" : "dark"), children: [theme === "dark" ? _jsx(Sun, { className: "h-5 w-5" }) : _jsx(Moon, { className: "h-5 w-5" }), _jsx("span", { className: "sr-only", children: "Toggle theme" })] }));
}
