import useSWR, { SWRConfiguration } from "swr";
import { IUser, IBusiness, IOrganization } from "@/interfaces";
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
  console.log(id, "id")
  const { data } = await hrApi.get("/user/profile", {

  });
  console.log(data)

  return {
    userData: data || {},
  
  };
};
