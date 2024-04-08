"use client";

import React from "react";
import { IOrden, IProductoOrden } from "@/interfaces";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  Button,
  Image,
  CircularProgress,
  Link,
  Divider,
} from "@nextui-org/react";

interface Props {
  useDisclosure: { isOpen: boolean; onClose: () => void };
  order: IOrden;
  products: IProductoOrden[];
  loading: boolean;
}

export const OrderModal = ({
  useDisclosure: { isOpen, onClose },
  order,
  products,
  loading,
}: Props) => {
  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            {loading ? (
              <ModalBody>
                <div className="flex justify-center items-center">
                  <CircularProgress />
                </div>
              </ModalBody>
            ) : (
              <>
                <ModalHeader>
                  <h2 className="text-lg font-semibold">
                    Orden: #{order?.id_orden}
                  </h2>
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">Productos</h3>
                    <div className="flex flex-col">
                      {products.map((product, index) => (
                        <>
                          <div
                            key={product.id_producto}
                            className="flex justify-between py-4"
                          >
                            <div className="flex">
                              <Image
                                src={product.producto?.imagen_producto}
                                alt={product.producto?.nombre_producto}
                                classNames={{
                                  wrapper:
                                    "min-w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center",
                                  img: "max-h-20 bg-transparent",
                                }}
                              />
                              <div className="flex flex-col justify-between w-full pl-2">
                                <p className="ml-2">
                                  {product.producto?.nombre_producto}
                                </p>
                                <p className="ml-2 text-gray-600">
                                  x{product.cantidad_orden} kg
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col justify-between">
                              <p className="text-sm font-semibold text-end">
                                ${product.monto} MXN
                              </p>
                            </div>
                          </div>
                          <Divider />
                        </>
                      ))}
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Link
                    href={`/chats/chat/${order?.id_cliente}`}
                    color="primary"
                  >
                    <Button variant="ghost" color="primary">
                      Contactar al cliente
                    </Button>
                  </Link>
                  <Button
                    onClick={onClose}
                    disabled={loading}
                    className="ml-2"
                    color="danger"
                  >
                    Cerrar
                  </Button>
                </ModalFooter>
              </>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
