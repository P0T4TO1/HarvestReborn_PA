import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

async function getLoteById(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  if (!params.id) {
    return NextResponse.json({ message: "Falta Id del lote" }, { status: 400 });
  }

  const lote = await prisma.m_lote.findUnique({
    where: {
      id_lote: parseInt(params.id as string, 10),
    },
    include: {
      producto: true,
    },
  });

  return NextResponse.json(lote, { status: 200 });
}

async function updateLote(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  const body = await request.json();
  const {
    cantidad_producto,
    fecha_entrada,
    fecha_vencimiento,
    precio_kg,
    monto_total,
  } = body;

  try {
    if (!params.id) {
      return NextResponse.json(
        { message: "Falta Id del lote" },
        { status: 400 }
      );
    }

    const lote = await prisma.m_lote.update({
      where: {
        id_lote: parseInt(params.id as string, 10),
      },
      data: {
        cantidad_producto: parseInt(cantidad_producto, 10),
        fecha_entrada: new Date(fecha_entrada).toISOString(),
        fecha_vencimiento: new Date(fecha_vencimiento).toISOString(),
        precio_kg: parseFloat(precio_kg),
        monto_total: parseFloat(monto_total) * parseFloat(precio_kg),
      },
    });

    return NextResponse.json(lote, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error al actualizar lote" },
      { status: 500 }
    );
  }
}

export { getLoteById as GET, updateLote as PUT };
