import { jsx as _jsx } from "react/jsx-runtime";
import { SignIn } from '@clerk/clerk-react';
const SignInPage = () => {
    return (_jsx("div", { className: 'flex items-center justify-center h-screen', children: _jsx(SignIn, {}) }));
};
export default SignInPage;
