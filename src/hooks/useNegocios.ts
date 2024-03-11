import { hrApi } from "@/api";

export const useNegocio = async (id: string) => {
  const res = await hrApi.get(`/negocio/${id}`);
  return res.data;
};

export const useNegocios = async () => {
  const res = await hrApi.get("/negocio");
  return res.data;
};
