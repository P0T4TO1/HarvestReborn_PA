"use server";

import { IRegisterBusiness, IRegisterOrganization } from "@/interfaces";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { error } from "console";
import { revalidatePath } from "next/cache";

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
        user_pass: await hash(business_pass, 10),
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

    // console.log("se registro User");

    // const business = await prisma.business.create({
    //   data: {
    //     businessOwnerName: owner_name,
    //     businessOwnerSurname: owner_surnames,
    //     business_name: business_name,
    //     business_tel,
    //     user_id: await prisma.user
    //       .findUnique({
    //         where: {
    //           user_email: business_email,
    //         },
    //       })
    //       .then(),
    //   },
    // });

    console.log("El usuario y el negocio se registraron correctamente");

    return {
      data: { user },
      message: "El usuario y el negocio se registraron correctamente",
    };
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
  console.log("entro a la accion")
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
        user_pass: await hash(org_pass, 10),
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

    // const organization = await prisma.organization.create({
    //   data: {
    //     organization_name: org_name,
    //     organization_cluni: org_cluni,
    //     organization_acronym: org_acro,
    //     organization_rfc: org_rfc,
    //     user_id: await prisma.user
    //       .findUnique({
    //         where: {
    //           user_email: org_email,
    //         },
    //       })
    //       .then(),
    //   },
    // });

    console.log("El usuario y el negocio se registro correctamente");

    return {
      data: { user },
      message: "El usuario y el negocio se registro correctamente",
    };
  } catch (e) {
    console.info("[ERROR_AUTH_REGISTER]", error);
    return {
      data: null,
      message: "Algo salio mal",
    };
  } finally {
    revalidatePath(org_path);
  }
};
