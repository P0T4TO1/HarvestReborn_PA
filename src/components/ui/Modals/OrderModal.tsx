"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
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
  Divider,
} from "@nextui-org/react";
import { AuthContext } from "@/context/auth";
import { hrApi } from "@/api";
import { chatHrefConstructor } from "@/utils/cn";
import { toast } from "sonner";
import { DANGER_TOAST } from "@/components";
import * as PusherPushNotifications from "@pusher/push-notifications-web";

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
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onContact = async (
    id_user: string,
    id_cliente: string,
    nombre_cliente: string
  ) => {
    setIsLoading(true);
    await hrApi
      .post(`/chat`, {
        userId: id_user,
        userId2: id_cliente,
        chatName: `Chat con negocio ${nombre_cliente}`,
        chatId: chatHrefConstructor(id_user, id_cliente),
      })
      .then(async (res) => {
        if (res.status === 200 && res.data.message === "El chat ya existe") {
          const beamsTokenProviderUser =
            new PusherPushNotifications.TokenProvider({
              url: `${process.env.NEXT_PUBLIC_API_URL}/notifications/token/${id_user}`,
              headers: {
                Authorization: `Bearer ${id_user}`,
              },
            });

          const beamsTokenProviderCliente =
            new PusherPushNotifications.TokenProvider({
              url: `${process.env.NEXT_PUBLIC_API_URL}/notifications/token/${id_cliente}`,
              headers: {
                Authorization: `Bearer ${id_cliente}`,
              },
            });
          const beamsClient = new PusherPushNotifications.Client({
            instanceId: process.env
              .NEXT_PUBLIC_PUSHER_BEAMS_INSTANCE_ID as string,
          });

          await beamsClient.start();
          await beamsClient.setDeviceInterests([`chat-${id_user}-${id_cliente}`]);
          await beamsClient.addDeviceInterest(`chat-${id_user}-${id_cliente}`);
          await beamsClient.setUserId(id_user, beamsTokenProviderUser);
          await beamsClient.setUserId(id_cliente, beamsTokenProviderCliente);

          router.push(
            `/chats/chat/${chatHrefConstructor(id_user, id_cliente)}`
          );
        }
        if (res.status === 201) {
          router.push(
            `/chats/chat/${chatHrefConstructor(id_user, id_cliente)}`
          );
        }
      })
      .catch((err) => {
        console.log(err);
        toast("Error al intentar contactar al cliente", DANGER_TOAST);
        setIsLoading(false);
      });
  };

  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size="lg">
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
                <ModalBody className="max-h-[460px] overflow-y-scroll">
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
                  <Button
                    variant="ghost"
                    color="primary"
                    isLoading={isLoading}
                    onClick={() =>
                      onContact(
                        user?.id!,
                        order?.cliente?.id_user!,
                        order?.cliente?.nombre_cliente!
                      )
                    }
                  >
                    Contactar al cliente por chat
                  </Button>
                  <Button
                    onClick={onClose}
                    disabled={loading}
                    isLoading={isLoading}
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
