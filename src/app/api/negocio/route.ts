import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function getAllNegocios(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const negocios = await prisma.m_negocio.findMany({
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
  return NextResponse.json(negocios, { status: 200 });
}

export { getAllNegocios as GET };
