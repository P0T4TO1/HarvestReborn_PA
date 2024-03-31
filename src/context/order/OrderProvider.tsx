"use client";

import { useEffect, useReducer, ReactNode, useContext } from "react";
import Cookie from "js-cookie";
import { BagContext } from "./OrderContext";
import { bagReducer } from "./orderReducer";

import { IOrden, IProductoOrden } from "@/interfaces";
import axios from "axios";
import { hrApi } from "@/api";
import { AuthContext } from "@/context/auth";

export interface BagState {
  isLoaded: boolean;
  bag: IProductoOrden[];
  numberOfProducts: number;
  total: number;
}

const BAG_INITIAL_STATE: BagState = {
  isLoaded: false,
  bag: [],
  numberOfProducts: 0,
  total: 0,
};

export const BagProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(AuthContext);
  const [state, dispatch] = useReducer(bagReducer, BAG_INITIAL_STATE);

  useEffect(() => {
    try {
      const localBag = localStorage.getItem("bag")
        ? JSON.parse(localStorage.getItem("bag")!)
        : [];
      const cookieBag = Cookie.get("bag") ? JSON.parse(Cookie.get("bag")!) : [];
      dispatch({ type: "LOAD_BAG", payload: localBag || cookieBag });
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOAD_BAG", payload: [] });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bag", JSON.stringify(state.bag));
    Cookie.set("bag", JSON.stringify(state.bag));
  }, [state.bag]);

  useEffect(() => {
    const numberOfProducts = state.bag.reduce(
      (acc, product) => acc + product.cantidad_orden,
      0
    );
    const total = state.bag.reduce(
      (acc, product) => acc + product.monto * product.cantidad_orden,
      0
    );
    const orderSummary = {
      numberOfProducts,
      total,
    };
    dispatch({ type: "UPDATE_ORDER_SUMMARY", payload: orderSummary });
  }, [state.bag]);

  const addProductToBag = async (product: IProductoOrden) => {
    const productInBag = state.bag.find(
      (item) => item.id_productoOrden === product.id_productoOrden
    );

    if (!productInBag) {
      return dispatch({
        type: "UPDATE_PRODUCTS_IN_BAG",
        payload: [...state.bag, product],
      });
    }

    const updatedBag = state.bag.map((item) => {
      if (item.id_productoOrden !== product.id_productoOrden) return item;
      item.cantidad_orden += product.cantidad_orden;
      return item;
    });
    dispatch({ type: "UPDATE_PRODUCTS_IN_BAG", payload: updatedBag });
  };

  const updateBagQuantity = (product: IProductoOrden) => {
    dispatch({ type: "CHANGE_BAG_QUANTITY", payload: product });
  };

  const removeBagProduct = async (product: IProductoOrden) => {
    const { id_productoOrden } = product;
    try {
      const { data } = await hrApi.delete(
        `/cliente/ordenProducto/${id_productoOrden}`
      );
      console.log(data);
      if (data.error) {
        return {
          hasError: true,
          message: data.message,
        };
      }
      dispatch({ type: "REMOVE_PRODUCT", payload: product });
    } catch (error) {
      console.log(error);
      return {
        hasError: true,
        message: "Error al eliminar el producto de la bolsa",
      };
    }
  };

  const clearBag = () => {
    dispatch({ type: "CLEAR_BAG", payload: [] });
  };

  const createOrder = async () => {
    const body: IOrden = {
      fecha_orden: new Date().toISOString(),
      hora_orden: new Date().toISOString(),
      monto_subtotal: state.total,
      monto_total: state.total,
      estado_orden: "Pendiente",
    };

    try {
      const { data } = await axios.post("/order", body);
      console.log(data);
      if (data.error) {
        return {
          hasError: true,
          message: data.message,
        };
      }
      dispatch({ type: "ORDER_COMPLETED" });
      return {
        hasError: false,
        message: "Orden creada con éxito",
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
      return {
        hasError: true,
        message: "Error no controlado, hable con el administrador",
      };
    }
  };

  return (
    <BagContext.Provider
      value={{
        ...state,
        addProductToBag,
        removeBagProduct,
        updateBagQuantity,
        clearBag,

        createOrder,
      }}
    >
      {children}
    </BagContext.Provider>
  );
};
