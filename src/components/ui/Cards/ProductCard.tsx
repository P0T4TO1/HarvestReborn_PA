"use client";

import { FC, useState, ReactNode } from "react";
import { ILote, IProduct } from "@/interfaces";
import { Card, CardBody, Image, Button } from "@nextui-org/react";

interface Props {
  children?: ReactNode;
  lote?: ILote;
  product?: IProduct;
  route: string;
}

export const ProductCard: FC<Props> = ({ lote, product, children, route }) => {
  const [openCards, setOpenCards] = useState<boolean>(false);

  return (
    <>
      {route === "add-product" ? (
        <>
          <div className="product">
            <div className="left-side bg-[#87b663]">
              <img src={product?.imagen_producto} alt="" className="image" />
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
                {product?.nombre_producto}
              </h2>
              {product && (
                <div className="setting-icon-container">{children}</div>
              )}
            </div>
          </div>
        </>
      ) : route === "negocio-prods-cliente" ? (
        <Card>
          <CardBody className="overflow-visible p-0 grid grid-cols-2">
            <div>
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={lote?.producto.nombre_producto}
                className="w-full object-cover min-h-[140px]"
                src={lote?.producto?.imagen_producto}
              />
            </div>
            <div className="flex flex-col px-4 w-full">
              <h4 className="text-lg font-semibold mt-2">
                {lote?.producto.nombre_producto}
              </h4>
              <div className="flex flex-col">
                <p className="text-sm text-gray-500">
                  Quedan {lote?.cantidad_producto} kg
                </p>
                <p className="text-lg font-semibold text-green-800 mt-2">
                  ${lote?.precio_kg} el kg
                </p>
                <Button color="success" size="sm" className="mt-2">
                  Agregar a la órden
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      ) : null}
    </>
  );
};

export default ProductCard;
