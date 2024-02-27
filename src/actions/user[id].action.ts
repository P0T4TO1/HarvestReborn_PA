"use server";

import { IUser } from "@/interfaces";
import prisma from "@/lib/prisma";

export const getUserById = async ({ _id }: IUser) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: _id,
      },
    });

    if (!user) {
      return {
        data: null,
        message: "El usuario no existe",
      };
    }
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: {
        "Content-Type": "aplication/json",
      },
    });
  } catch (e) {
    console.info("[ERROR_AUTH_REGISTER]", e);
    return {
      data: null,
      message: "Algo salio mal",
    };
  }
};
