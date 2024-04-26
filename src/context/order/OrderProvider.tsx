"use client";

import { useEffect, useReducer, ReactNode } from "react";
import Cookie from "js-cookie";
import { BagContext } from "./OrderContext";
import { bagReducer } from "./orderReducer";

import { IOrden, IProductoOrden } from "@/interfaces";
import { hrApi } from "@/api";
import { EstadoOrden } from "@/interfaces";

export interface BagState {
  isLoaded: boolean;
  bag: IProductoOrden[];
  numberOfProducts: number;
  total: number;
  idNegocio: number;
}

const BAG_INITIAL_STATE: BagState = {
  isLoaded: false,
  bag: [],
  numberOfProducts: 0,
  total: 0,
  idNegocio: 0,
};

export const BagProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(bagReducer, BAG_INITIAL_STATE);

  useEffect(() => {
    try {
      const localBag = localStorage.getItem("bag")
        ? JSON.parse(localStorage.getItem("bag")!)
        : [];
      const cookieBag = Cookie.get("bag") ? JSON.parse(Cookie.get("bag")!) : [];
      const idNegocio = localStorage.getItem("negocio")
        ? JSON.parse(localStorage.getItem("negocio")!)
        : 0;
      dispatch({ type: "LOAD_ID_NEGOCIO", payload: idNegocio });
      dispatch({ type: "LOAD_BAG", payload: localBag ?? cookieBag });
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOAD_BAG", payload: [] });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("negocio", JSON.stringify(state.idNegocio));
    Cookie.set("negocio", JSON.stringify(state.idNegocio));
    localStorage.setItem("bag", JSON.stringify(state.bag));
    Cookie.set("bag", JSON.stringify(state.bag));
  }, [state.bag, state.idNegocio]);

  useEffect(() => {
    const numberOfProducts = state.bag.reduce(
      (acc, product) => acc + product.cantidad_orden,
      0
    );
    const total = state.bag.reduce((acc, product) => acc + product.monto, 0);
    const idNegocio = parseInt(state.idNegocio.toFixed());
    const orderSummary = {
      numberOfProducts,
      total,
      idNegocio,
    };
    dispatch({ type: "UPDATE_ORDER_SUMMARY", payload: orderSummary });
  }, [state.bag, state.idNegocio]);

  const addProductToBag = async (product: IProductoOrden) => {
    console.log(product.lote?.inventario.id_negocio, state.idNegocio);
    if (state.bag.length === 0) {
      dispatch({
        type: "SET_ID_NEGOCIO",
        payload: product.lote?.inventario.id_negocio!,
      });
    }

    const productInBag = state.bag.some(
      (item) => item.id_producto === product.id_producto
    );
    if (!productInBag) {
      return dispatch({
        type: "UPDATE_PRODUCTS_IN_BAG",
        payload: [...state.bag, product],
      });
    }

    const updatedBag = state.bag.map((item) => {
      if (item.id_producto !== product.id_producto) return item;
      item.cantidad_orden += product.cantidad_orden;
      item.monto += product.monto;
      return item;
    });
    dispatch({ type: "UPDATE_PRODUCTS_IN_BAG", payload: updatedBag });
  };

  const updateBagQuantity = (product: IProductoOrden) => {
    dispatch({ type: "CHANGE_BAG_QUANTITY", payload: product });
  };

  const removeBagProduct = async (product: IProductoOrden) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: product });
  };

  const clearBag = () => {
    dispatch({ type: "CLEAR_BAG", payload: [] });
  };

  const setIdNegocio = (idNegocio: number) => {
    dispatch({ type: "SET_ID_NEGOCIO", payload: idNegocio });
  };

  const createOrder = async (id_cliente: number, id_historial: number) => {
    const body: IOrden = {
      fecha_orden: new Date().toISOString(),
      hora_orden: new Date().toISOString(),
      monto_total: state.total,
      estado_orden: EstadoOrden.PENDIENTE,
      productoOrden: state.bag,
      id_cliente,
      id_historial,
      id_negocio: state.idNegocio,
    };

    const products = state.bag;

    try {
      const { data } = await hrApi.post("/cliente/order", { body, products });
      console.log(data);
      if (data.error) {
        return {
          hasError: true,
          message: data.message,
          data: {} as IOrden,
        };
      }
      dispatch({ type: "ORDER_COMPLETED" });
      return {
        hasError: false,
        message: "Orden creada con éxito",
        data: data as IOrden,
      };
    } catch (error) {
      console.log(error);
      return {
        hasError: true,
        message: "Error no controlado, hable con el administrador",
        data: {} as IOrden,
      };
    }
  };

  return (
    <BagContext.Provider
      value={{
        ...state,
        setIdNegocio,
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
