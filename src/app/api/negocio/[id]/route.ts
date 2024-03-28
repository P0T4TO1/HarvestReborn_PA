import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

async function getNegocioById(
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

  const negocio = await prisma.m_negocio.findFirst({
    where: {
      id_negocio: parseInt(params.id.toString()),
    },
    include: {
      inventario: {
        include: {
          lote: {
            include: {
              producto: true,
            },
            distinct: ["id_producto"],
          },
        },
      },
      dueneg: {
        include: {
          user: true,
        },
      },
    },
  });
  return NextResponse.json(negocio, { status: 200 });
}

export { getNegocioById as GET };
