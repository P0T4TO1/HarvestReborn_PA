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
      { message: "Falta nombre del negocio" },
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
          },
        },
      },
    },
  });
  return NextResponse.json(negocio, { status: 200 });
}

export { getNegocioById as GET };
