import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

async function getLotesFromInventory(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  try {
    if (!params.id)
      return NextResponse.json(
        { message: "Falta Id del inventario" },
        { status: 400 }
      );

    const lotes = await prisma.m_lote.findMany({
      where: {
        inventario: {
          id_inventario: parseInt(params.id, 10),
        },
      },
      include: {
        producto: true,
      },
      distinct: ["id_producto"],
    });

    return NextResponse.json(lotes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error al buscar el inventario" },
      { status: 500 }
    );
  }
}

async function addProductToInventory(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  const body = await request.json();
  const {
    id,
    cantidad_producto,
    fecha_entrada,
    fecha_vencimiento,
    precio_kg,
    monto_total,
    inventory_id,
  } = body;

  if (!params.id)
    return NextResponse.json(
      { message: "Falta Id del producto" },
      { status: 400 }
    );

  if (
    !id ||
    !cantidad_producto ||
    !fecha_entrada ||
    !fecha_vencimiento ||
    !precio_kg ||
    !monto_total ||
    !inventory_id
  ) {
    return NextResponse.json(
      { message: "Faltan datos del producto" },
      { status: 400 }
    );
  }

  try {
    const product = await prisma.m_lote.create({
      data: {
        cantidad_producto: parseInt(cantidad_producto, 10),
        fecha_entrada: new Date(fecha_entrada).toISOString(),
        fecha_vencimiento: new Date(fecha_vencimiento).toISOString(),
        precio_kg: parseFloat(precio_kg),
        monto_total: parseFloat(monto_total),
        inventario: {
          connect: {
            id_inventario: inventory_id,
          },
        },
        producto: {
          connect: {
            id_producto: id,
          },
        },
      },
    });

    return NextResponse.json(product, { status: 200 }) as any;
  } catch (error) {
    return NextResponse.json(
      { message: "Error al agregar producto al inventario" },
      { status: 500 }
    );
  }
}

async function deleteProductFromInventory(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  if (!params.id)
    return NextResponse.json(
      { message: "Falta Id del producto" },
      { status: 400 }
    ) as any;

  try {
    const product = await prisma.m_lote.delete({
      where: {
        id_lote: parseInt(params.id, 10),
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error al borrar producto del inventario" },
      { status: 500 }
    );
  }
}

export {
  getLotesFromInventory as GET,
  addProductToInventory as POST,
  deleteProductFromInventory as DELETE,
};
