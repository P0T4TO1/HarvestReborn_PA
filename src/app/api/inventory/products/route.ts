import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function getAllProducts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const products = await prisma.m_producto.findMany();

  return NextResponse.json(products, { status: 200 });
}

export async function createProduct(req: NextApiRequest, res: NextApiResponse) {
  const {
    name,
    amount,
    arriveDate,
    expiration,
    isSeasonal,
    imageURL,
    inventory_id,
  } = await new Response(req.body).json();

  if (
    !name ||
    !amount ||
    !arriveDate ||
    !expiration ||
    !isSeasonal ||
    !inventory_id
  ) {
    return NextResponse.json(
      { message: "Faltan datos del producto" },
      { status: 400 }
    );
  }

  const product = await prisma.products.create({
    data: {
      product_name: name,
      product_isSeason: isSeasonal,
      product_image: imageURL,
      amount: {
        create: {
          amount: amount,
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
}

export async function updateProduct(req: NextApiRequest, res: NextApiResponse) {
  const { id, name, amount, arriveDate, expiration, isSeasonal } =
    await new Response(req.body).json();

  if (!id || !name || !amount || !arriveDate || !expiration || !isSeasonal) {
    return NextResponse.json(
      { message: "Faltan datos del producto" },
      { status: 400 }
    );
  }

  const product = await prisma.products.update({
    where: {
      product_id: parseInt(id, 10),
    },
    data: {
      product_name: name,
      product_isSeason: isSeasonal,
    },
  });

  return NextResponse.json(product, { status: 200 });
}

export async function deleteProduct(req: NextApiRequest, res: NextApiResponse) {
  const { id } = await new Response(req.body).json();

  if (!id) {
    return NextResponse.json(
      { message: "Falta Id del producto" },
      { status: 400 }
    );
  }

  const product = await prisma.products.delete({
    where: {
      product_id: parseInt(id, 10),
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
