import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

type Data = { message: string } | any;

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   switch (req.method) {
//     case "GET":
//       return getProfile(req, res);
//
//     case "PUT":
//       return putProfile(req, res);
//
//     default:
//       return res.status(400).json({
//         message: "Bad request",
//       });
//   }
// }

const getProfile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { searchParams } = new URL(req.url as string);
  const _id = searchParams.get("_id");

  const session: any = await getSession({ req });
  if (!session) {
    return NextResponse.json(
      { message: "Debe de estar autenticado para hacer esto" },
      { status: 401 }
    );
  }

  if (!_id)
    return NextResponse.json(
      { message: "Falta Id del usuario" },
      { status: 400 }
    );

  const profile = await prisma.user.findUnique({
    where: {
      id: _id,
    },
  });

  if (!profile)
    return NextResponse.json(
      { message: "No existe usuario por ese id" },
      { status: 400 }
    );

  return NextResponse.json(profile, { status: 200 });
};

const putProfile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {
    _id = "",
    owner_name = "",
    owner_surnames = "",
    business_name = "",
    business_tel = "",
    email = "",
    password = "",
    org_name = "",
    org_acro = "",
    org_cluni = "",
    org_rfc = "",
  } = (await new Response(req.body).json()) as {
    _id: string;
    owner_name: string;
    owner_surnames: string;
    business_name: string;
    business_tel: string;
    email: string;
    password: string;
    org_name: string;
    org_acro: string;
    org_cluni: string;
    org_rfc: string;
    name: string;
  };

  const session: any = await getSession({ req });
  if (!session) {
    return NextResponse.json(
      { message: "Debe de estar autenticado para hacer esto" },
      { status: 401 }
    );
  }

  if (!_id)
    return NextResponse.json(
      { message: "Falta Id del usuario" },
      { status: 400 }
    );

  const profile = await prisma.user.findUnique({
    where: {
      id: _id,
    },
  });

  if (!profile)
    return NextResponse.json(
      { message: "No existe usuario por ese id" },
      { status: 400 }
    );

  if (owner_name && owner_surnames && business_name && business_tel) {
    await prisma.user.update({
      where: {
        id: _id,
      },
      data: {
        user_email: email,
        business: {
          update: {
            business_name,
            business_tel,
            businessOwnerName: owner_name,
            businessOwnerSurname: owner_surnames,
          },
        },
      },
    });

    if (org_name && org_acro && org_cluni && org_rfc) {
      await prisma.user.update({
        where: {
          id: _id,
        },
        data: {
          user_email: email,
          organization: {
            update: {
              organization_name: org_name,
              organization_acronym: org_acro,
              organization_cluni: org_cluni,
              organization_rfc: org_rfc,
            },
          },
        },
      });
    }

    return NextResponse.json(
      { message: "Se actualizó correctamente" },
      { status: 200 }
    );
  }
  return NextResponse.json(
    { message: "No se actualizó nada" },
    { status: 200 }
  );
};

export { getProfile as GET, putProfile as PUT };
