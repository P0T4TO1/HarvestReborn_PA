import type { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import nextFontLocalFontLoader from "next/dist/compiled/@next/font/dist/local/loader";

export async function searchUserByEmail(
  req: NextApiRequest,
  { params }: { params: { email: string } }
) {
  try {
    const user = await prisma.m_user.findUnique({
      where: {
        email: params.email,
      },
    });

    if (user) {
      return NextResponse.json(
        {
          error: "Internal Server Error",
          message: "Este correo ya esta registrado",
        },
        { status: 200 }
      );
    }
    return NextResponse.json({ user, message: "No existe el usuario" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "Error al buscar el usuario",
      },
      { status: 500 }
    );
  }
}

export { searchUserByEmail as GET };
