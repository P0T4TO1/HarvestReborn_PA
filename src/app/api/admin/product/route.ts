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
    if (!nombre_producto || !file || !categoria) {
      return NextResponse.json(
        { message: "Faltan datos del producto" },
        { status: 400 }
      );
    }

    // const productExists = await prisma.m_producto.findFirst({
    //   where: {
    //     nombre_producto,
    //   },
    // });
    //
    // if (productExists) {
    //   return NextResponse.json(
    //     { message: "Este producto ya esta registrado" },
    //     { status: 401 }
    //   );
    // }

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
    imagen_producto = "",
    descripcion = "",
    enTemporada = false,
    categoria = "",
  } = (await new Response(req.body).json()) as {
    id: number;
    nombre_producto: string;
    imagen_producto: string;
    descripcion: string;
    enTemporada: boolean;
    categoria: Category;
  };

  if (!nombre_producto || !imagen_producto || !categoria) {
    return NextResponse.json(
      { message: "Faltan datos del producto" },
      { status: 400 }
    );
  }

  const product = await prisma.m_producto.update({
    where: {
      id_producto: id,
    },
    data: {
      nombre_producto,
      imagen_producto,
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

export { createProduct as POST, updateProduct as PUT, deleteProduct as DELETE };
