"use client";

import React, { useContext } from "react";
import { BagContext } from "@/context/order";
import { IProductoOrden } from "@/interfaces";
import {
  Divider,
  Image,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Input,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { DANGER_TOAST, SUCCESS_TOAST } from "@/components";

interface BagListProps {
  editable?: boolean;
  products?: IProductoOrden[];
}

export const BagList = ({ editable = false, products }: BagListProps) => {
  const {
    bag,
    clearBag,
    removeBagProduct,
    updateBagQuantity,
    numberOfProducts,
    createOrder,
    total,
  } = useContext(BagContext);
  const { data: Session } = useSession();

  const onNewQuantity = (product: IProductoOrden, quantity: number) => {
    updateBagQuantity({ ...product, cantidad_orden: quantity });
  };

  const productsInBag = products ? products : bag;

  const onCreateOrder = () => {
    if (!Session) {
      return toast("Debes iniciar sesión para realizar un pedido");
    }
    createOrder().then((res) => {
      if (res.hasError) {
        toast(res.message, DANGER_TOAST);
      }
      toast(res.message, SUCCESS_TOAST);
    });
  };

  return (
    <>
      <div className="pt-20 lg:px-48 md:px-20 sm:px-12">
        <div className="flex justify-between">
          <h1 className="font-bebas-neue uppercase text-4xl font-black flex flex-col leading-none text-green-900">
            Bolsa de compras
          </h1>
          <Button
            onClick={clearBag}
            color="danger"
            startContent={
              <span className="material-symbols-outlined">delete_sweep</span>
            }
          >
            Limpiar bolsa
          </Button>
        </div>
        <div className="mt-6 grid grid-cols-3">
          <div className="col-span-2 pr-6">
            {productsInBag.map((product) => (
              <div key={product.id_productoOrden} className="w-full">
                <Divider />
                <div className="grid grid-cols-4 py-4">
                  <div>
                    <Image
                      src={product.producto?.imagen_producto}
                      alt={product.producto?.nombre_producto}
                      width="100"
                      height="100"
                    />
                  </div>
                  <div className="flex flex-col items justify-center">
                    <p>{product.producto?.nombre_producto}</p>
                    <p>${product.monto}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    {editable && (
                      <>
                        <Button
                          isIconOnly
                          onClick={() =>
                            onNewQuantity(product, product.cantidad_orden - 1)
                          }
                          variant="light"
                          size="sm"
                        >
                          <span className="material-symbols-outlined">
                            add_circle
                          </span>
                        </Button>
                        <Input
                          className="w-12"
                          type="number"
                          size="sm"
                          isDisabled
                          defaultValue={product.cantidad_orden.toString()}
                        />
                        <Button
                          isIconOnly
                          onClick={() =>
                            onNewQuantity(product, product.cantidad_orden + 1)
                          }
                          variant="light"
                          size="sm"
                        >
                          <span className="material-symbols-outlined">
                            do_not_disturb_on
                          </span>
                        </Button>
                      </>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <Button
                      isIconOnly
                      onClick={() => removeBagProduct(product)}
                      color="danger"
                      variant="light"
                      size="sm"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </Button>
                  </div>
                </div>
                <Divider />
              </div>
            ))}
          </div>
          <div className="col-span-1">
            <Card
              classNames={{
                base: "border-1 border-gray-300",
              }}
            >
              <CardHeader className="py-8 px-8">
                <h3 className="text-2xl font-semibold">Resumen de pedido</h3>
              </CardHeader>
              <CardBody className="pt-2 px-8 pb-2">
                <p className="pb-4">Productos: {numberOfProducts}</p>
                <Divider />
                <p className="pb-4 pt-4">Total: ${total}</p>
              </CardBody>
              <CardFooter className="p-8 w-full">
                <Button
                  color="success"
                  className="w-full"
                  onClick={() => onCreateOrder()}
                >
                  Realizar pedido
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
