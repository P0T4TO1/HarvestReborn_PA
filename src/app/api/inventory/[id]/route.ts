import type { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function getProductByInventory(
  req: NextApiRequest,
  { params }: { params: { id: string } }
) {
  // const { searchParams } = new URL(req.url as string);
  // const inventory_id = searchParams.get("inventory_id");

  if (!params.id)
    return NextResponse.json(
      { message: "Falta Id del inventario" },
      { status: 400 }
    );

  const products = await prisma.products.findMany({
    where: {
      inventories: {
        some: {
          inventory_id: parseInt(params.id, 10),
        },
      },
    },
  });

  return NextResponse.json(products, { status: 200 });
}

export async function addProductToInventory(
  req: NextApiRequest,
  { params }: { params: { id: string } }
) {
  const { id, amount, expiration, arriveDate, inventory_id } =
    await new Response(req.body).json();
  console.log(req.body, id, amount, expiration, inventory_id, arriveDate);

  if (!params.id)
    return NextResponse.json(
      { message: "Falta Id del producto" },
      { status: 400 }
    );

  if (!id || !amount || !expiration || !inventory_id) {
    return NextResponse.json(
      { message: "Faltan datos del producto" },
      { status: 400 }
    );
  }

  try {
    const product = await prisma.products.update({
      where: {
        product_id: parseInt(id, 10),
      },
      data: {
        inventories: {
          connect: {
            inventory_id: parseInt(inventory_id, 10),
          },
        },
        amount: {
          create: {
            amount: parseInt(amount, 10),
          },
        },
        expiration: {
          create: {
            expiration: new Date(expiration),
          },
        },
        arrive: {
          create: {
            arrive: new Date(arriveDate),
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

export { getProductByInventory as GET, addProductToInventory as POST };
