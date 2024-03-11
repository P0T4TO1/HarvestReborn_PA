import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function getProductById(
  req: NextApiRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(req.url as string);
  const id = searchParams.get("id");

  if (!params.id) {
    return NextResponse.json(
      { message: "Falta Id del producto" },
      { status: 400 }
    );
  }

  const product = await prisma.m_producto.findUnique({
    where: {
      id_producto: parseInt(params.id as string, 10),
    },
  });

  return NextResponse.json(product, { status: 200 });
}

export { getProductById as GET };