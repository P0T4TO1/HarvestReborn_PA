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
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";

export const OrdersCliente = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState<IOrden[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    hrApi.get(`/cliente/order/${user?.cliente?.id_cliente}`).then((res) => {
      if (res.status === 200) {
        setOrders(res.data);
      } else {
        setError(true);
      }
      setLoading(false);
    });
  }, [user?.cliente?.id_cliente]);
  console.log(orders);

  return (
    <div className="container mx-auto mt-20">
      <h1 className="font-bebas-neue uppercase text-4xl font-black flex flex-col leading-none text-green-900">
        Tus ordenes
        <span className="text-xl text-gray-900 font-semibold">
          Aquí puedes ver todas tus ordenes
        </span>
      </h1>

      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <CircularProgress size="lg" />
          <p>Cargando ordenes...</p>
        </div>
      ) : error ? (
        <p>Hubo un error al cargar las ordenes</p>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4">
            {orders.map((order) => (
              <Card key={order.id_orden}>
                <CardHeader>
                  <h2>Orden {order.id_orden}</h2>
                </CardHeader>
                <CardBody>
                  <p>Fecha: {order.fecha_orden}</p>
                  <p>Total: {order.monto_total}</p>
                  <p>Estado: {order.estado_orden}</p>
                  {order.productosOrden?.map((producto) => (
                    <div key={producto.id_producto}>
                      <p>{producto.producto?.nombre_producto}</p>
                      <p>{producto.cantidad_orden}</p>
                      <p>{producto.monto}</p>
                    </div>
                  ))}
                </CardBody>
                <CardFooter>
                  <button>Detalles</button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
