import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

async function getAllProducts(req: NextRequest, res: NextResponse) {
  try {
    const products = await prisma.m_producto.findMany();

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error al buscar los productos" },
      { status: 500 }
    );
  }
}

export { getAllProducts as GET };
