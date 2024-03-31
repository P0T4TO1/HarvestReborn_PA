import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

async function deleteOrdenProducto(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  const { id } = params;
  console.log("id", id);

  if (!id) {
    return NextResponse.json(
      { message: "El id de la orden es requerido" },
      { status: 400 }
    );
  }

  try {
    const ordenProducto = await prisma.m_prodcutoOrden.delete({
      where: {
        id_productoOrden: parseInt(id, 10),
      },
    });
    return NextResponse.json(ordenProducto, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error al eliminar la orden" },
      { status: 500 }
    );
  }
}

export { deleteOrdenProducto as DELETE };
