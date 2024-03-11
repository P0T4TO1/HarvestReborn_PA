import type { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import nextFontLocalFontLoader from "next/dist/compiled/@next/font/dist/local/loader";

export async function getInventoryById(
  req: NextApiRequest,
  { params }: { params: { id: string } }
) {
  if (!params.id)
    return NextResponse.json(
      { message: "Falta Id del inventario" },
      { status: 400 }
    );

  const products = await prisma.m_lote.findMany({
    where: {
      inventario: {
        id_inventario: parseInt(params.id, 10),
      },
    },
    include: {
      producto: true,
    },
  });

  return NextResponse.json(products, { status: 200 });
}

export async function addProductToInventory(
  req: NextApiRequest,
  { params }: { params: { id: string } }
) {
  const {
    id,
    cantidad_producto,
    fecha_entrada,
    fecha_vencimiento,
    precio_kg,
    monto_total,
    inventory_id,
  } = await new Response(req.body).json();

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
        fecha_entrada: new Date(fecha_vencimiento).toISOString(),
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

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error al agregar producto al inventario" },
      { status: 500 }
    );
  }
}

export async function deleteProductFromInventory(
  req: NextApiRequest,
  { params }: { params: { id: string } }
) {
  if (!params.id)
    return NextResponse.json(
      { message: "Falta Id del producto" },
      { status: 400 }
    );

  try {
    const product = await prisma.m_lote.delete({
      where: {
        id_lote: parseInt(params.id, 10),
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error al borrar producto del inventario" },
      { status: 500 }
    );
  }
}

export {
  getInventoryById as GET,
  addProductToInventory as POST,
  deleteProductFromInventory as DELETE,
};
