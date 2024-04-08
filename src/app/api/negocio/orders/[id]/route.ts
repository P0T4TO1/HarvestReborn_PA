import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

async function getOrdersByNegocio(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  if (!params.id)
    return NextResponse.json(
      { message: "Falta id del negocio" },
      { status: 400 }
    );
  try {
    const orders = await prisma.m_prodcutoOrden.findMany({
      where: {
        id_negocio: parseInt(params.id.toString()),
      },
      include: {
        negocio: true,
        producto: true,
        orden: {
          include: {
            cliente: {
              include: {
                user: {
                  select: {
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al encontrar ordenes" },
      { status: 500 }
    );
  }
}

export { getOrdersByNegocio as GET };
