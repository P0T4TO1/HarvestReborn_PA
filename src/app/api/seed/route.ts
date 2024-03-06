import type { NextApiResponse, NextApiRequest } from "next";
import prisma from "@/lib/prisma";
import { seedDatabase } from "@/lib/utils";
import { NextResponse } from "next/server";

type Data = {
  message: string;
};

export async function initialData(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({ message: "No tiene acceso a este API" });
  }
  await prisma.user.deleteMany();
  await prisma.userStatus.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.business.deleteMany();
  await prisma.donation.deleteMany();
  await prisma.inventory.deleteMany();
  await prisma.products.deleteMany();
  await prisma.role.deleteMany();
  await prisma.amount.deleteMany();
  await prisma.arrive.deleteMany();
  await prisma.expiration.deleteMany();

  console.log("Database cleared");

  await prisma.role.createMany({
    data: [
      {
        role_id: 1,
        role_name: "admin",
      },
      {
        role_id: 2,
        role_name: "business",
      },
      {
        role_id: 3,
        role_name: "organization",
      },
    ],
  });

  await prisma.userStatus.createMany({
    data: [
      {
        userStatus_id: 1,
        userStatus_name: "active",
      },
      {
        userStatus_id: 2,
        userStatus_name: "inactive",
      },
    ],
  });

  await prisma.products.createMany({
    data: [
      {
        product_name: "Jitomate",
        product_description: "Jitomate de la mejor calidad",
        product_image: "/images/products/jitomate.png",
        product_isSeason: true,
      },
      {
        product_name: "Pepino",
        product_description: "Jitomate de la mejor calidad",
        product_image: "/images/products/pepino.png",
        product_isSeason: true,
      },
      {
        product_name: "Cebolla",
        product_description: "Jitomate de la mejor calidad",
        product_image: "/images/products/cebolla.png",
        product_isSeason: true,
      },
      {
        product_name: "Cebolla Morada",
        product_description: "Jitomate de la mejor calidad",
        product_image: "/images/products/cebolla_morada.png",
        product_isSeason: true,
      },
      {
        product_name: "Calabaza",
        product_description: "Jitomate de la mejor calidad",
        product_image: "/images/products/calabaza.png",
        product_isSeason: true,
      },
      {
        product_name: "Brocoli",
        product_description: "Jitomate de la mejor calidad",
        product_image: "/images/products/brocoli.png",
        product_isSeason: true,
      },
      {
        product_name: "Espinaca",
        product_description: "Jitomate de la mejor calidad",
        product_image: "/images/products/espinaca.png",
        product_isSeason: true,
      },
      {
        product_name: "Lechuga Romana",
        product_description: "Jitomate de la mejor calidad",
        product_image: "/images/products/lechuga_romana.png",
        product_isSeason: true,
      },
      {
        product_name: "Lechuga Orejona",
        product_description: "Jitomate de la mejor calidad",
        product_image: "/images/products/lechuga_orejona.png",
        product_isSeason: true,
      },
      {
        product_name: "Papa",
        product_description: "Jitomate de la mejor calidad",
        product_image: "/images/products/papa.png",
        product_isSeason: true,
      },
      {
        product_name: "Zanahoria",
        product_description: "Jitomate de la mejor calidad",
        product_image: "/images/products/zanahoria.png",
        product_isSeason: true,
      },
    ],
  });

  return NextResponse.json({ message: "Database seeded" }, { status: 200 });
}

export { initialData as GET, initialData as POST };
