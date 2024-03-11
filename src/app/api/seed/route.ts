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
  // await prisma.c_rol.deleteMany();
  // await prisma.c_rol.createMany({
  //   data: [
  //     {
  //       id_rol: 1,
  //       nombre_rol: "admin",
  //     },
  //     {
  //       id_rol: 2,
  //       nombre_rol: "negocio",
  //     },
  //     {
  //       id_rol: 3,
  //       nombre_rol: "cliente",
  //     },
  //   ],
  // });

  await prisma.m_producto.deleteMany();
  await prisma.m_producto.createMany({
    data: seedDatabase.initialData.products as [],
  });

  return NextResponse.json({ message: "Database seeded" }, { status: 200 });
}

export { initialData as GET, initialData as POST };
