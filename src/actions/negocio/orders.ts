"use server";

import prisma from "@/lib/prisma";
import { IOrden } from "@/interfaces";

export const getOrders = async (id_negocio: number) => {
  if (!id_negocio) return;

  try {
    const orders = (await prisma.d_orden.findMany({
      where: {
        id_negocio,
      },
      select: {
        id_orden: true,
        fecha_orden: true,
        hora_orden: true,
        monto_total: true,
        estado_orden: true,
        id_cliente: true,
        cliente: {
          select: {
            id_cliente: true,
            nombre_cliente: true,
          },
        },
        productoOrden: {
          select: {
            id_productoOrden: true,
            cantidad_orden: true,
            monto: true,
            id_orden: true,
            orden: true,
            id_producto: true,
            producto: true,
          },
        },
      },
    })) as unknown as IOrden[];
    return orders;
  } catch (error) {
    console.error(error);
    return;
  }
};
