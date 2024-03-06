import type { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";

import { jwt } from "@/lib/utils";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

type Data =
  | { message: string }
  | {
      token: string;
      user: {
        owner_name: string;
        owner_surnames: string;
        business_name: string;
        business_tel: string;
        business_email: string;
        business_pass: string;
      };
    };

export async function registerUserBusiness(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    owner_name = "",
    owner_surnames = "",
    business_name = "",
    business_tel = "",
    business_email = "",
    business_pass = "",
  } = (await new Response(req.body).json()) as {
    owner_name: string;
    owner_surnames: string;
    business_name: string;
    business_tel: string;
    business_email: string;
    business_pass: string;
  };

  try {
    const emailAlreadyExist = await prisma.user.findUnique({
      where: {
        user_email: business_email,
      },
    });

    if (emailAlreadyExist) {
      return NextResponse.json(
        {
          error: "Internal Server Error",
          message: "Este correo ya esta registrado",
        },
        { status: 500 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        user_email: business_email,
        user_password: await hash(business_pass, 10),
        role_id: 2,
        userStatus_id: 1,
        business: {
          create: {
            businessOwnerName: owner_name,
            businessOwnerSurname: owner_surnames,
            business_name,
            business_tel,
            inventory: {
              create: {
                inventory_name: "Inventario principal",
              },
            },
          },
        },
      },
    });

    const { id, role_id } = newUser;

    const token = jwt.signToken(id, business_email);

    console.log("Se ha registrado un nuevo usuario", newUser);

    return NextResponse.json({
      token,
      user: {
        business_email,
        role: role_id.toString(),
        name: business_name,
        owner_name,
        owner_surnames,
      },
    });
  } catch (e) {
    console.info("[ERROR_AUTH_REGISTER]", e);
    return NextResponse.json({
      data: null,
      message: "Algo salio mal",
    });
  }
}

export { registerUserBusiness as POST, registerUserBusiness as GET };
