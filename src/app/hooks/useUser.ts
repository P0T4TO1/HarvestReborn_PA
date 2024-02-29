
import useSWR, { SWRConfiguration } from "swr";
import { IUser, IBusiness, IOrganization } from "@/interfaces";

export const useUser = (url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<IUser[]>(`/api${url}`, config);

  return {
    usersData: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};

export const useProfile = (id: string, config: SWRConfiguration = {}) => {
  const { data } = useSWR<IUser | IBusiness | IOrganization>(`/api/user/profile?id=${id}`, config);
  console.log(data, "data from useProfile");
  return {
    userData: data || {},
  };
};
