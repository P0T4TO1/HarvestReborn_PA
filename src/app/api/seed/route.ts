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
  await prisma.organization.deleteMany();
  await prisma.business.deleteMany();
  await prisma.donation.deleteMany();
  await prisma.inventory.deleteMany();
  await prisma.products.deleteMany();
  await prisma.role.deleteMany();
  await prisma.userStatus.deleteMany();

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
    data: seedDatabase.initialData.products as [],
  });

  return NextResponse.json({ message: "Database seeded" }, { status: 200 });
}

export { initialData as GET, initialData as POST };
