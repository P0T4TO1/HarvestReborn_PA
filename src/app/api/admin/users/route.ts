import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

async function getAllUsers(req: NextRequest, res: NextResponse) {
  const users = await prisma.m_user.findMany({
    select: {
      id: true,
      email: true,
      estado: true,
      id_rol: true,
      cliente: true,
      duenonegocio: true,
    },
  });

  return NextResponse.json(users, { status: 200 });
}

export { getAllUsers as GET };
