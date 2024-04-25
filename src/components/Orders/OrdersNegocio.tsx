"use client";

import React, { useState, useContext, useEffect } from "react";
import { IOrden } from "@/interfaces";
import { hrApi } from "@/api";
import { AuthContext } from "@/context/auth";
import { OrdersTable } from "@/components";
import {
  CircularProgress,
  Card,
  CardFooter,
  CardBody,
  CardHeader,
  Link,
  Button,
} from "@nextui-org/react";

export const OrdersNegocio = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState<IOrden[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.duenonegocio?.negocio?.id_negocio) return;
    hrApi
      .get(`/negocio/orders/${user?.duenonegocio?.negocio?.id_negocio}`)
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
  }, [user?.duenonegocio?.negocio?.id_negocio, orders]);

  return (
    <div className="pt-12 container mx-auto min-h-screen">
      <div className="p-4 flex flex-col gap-4">
        <h1 className="text-2xl font-black flex flex-col leading-none dark:text-green-600 text-green-900">
          Pedidos
        </h1>
      </div>

      {loading ? (
        <div className="flex flex-col mt-12">
          <CircularProgress size="lg" />
          <p className="dark:text-gray-300">Cargando pedidos...</p>
        </div>
      ) : error ? (
        <p>Hubo un error al cargar los pedidos</p>
      ) : (
        <>
          {orders.length === 0 ? (
            <Card className="mt-12">
              <CardHeader>No tienes pedidos</CardHeader>
              <CardBody>
                <p>
                  No tienes pedidos registrados, si tienes dudas puedes
                  contactar a soporte
                </p>
              </CardBody>
              <CardFooter>
                <Link href="/contacto">
                  <Button color="primary" size="sm">
                    Contactar soporte
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ) : (
            <OrdersTable orders={orders} />
          )}
        </>
      )}
    </div>
  );
};
