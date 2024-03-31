"use client";

import { createContext } from "react";
import { IProductoOrden } from "@/interfaces";

interface BagContextProps {
  isLoaded: boolean;
  bag: IProductoOrden[];
  numberOfProducts: number;
  total: number;

  addProductToBag: (product: IProductoOrden) => void;
  updateBagQuantity: (product: IProductoOrden) => void;
  removeBagProduct: (product: IProductoOrden) => void;
  clearBag: () => void;

  createOrder: () => Promise<{ hasError: boolean; message: string }>;
}

export const BagContext = createContext<BagContextProps>({} as BagContextProps);
