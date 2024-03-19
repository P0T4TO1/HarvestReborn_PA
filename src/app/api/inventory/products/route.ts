import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

async function getAllProducts(req: NextRequest, res: NextResponse) {
  const products = await prisma.m_producto.findMany();

  return NextResponse.json(products, { status: 200 });
}

async function createProduct(req: NextRequest, res: NextResponse) {
  const { nombre_producto, imagen_producto, descripcion, enTemporada, categoria } =
    await new Response(req.body).json();

  if (!nombre_producto || !imagen_producto || !enTemporada || !categoria) {
    return NextResponse.json(
      { message: "Faltan datos del producto" },
      { status: 400 }
    );
  }

  const product = await prisma.m_producto.create({
    data: {
      nombre_producto,
      imagen_producto,
      descripcion: descripcion || "",
      enTemporada,
      categoria,
    },
  });

  return NextResponse.json(product, { status: 200 });
}

async function updateProduct(req: NextRequest, res: NextResponse) {
  const { id, name, amount, arriveDate, expiration, isSeasonal } =
    await new Response(req.body).json();

  if (!id || !name || !amount || !arriveDate || !expiration || !isSeasonal) {
    return NextResponse.json(
      { message: "Faltan datos del producto" },
      { status: 400 }
    );
  }

  const product = await prisma.m_producto.update({
    where: {
      id_producto: parseInt(id, 10),
    },
    data: {
      nombre_producto: name,
      enTemporada: isSeasonal,
    },
  });

  return NextResponse.json(product, { status: 200 });
}

async function deleteProduct(req: NextRequest, res: NextResponse) {
  const { id } = await new Response(req.body).json();

  if (!id) {
    return NextResponse.json(
      { message: "Falta Id del producto" },
      { status: 400 }
    );
  }

  const product = await prisma.m_producto.delete({
    where: {
      id_producto: parseInt(id, 10),
    },
  });

  return NextResponse.json(product, { status: 200 });
}

export {
  getAllProducts as GET,
  createProduct as POST,
  deleteProduct as DELETE,
  updateProduct as PUT,
};
