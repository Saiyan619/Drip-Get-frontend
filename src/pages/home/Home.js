import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCreateUser, useGetUser } from '@/apiServices/UserApi';
import { useAuth, useUser } from '@clerk/clerk-react';
import Header from './components/Header';
import FeaturedClothes from './components/LatestClothes';
import HighestPriceProduct from './components/HighestPriceProduct';
import LowestProducts from './components/LowestProducts';
const Home = () => {
    const { user } = useUser();
    const { createNewUser, isSuccess, isError } = useCreateUser();
    const { currentUser } = useGetUser();
    const { getToken } = useAuth();
    // console.log(user)
    console.log(currentUser);
    const tokenFunc = async () => {
        const token = await getToken();
        console.log(token);
    };
    const createMyUser = async () => {
        const token = await getToken();
        console.log(token);
        let clerkId = user?.id;
        console.log(clerkId);
        if (!clerkId) {
            return;
        }
        ;
        try {
            await createNewUser({ clerkId });
        }
        catch (error) {
            console.error(error);
        }
    };
    return (_jsxs("div", { children: [_jsx(Header, {}), _jsx(FeaturedClothes, {}), _jsx(HighestPriceProduct, {}), _jsx(LowestProducts, {})] }));
};
export default Home;
