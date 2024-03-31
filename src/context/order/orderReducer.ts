import { IProductoOrden } from "@/interfaces";
import { BagState } from "./";

type BagAction =
  | {
      type: "LOAD_BAG";
      payload: IProductoOrden[];
    }
  | { type: "UPDATE_PRODUCTS_IN_BAG"; payload: IProductoOrden[] }
  | { type: "CHANGE_BAG_QUANTITY"; payload: IProductoOrden }
  | { type: "REMOVE_PRODUCT"; payload: IProductoOrden }
  | { type: "CLEAR_BAG"; payload: IProductoOrden[] }
  | {
      type: "UPDATE_ORDER_SUMMARY";
      payload: {
        numberOfProducts: number;
        total: number;
      };
    }
  | { type: "ORDER_COMPLETED" };

export const bagReducer = (state: BagState, action: BagAction): BagState => {
  switch (action.type) {
    case "LOAD_BAG":
      return {
        ...state,
        isLoaded: true,
        bag: [...action.payload, ...state.bag],
      };
    case "UPDATE_PRODUCTS_IN_BAG":
      return {
        ...state,
        bag: [...action.payload, ...state.bag],
      };
    case "CHANGE_BAG_QUANTITY":
      return {
        ...state,
        bag: state.bag.map((product) => {
          if (product.id_productoOrden !== action.payload.id_productoOrden)
            return product;
          return action.payload;
        }),
      };
    case "REMOVE_PRODUCT":
      return {
        ...state,
        bag: state.bag.filter(
          (product) =>
            !(product.id_productoOrden === action.payload.id_productoOrden)
        ),
      };
    case "UPDATE_ORDER_SUMMARY":
      return {
        ...state,
        ...action.payload,
      };
    case "CLEAR_BAG":
      return {
        ...state,
        bag: action.payload,
        numberOfProducts: 0,
        total: 0,
      };
    case "ORDER_COMPLETED":
      return {
        ...state,
        bag: [],
        numberOfProducts: 0,
        total: 0,
      };
    default:
      return state;
  }
};
