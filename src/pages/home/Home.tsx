import { useCreateUser, useGetUser } from '@/apiServices/UserApi';
import { Button } from '@/components/ui/button';
import { useAuth, useUser } from '@clerk/clerk-react';
import React from 'react'
import Header from './components/Header';
import FeaturedGames from './components/FeaturedClothes';
import GameCategories from './components/ProductCategories';
    


const Home = () => {
  const { user } = useUser();
  const { createNewUser, isSuccess, isError } = useCreateUser();
  const {currentUser} = useGetUser();
  const { getToken } = useAuth();

  // console.log(user)
  console.log(currentUser)

  const tokenFunc = async () => {
    const token = await getToken();
    console.log(token)
  }
  
  const createMyUser = async () => {
    const token = await getToken();
    console.log(token);
    let clerkId = user?.id
      console.log(clerkId);
    if (!clerkId) {
      return;
    };
    try {
          await createNewUser({clerkId})
    } catch (error) {
      console.error(error)
    }
 
}
  return (
    <div>
      {/* Home
      Home 
      <Button onClick={createMyUser}>register</Button> */}
      <Button onClick={tokenFunc}>register</Button> 
      <Header />
      <FeaturedGames />
      <GameCategories />
    </div>
  )
}

export default Home
