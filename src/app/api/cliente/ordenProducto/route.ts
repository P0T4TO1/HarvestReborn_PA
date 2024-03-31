import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Estado } from "@/interfaces";

interface Data {
  id_producto: number;
  cantidad_orden: number;
  monto: number;
  id_orden?: number;
  id_cliente?: number;
  id_historial?: number;
  id_negocio: string;
}

async function createOrdenProducto(req: NextRequest, res: NextResponse) {
  const {
    id_producto,
    cantidad_orden,
    monto,
    id_orden,
    id_negocio,
  } = (await new Response(req.body).json()) as Data;

  try {
    const ordenProducto = await prisma.m_prodcutoOrden.create({
      data: {
        cantidad_orden,
        monto,
        orden: {
          connectOrCreate: {
            where: {
              id_orden: id_orden ?? 0,
            },
            create: {
              fecha_orden: new Date(),
              hora_orden: new Date(),
              monto_total: monto,
              estado_orden: Estado.Pendiente,
            },
          },
        },
        producto: {
          connect: {
            id_producto,
          },
        },
        negocio: {
          connect: {
            id_negocio: parseInt(id_negocio, 10),
          },
        },
      },
    });

    return NextResponse.json(ordenProducto, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error al crear la orden" },
      { status: 500 }
    );
  }
}

async function getOrdenesProducto(req: NextRequest, res: NextResponse) {
  const { id_cliente } = (await new Response(req.body).json()) as {
    id_cliente: number;
  };
  const ordenesProducto = await prisma.m_prodcutoOrden.findMany({
    where: {
      orden: {
        id_cliente,
      },
    },
  });

  return NextResponse.json(ordenesProducto, { status: 200 });
}

async function updateOrdenProducto(req: NextRequest, res: NextResponse) {
  const {
    id_producto,
    cantidad_orden,
    monto,
    id_orden,
    id_cliente,
    id_historial,
    id_negocio,
  } = (await new Response(req.body).json()) as Data;

  if (!id_orden) {
    return NextResponse.json(
      { message: "El id de la orden es requerido" },
      { status: 400 }
    );
  }

  try {
    const ordenProducto = await prisma.m_prodcutoOrden.update({
      where: {
        id_productoOrden: id_orden,
      },
      data: {
        cantidad_orden,
        monto,
        orden: {
          connectOrCreate: {
            where: {
              id_orden,
            },
            create: {
              fecha_orden: new Date(),
              hora_orden: new Date(),
              monto_total: monto,
              historial: {
                connect: {
                  id_historial,
                },
              },
              estado_orden: Estado.Pendiente,
              cliente: {
                connect: {
                  id_cliente,
                },
              },
            },
          },
        },
        producto: {
          connect: {
            id_producto,
          },
        },
        negocio: {
          connect: {
            id_negocio: parseInt(id_negocio, 10),
          },
        },
      },
    });

    return NextResponse.json(ordenProducto, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error al actualizar la orden" },
      { status: 500 }
    );
  }
}

export {
  createOrdenProducto as POST,
  updateOrdenProducto as PUT,
  getOrdenesProducto as GET,
};
