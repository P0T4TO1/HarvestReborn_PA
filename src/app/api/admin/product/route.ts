import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Category } from "@/interfaces";

async function createProduct(req: NextRequest, res: NextResponse) {
  const {
    nombre_producto = "",
    file = "",
    descripcion = "",
    enTemporada = false,
    categoria = "",
  } = (await new Response(req.body).json()) as {
    nombre_producto: string;
    file: string;
    descripcion: string;
    enTemporada: boolean;
    categoria: Category;
  };

  try {
    const product = await prisma.m_producto.create({
      data: {
        nombre_producto,
        imagen_producto: file,
        descripcion: descripcion || "",
        enTemporada,
        categoria: categoria.toUpperCase() as Category,
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log(error, "error al crear el producto");
    return NextResponse.json(
      { message: "Error al crear el producto" },
      { status: 500 }
    );
  }
}

async function updateProduct(req: NextRequest, res: NextResponse) {
  const {
    id = 0,
    nombre_producto = "",
    file = "",
    descripcion = "",
    enTemporada = false,
    categoria = "",
  } = (await new Response(req.body).json()) as {
    id: number;
    nombre_producto: string;
    file: string;
    descripcion: string;
    enTemporada: boolean;
    categoria: Category;
  };

  const product = await prisma.m_producto.update({
    where: {
      id_producto: id,
    },
    data: {
      nombre_producto,
      imagen_producto: file,
      descripcion: descripcion || "",
      enTemporada,
      categoria: categoria.toUpperCase() as Category,
    },
  });

  return NextResponse.json(product, { status: 200 });
}

async function deleteProduct(req: NextRequest, res: NextResponse) {
  const { id } = (await new Response(req.body).json()) as { id: string };

  if (!id) {
    return NextResponse.json(
      { message: "Falta Id del producto" },
      { status: 400 }
    );
  }

  try {
    const product = await prisma.m_producto.delete({
      where: {
        id_producto: parseInt(id, 10),
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log(error, "error al eliminar el producto");
    return NextResponse.json(
      { message: "Error al eliminar el producto" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  const products = await prisma.m_producto.findMany();

  return NextResponse.json(products, { status: 200 });
}

export { createProduct as POST, updateProduct as PUT, deleteProduct as DELETE };
