import { jsx as _jsx } from "react/jsx-runtime";
import { SignUp } from '@clerk/clerk-react';
const SignUpPage = () => {
    return (_jsx("div", { className: 'flex items-center justify-center h-screen', children: _jsx(SignUp, {}) }));
};
export default SignUpPage;
