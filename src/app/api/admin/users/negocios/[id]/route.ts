import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function getNegocioByIDAdmin(
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
      id_negocio: parseInt(params.id, 10),
    },
    include: {
      dueneg: {
        include: {
          user: true,
        },
      },
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

export { getNegocioByIDAdmin as GET };
