"use server";

import { IRegisterBusiness, IRegisterOrganization } from "@/interfaces";
import prisma from "@/lib/prisma";
import { hash, compare } from "bcrypt";
import { error } from "console";
import { revalidatePath } from "next/cache";
import { jwt } from "@/lib/utils";
export function registerUserBusiness(req: any, res: any) {
  throw new Error("Function not implemented.");
}
export const authRegisterBusinessAction = async ({
  owner_name,
  owner_surnames,
  business_email,
  business_name,
  business_pass,
  business_tel,
  business_path,
}: IRegisterBusiness) => {
  try {
    const emailAlreadyExist = await prisma.user.findUnique({
      where: {
        user_email: business_email,
      },
    });

    if (emailAlreadyExist) {
      return {
        data: null,
        message: "Este correo ya esta registrado",
      };
    }

    const user = await prisma.user.create({
      data: {
        user_email: business_email,
        user_password: await hash(business_pass, 10),
        role_id: 2,
        business: {
          create: {
            businessOwnerName: owner_name,
            businessOwnerSurname: owner_surnames,
            business_name: business_name,
            business_tel,
          },
        },
      },
    });

    console.log("El usuario y el negocio se registraron correctamente");
    const { id, role_id } = user;
    const token = jwt.signToken(id, business_email);

    return new Response(
      JSON.stringify({
        status: 200,
        token,
        user: {
          email: business_email,
          role: role_id.toString(),
          name: business_name,
        },
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (e) {
    console.info("[ERROR_AUTH_REGISTER]", error);
    return {
      data: null,
      message: "Algo salio mal",
    };
  } finally {
    revalidatePath(business_path);
  }
};

export const authRegisterOrganizationAction = async ({
  org_name,
  org_acro,
  org_cluni,
  org_rfc,
  org_email,
  org_pass,
  org_path,
}: IRegisterOrganization) => {
  try {
    const emailAlreadyExists = await prisma.user.findUnique({
      where: {
        user_email: org_email,
      },
    });
    if (emailAlreadyExists) {
      return {
        data: null,
        message: "Este correo ya esta registrado",
      };
    }

    const user = await prisma.user.create({
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

    console.log("El usuario y el negocio se registro correctamente");
    const { id, role_id } = user;
    const token = jwt.signToken(id, org_email);

    return new Response(
      JSON.stringify({
        status: 200,
        token,
        user: {
          email: org_email,
          role: role_id.toString(),
          name: org_name,
        },
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (e) {
    console.info("[ERROR_AUTH_REGISTER]", e);
    return {
      data: null,
      message: "Algo salio mal",
    };
  } finally {
    revalidatePath(org_path);
  }
};
