import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function getOrdersById(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  if (!params.id)
    return NextResponse.json(
      { message: "Falta id del cliente" },
      { status: 400 }
    );
  try {
    const orders = await prisma.d_orden.findMany({
      where: {
        id_cliente: parseInt(params.id, 10),
      },
      include: {
        productoOrden: {
          include: {
            producto: true,
          },
        },
      },
    });
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: true, message: "Error al obtener las ordenes" },
      { status: 500 }
    );
  }
}

export { getOrdersById as GET };
