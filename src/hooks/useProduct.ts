import { hrApi } from "@/api";
import useSWR, { SWRConfiguration } from "swr";
import { IProduct } from "@/interfaces";

export const searchProductByName = async (name: string) => {
  const res = await hrApi.get(`/admin/product/search/${name}`);
  return res.data;
};

export const useProducts = (config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<IProduct[]>("/inventory/products", config);
  console.log(data, error)
  return {
    products: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};
