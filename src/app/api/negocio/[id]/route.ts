import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function getNegocioById(
  req: NextApiRequest,
  { params }: { params: { id: number } }
) {
  if (!params.id)
    return NextResponse.json(
      { message: "Falta nombre del negocio" },
      { status: 400 }
    );

  const negocio = await prisma.m_negocio.findFirst({
    where: {
      id_negocio: parseInt((params.id).toString()),
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
