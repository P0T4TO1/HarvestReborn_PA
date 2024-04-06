"use client";

import { createContext } from "react";
import { IOrden, IProductoOrden } from "@/interfaces";

interface BagContextProps {
  isLoaded: boolean;
  bag: IProductoOrden[];
  numberOfProducts: number;
  total: number;

  addProductToBag: (product: IProductoOrden) => void;
  updateBagQuantity: (product: IProductoOrden) => void;
  removeBagProduct: (product: IProductoOrden) => void;
  clearBag: () => void;

  createOrder: (id_cliente: number, id_historial: number) => Promise<{ hasError: boolean; message: string, data: IOrden }>;
}

export const BagContext = createContext<BagContextProps>({} as BagContextProps);
