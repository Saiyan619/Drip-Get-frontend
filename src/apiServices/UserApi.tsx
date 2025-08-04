import { UserInput } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type createUserInput = {
  clerkId: string;
};

export const useCreateUser = () => {
  const { getToken } = useAuth();

  const createUser = async (id:createUserInput) => {
    console.log("creating user.......");
    const token = await getToken();

    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });

    if (response.ok) {
      console.log("user created succesfully");
    }
    return response.json();
  };

  const {
    mutateAsync: createNewUser,
    isPending,
    isError,
    isSuccess,
  } = useMutation({ mutationFn: createUser });
  return { createNewUser, isPending, isError, isSuccess };
};


export const useGetUser = () => {
      const { getToken } = useAuth();
    const getUserDetails = async () => {
        let token = await getToken();
    const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }

    })

        if (response.ok) {
            console.log("profile fetch success")
        }

        return response.json();
}

    const { data: currentUser, isPending, error } = useQuery({ queryKey: ["fetchCurrentUser"], queryFn: getUserDetails })
  return { currentUser, isPending };
}

export const useUpdateUser = () => {
  const { getToken } = useAuth();
  const updateUser = async (userData:UserInput) => {
    const token = await getToken();
    const response = await fetch(`${API_BASE_URL}/api/auth/profile/update`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body:JSON.stringify(userData)
    })
    if (!response.ok) {
      throw new Error("Failed to update user");
    }
    const data = await response.json();
    console.log("update complete",data)
    return data

  }
  return {updateUser}
  
}

export const useGetAllUsers = () => {
  const { getToken } = useAuth();
  const getAllUsers = async () => {
    
  }
}