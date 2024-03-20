import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

async function getAllProducts(req: NextRequest, res: NextResponse) {
  const products = await prisma.m_producto.findMany();

  return NextResponse.json(products, { status: 200 });
}

export { getAllProducts as GET };
