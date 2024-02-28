import type { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";

import { jwt } from "@/lib/utils";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

type Data =
  | {
      message: string;
    }
  | {
      token: string;
      user: {
        org_name: string;
        org_acro: string;
        org_cluni: string;
        org_rfc: string;
        org_email: string;
        org_pass: string;
      };
    };

export async function registerUserOrganization(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    org_name = "",
    org_acro = "",
    org_cluni = "",
    org_rfc = "",
    org_email = "",
    org_pass = "",
  } = (await new Response(req.body).json()) as {
    org_name: string;
    org_acro: string;
    org_cluni: string;
    org_rfc: string;
    org_email: string;
    org_pass: string;
  };
  try {
    const emailAlreadyExists = await prisma.user.findUnique({
      where: {
        user_email: org_email,
      },
    });
    if (emailAlreadyExists) {
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
        user_email: org_email,
        user_password: await hash(org_pass, 10),
        role_id: 3,
        organization: {
          create: {
            organization_name: org_name,
            organization_cluni: org_cluni,
            organization_acronym: org_acro,
            organization_rfc: org_rfc,
          },
        },
      },
    });

    const { id, role_id } = newUser;

    const token = jwt.signToken(id, org_email);

    return NextResponse.json({
      token,
      user: {
        name: org_name,
        role: role_id.toString(),
        org_acro,
        org_email,
      },
    });
  } catch (error) {
    console.error("[ERROR_AUTH_REGISTER]", error);
    return NextResponse.json({
      data: null,
      message: "Algo salio mal",
    });
  }
}

export { registerUserOrganization as GET, registerUserOrganization as POST };
