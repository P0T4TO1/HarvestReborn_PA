import useSWR, { SWRConfiguration } from "swr";
import { IUser } from "@/interfaces";
import { hrApi } from "@/api";

export const useUser = (url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<IUser[]>(`/api${url}`, config);

  return {
    usersData: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};

export const useProfile = async (id: string, config: SWRConfiguration = {}) => {
  const data = await hrApi.get(`/user/profile/${id}`);
  return data.data;
};

export const searchUserByEmail = async (email: string) => {
  console.log(email)
  const res = await hrApi.get(`/user/search?email=${email}`);
  return res.data;
};
