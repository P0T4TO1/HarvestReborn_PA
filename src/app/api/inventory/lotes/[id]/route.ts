import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

async function getAllLotesFromInventory(
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
    });

    return NextResponse.json(lotes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error al buscar el inventario" },
      { status: 500 }
    );
  }
}

export { getAllLotesFromInventory as GET };
