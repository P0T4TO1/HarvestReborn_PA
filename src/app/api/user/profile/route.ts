import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { IUser } from "@/interfaces";

type Data = { message: string } | any;

export async function getProfile(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { searchParams } = new URL(req.url as string);
  const id = searchParams.get("id");

  // const session: any = await getSession({ req });
  // if (!session) {
  //   return NextResponse.json(
  //     { message: "Debe de estar autenticado para hacer esto" },
  //     { status: 401 }
  //   );
  // }

  if (!id)
    return NextResponse.json(
      { message: "Falta Id del usuario" },
      { status: 400 }
    );

  const profile = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (!profile)
    return NextResponse.json(
      { message: "No existe usuario por ese id" },
      { status: 400 }
    );

  if (profile?.role_id === 2) {
    const business = await prisma.business.findUnique({
      where: {
        user_id: profile.id,
      },
    });
    return NextResponse.json({ ...profile, business }, { status: 200 });
  } else if (profile?.role_id === 3) {
    const organization = await prisma.organization.findUnique({
      where: {
        user_id: profile.id,
      },
    });
    return NextResponse.json({ ...profile, organization }, { status: 200 });
  }

  return NextResponse.json({ ...profile }, { status: 200 });
}

const putProfile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {
    id = "",
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
    id: string;
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

  if (!id)
    return NextResponse.json(
      { message: "Falta Id del usuario" },
      { status: 400 }
    );

  const profile = await prisma.user.findUnique({
    where: {
      id: id,
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
        id: id,
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
          id: id,
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
