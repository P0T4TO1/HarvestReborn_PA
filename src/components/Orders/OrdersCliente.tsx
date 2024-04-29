"use client";

import React, { useState, useContext, useEffect } from "react";
import { IOrden } from "@/interfaces";
import { hrApi } from "@/api";
import { AuthContext } from "@/context/auth";
import {
  CircularProgress,
  Card,
  CardFooter,
  CardBody,
  CardHeader,
  Link,
  Button,
  Chip,
  Divider,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { AsideAccount } from "@/components";

export const OrdersCliente = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState<IOrden[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.cliente?.id_cliente) return;
    hrApi
      .get(`/cliente/orders/${user?.cliente?.id_cliente}`)
      .then((res) => {
        if (res.status === 200) {
          setOrders(res.data);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [user?.cliente?.id_cliente, setOrders]);

  return (
    <section className="w-full flex flex-col gap-5 container pt-16 md:flex-row text-[#161931] min-h-screen">
      <AsideAccount />
      <div className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <div className="w-full pb-8 mt-8 sm:rounded-lg">
            <h2 className="text-2xl font-bold sm:text-xl dark:text-gray-300">
              Mis ordenes
            </h2>
            {loading ? (
              <div className="flex flex-col items-center justify-center">
                <CircularProgress size="lg" />
                <p className="dark:text-gray-300 text-gray-800">
                  Cargando ordenes...
                </p>
              </div>
            ) : error ? (
              <p>Hubo un error al cargar las ordenes</p>
            ) : (
              <>
                {!orders ? (
                  <Card className="mt-12">
                    <CardHeader>No tienes ordenes</CardHeader>
                    <CardBody>
                      <p>
                        Aún no has realizado ninguna orden, ¿qué esperas para
                        realizar una?
                      </p>
                      <p className="mt-2">
                        Si ya ha realizado una orden y no aparece aquí, por
                        favor refresque la página. Estamos trabajando para
                        solucionar este problema.
                      </p>
                    </CardBody>
                    <CardFooter>
                      <Link href={"/negocios"}>
                        <Button>Ver negocios</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ) : (
                  <div className="mt-6">
                    {orders.map((order) => (
                      <Card key={order.id_orden} className="p-4 mt-6">
                        <CardHeader className="flex justify-between">
                          <div className="flex items-center justify-center">
                            <Chip variant="flat" size="lg">
                              Orden:{" "}
                              <span className="text-blue-600">
                                #{order.id_orden}
                              </span>
                            </Chip>
                            <p className="ml-2 hidden lg:block">
                              Fecha:{" "}
                              {new Date(order.fecha_orden).toLocaleDateString(
                                "es-ES",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </div>
                          <div className="flex items-center justify-center">
                            <Link href={`/orders/${order.id_orden}`}>
                              <Button color="success" variant="ghost">
                                Ver orden
                              </Button>
                            </Link>
                            <Button
                              color={
                                order.estado_orden === "FINALIZADO"
                                  ? "default"
                                  : "danger"
                              }
                              size="md"
                              disabled={order.estado_orden === "FINALIZADO"}
                              className="ml-2 hidden md:block"
                            >
                              {order.estado_orden === "FINALIZADO"
                                ? "Finalizado"
                                : "Cancelar orden"}
                            </Button>
                          </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                          <p className="block lg:hidden">
                            Fecha:{" "}
                            {new Date(order.fecha_orden).toLocaleDateString(
                              "es-ES",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                          <p>
                            Total:{" "}
                            <span className="text-blue-600">
                              ${order.monto_total} MXN
                            </span>
                          </p>
                          <Accordion>
                            <AccordionItem
                              title="Productos"
                              subtitle="Ver productos de la orden"
                            >
                              <div className="flex flex-col gap-2">
                                {order.productoOrden?.map((producto) => (
                                  <div
                                    key={producto.id_producto}
                                    className="flex items-center justify-between"
                                  >
                                    <p>{producto.producto?.nombre_producto}</p>
                                    <p>
                                      ${producto.monto} MXN x{" "}
                                      {producto.cantidad_orden} kg
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </AccordionItem>
                          </Accordion>
                        </CardBody>
                        <Divider />
                        <CardFooter className="flex justify-between">
                          <Chip
                            variant="flat"
                            color={
                              order.estado_orden === "FINALIZADO"
                                ? "success"
                                : "warning"
                            }
                          >
                            {order.estado_orden}
                          </Chip>
                          <Button
                            color={
                              order.estado_orden === "FINALIZADO"
                                ? "default"
                                : "danger"
                            }
                            size="md"
                            disabled={order.estado_orden === "FINALIZADO"}
                            className="ml-2 md:hidden block"
                          >
                            {order.estado_orden === "FINALIZADO"
                              ? "Finalizado"
                              : "Cancelar orden"}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
