"use client";

import React, { useState, useEffect, useContext } from "react";
import { IDuenoNegocio, IOrden } from "@/interfaces";
import { chatHrefConstructor } from "@/utils/cn";
import { hrApi } from "@/api";
import { FaCheckCircle } from "react-icons/fa";
import {
  Card,
  CardBody,
  Divider,
  CircularProgress,
  Chip,
  Image,
  Link,
  Button,
} from "@nextui-org/react";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/navigation";

type OrdersClienteProps = {
  id_orden: string;
  newOrder?: boolean;
  detailsNegocio?: boolean;
};

export const OrderDetails = ({
  id_orden,
  newOrder,
  detailsNegocio,
}: OrdersClienteProps) => {
  const [order, setOrder] = useState<IOrden>();
  const { user } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    hrApi.get(`/cliente/order/${id_orden}`).then((res) => {
      if (res.status === 200) {
        setOrder(res.data);
      }
    });
  }, [id_orden]);

  if (!order) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <CircularProgress size="lg" />
        {newOrder ? (
          <p>Cargando...</p>
        ) : detailsNegocio ? (
          <p>Cargando detalles...</p>
        ) : (
          <p>Cargando orden...</p>
        )}
      </div>
    );
  }

  const onContact = (
    id_user: string,
    id_dueneg?: string,
    id_cliente?: string,
    nombre_dueneg?: string,
    nombre_cliente?: string,
  ) => {
    hrApi
      .post(`/chat`, {
        userId: id_user,
        userId2: id_dueneg ?? id_cliente,
        chatName: `Chat con negocio ${nombre_dueneg ?? nombre_cliente}`,
      })
      .then((res) => {
        if (res.status === 201) {
          router.push(`/chats/chat/${chatHrefConstructor(id_user, id_dueneg! ?? id_cliente!)}`);
        }
      }).catch((err) => {
        if(err.response.status === 400) {
          console.log(err, err.response.data.message);
          router.push(`/chats/chat/${chatHrefConstructor(id_user, id_dueneg! ?? id_cliente!)}`);
        }
      });
  };

  return (
    <div className="pt-16 container mx-auto">
      <h2 className="text-2xl pb-6 font-bold sm:text-xl dark:text-gray-300 flex flex-col items-center justify-center">
        {newOrder && (
          <FaCheckCircle className="text-green-500 mb-6" size={40} />
        )}
        {newOrder
          ? "Tú orden ha sido enviada a los negocios"
          : "Detalles de orden"}
      </h2>
      {detailsNegocio ? (
        <Card className="p-6 max-w-5xl mx-auto mt-6 max-h-[600px]">
          <CardBody className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <h3 className="font-semibold">Detalles de la orden</h3>
              <div className="py-2 font-base max-w-72">
                <p>Orden: #{order.id_orden}</p>
                <p>
                  Fecha:{" "}
                  {new Date(order.fecha_orden).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <Divider className="my-4 max-w-72" />
              <h3 className="font-semibold">Información</h3>
              <div className="py-2 font-base max-w-72 flex flex-col gap-3">
                <p>
                  {newOrder
                    ? "Pronto un negocio se pondrá en contacto contigo"
                    : "Si tienes alguna duda, contacta al negocio, en caso de no recibir respuesta, contacta a soporte"}
                </p>
                <p className="flex gap-2 items-center">
                  Estado:
                  <Chip
                    variant="flat"
                    color={
                      order.estado_orden === "PENDIENTE" ? "warning" : "danger"
                    }
                  >
                    {order.estado_orden}
                  </Chip>
                </p>
              </div>
            </div>
            <div className="flex">
              <Divider orientation="vertical" className="px-1" />
              <div className="flex flex-col pl-6 w-full">
                <h3 className="font-semibold">Productos en la orden</h3>
                <div className="py-2 font-base">
                  {order.productoOrden?.map((product) => (
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
                            <p className="ml-2 text-gray-600 text-sm">
                              Negocio: {product.negocio?.nombre_negocio}
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
                          <Button
                            color="primary"
                            variant="light"
                            onClick={() =>
                              onContact(
                                user?.id!,
                                product.negocio?.dueneg.id_user!,
                                product.negocio?.dueneg.nombre_dueneg!
                              )
                            }
                          >
                            Contactar negocio por chat
                          </Button>
                        </div>
                      </div>
                      <Divider />
                    </>
                  ))}
                  <div className="pt-4">
                    <div className="flex justify-between">
                      <p className="text-sm font-semibold">Total:</p>
                      <p className="text-sm font-semibold">
                        ${order.monto_total} MXN
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ) : (
        <Card className="p-6 max-w-5xl mx-auto mt-6 max-h-[600px]">
          <CardBody className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <h3 className="font-semibold">Detalles de la orden</h3>
              <div className="py-2 font-base max-w-72">
                <p>Orden: #{order.id_orden}</p>
                <p>
                  Fecha:{" "}
                  {new Date(order.fecha_orden).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <Divider className="my-4 max-w-72" />
              <h3 className="font-semibold">Información</h3>
              <div className="py-2 font-base max-w-72 flex flex-col gap-3">
                <p>
                  {newOrder
                    ? "Pronto un negocio se pondrá en contacto contigo"
                    : "Si tienes alguna duda, contacta al negocio, en caso de no recibir respuesta, contacta a soporte"}
                </p>
                <p className="flex gap-2 items-center">
                  Estado:
                  <Chip
                    variant="flat"
                    color={
                      order.estado_orden === "PENDIENTE" ? "warning" : "danger"
                    }
                  >
                    {order.estado_orden}
                  </Chip>
                </p>
              </div>
            </div>
            <div className="flex">
              <Divider orientation="vertical" className="px-1" />
              <div className="flex flex-col pl-6 w-full">
                <h3 className="font-semibold">Productos en la orden</h3>
                <div className="py-2 font-base">
                  {order.productoOrden?.map((product) => (
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
                            <p className="ml-2 text-gray-600 text-sm">
                              Negocio: {product.negocio?.nombre_negocio}
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
                          <Button
                            color="primary"
                            variant="light"
                            onClick={() =>
                              onContact(
                                user?.id!,
                                product.negocio?.dueneg.id_user!,
                                product.negocio?.dueneg.nombre_dueneg!
                              )
                            }
                          >
                            Contactar negocio por chat
                          </Button>
                        </div>
                      </div>
                      <Divider />
                    </>
                  ))}
                  <div className="pt-4">
                    <div className="flex justify-between">
                      <p className="text-sm font-semibold">Total:</p>
                      <p className="text-sm font-semibold">
                        ${order.monto_total} MXN
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      <div className="w-full flex items-center justify-center">
        <Link href="/orders">
          <Button color="primary" variant="ghost" className="mt-6">
            {newOrder ? "Ver todas mis ordenes" : "Regresar"}
          </Button>
        </Link>
      </div>
    </div>
  );
};
