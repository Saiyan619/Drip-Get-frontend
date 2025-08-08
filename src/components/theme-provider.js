import { jsx as _jsx } from "react/jsx-runtime";
import { ThemeProvider as NextThemesProvider } from "next-themes";
export function ThemeProvider({ children, defaultTheme = "system", storageKey = "vite-ui-theme", }) {
    return (_jsx(NextThemesProvider, { attribute: "class", defaultTheme: defaultTheme, storageKey: storageKey, children: children }));
}
