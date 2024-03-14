import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Data = { message: string } | any;

async function getProfile(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  if (!params.id)
    return NextResponse.json(
      { message: "Falta Id del usuario" },
      { status: 400 }
    );

  const profile = await prisma.m_user.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!profile)
    return NextResponse.json(
      { message: "No existe usuario por ese id" },
      { status: 400 }
    );

  if (profile?.id_rol === 2) {
    const dueneg = await prisma.d_duenonegocio.findFirst({
      where: {
        id_user: profile.id,
      },
      include: {
        negocio: true,
      },
    });
    return NextResponse.json({ ...profile, dueneg }, { status: 200 });
  } else if (profile?.id_rol === 3) {
    const cliente = await prisma.d_cliente.findFirst({
      where: {
        id_user: profile.id,
      },
    });
    return NextResponse.json({ ...profile, cliente }, { status: 200 });
  }

  return NextResponse.json({ ...profile }, { status: 200 });
}

export { getProfile as GET };
