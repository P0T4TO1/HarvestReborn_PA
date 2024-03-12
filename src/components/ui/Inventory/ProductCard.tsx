"use client";

import { FC, useState, ReactNode } from "react";
import { ILote, IProduct } from "@/interfaces";

interface Props {
  children: ReactNode;
  lote?: ILote;
  product?: IProduct;
  route: string;
}

export const ProductCard: FC<Props> = ({ lote, product, children, route }) => {
  const [openCards, setOpenCards] = useState<boolean>(false);

  return (
    <>
      <div className="product">
        <div className="left-side bg-[#87b663]">
          <img
            src={
              route === "add-product"
                ? product?.imagen_producto
                : lote?.producto.imagen_producto
            }
            alt=""
            className="image"
          />
        </div>
        <div
          className={`setting-modal-container ${
            openCards ? "show-setting-modal" : ""
          }`}
        >
          {children}
        </div>

        <div className="right-side flex flex-col">
          <h2 className="name text-md font-semibold text-center text-gray-700">
            {route === "add-product"
              ? product?.nombre_producto
              : lote?.producto.nombre_producto}
          </h2>
          {route === "product-list" ? (
            <>
              <div className="flex flex-col items-center">
                <p className="text-center text-gray-700">Quedan </p>
                <span className="font-bold">{lote?.cantidad_producto} kg</span>
                <p className="text-center text-gray-700">Llegó el</p>
                <span className="font-semibold">
                  {lote?.fecha_entrada
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("/")
                    .slice(0, 5)}
                </span>
              </div>
              <div className="setting-icon-container">
                <button onClick={() => setOpenCards(!openCards)}>
                  <span className="material-symbols-outlined setting-icon">
                    settings
                  </span>
                </button>
              </div>
            </>
          ) : route === "add-product" ? (
            product && <div className="setting-icon-container">{children}</div>
          ) : route === "negocio-info" ? (
            <>
              <div className="flex flex-col items-center">
                <p className="text-center text-gray-700">Quedan </p>
                <span className="font-bold">{lote?.cantidad_producto} kg</span>
                <span className="text-xl font-bold text-emerald-600">
                  ${lote?.precio_kg} kg
                </span>
              </div>
              <div className="setting-icon-container">
                <button onClick={() => setOpenCards(!openCards)}>
                  <span className="material-symbols-outlined setting-icon">
                    add_circle
                  </span>
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
