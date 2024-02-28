"use server";

import { IBusiness, IOrganization, IUser } from "@/interfaces";
import prisma from "@/lib/prisma";

export const getUserByEmail = async (user_email: string, role_id: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        user_email,
      },
    });

    if (!user) {
      return {
        data: null,
        message: "El usuario no existe",
      };
    }

    if (role_id === 1) {
      return {
        data: user,
        message: "El usuario admin se encontró correctamente",
      };
    } else if (role_id === 2) {
      const organization = await prisma.organization.findUnique({
        where: {
          user_id: user.id,
        },
      });

      return {
        data: { ...user, organization },
        message: "El usuario y la organización se encontró correctamente",
      };
    } else {
      const business = await prisma.business.findUnique({
        where: {
          user_id: user.id,
        },
      });

      return {
        data: { ...user, business },
        message: "El usuario y el negocio se encontró correctamente",
      };
    }
  } catch (e) {
    console.info("[ERROR_FIND_USER]", e);
    return {
      data: null,
      message: "Algo salio mal",
    };
  }
};

export const editUser = async (data: IUser | IOrganization | IBusiness) => {
  try {
    if (data.role_id === 1) {
      const user = await prisma.user.update({
        where: {
          user_email: data.user_email,
        },
        data: {
          user_email: data.user_email,
          user_password: data.user_password,
        },
      });

      return {
        data: user,
        message: "El usuario se modifico correctamente",
      };
    } else if (data.role_id === 2) {
      if ("org_name" in data) {
        const user = await prisma.user.update({
          where: {
            user_email: data.user_email,
          },
          data: {
            user_email: data.user_email,
            user_password: data.user_password,
            organization: {
              update: {
                organization_name: data.org_name,
                organization_acronym: data.org_acro,
                organization_cluni: data.org_cluni,
                organization_rfc: data.org_rfc,
              },
            },
          },
        });
        return {
          data: user,
          message: "El usuario y la organización se modifico correctamente",
        };
      }
    } else {
      if ("business_name" in data) {
        const user = await prisma.user.update({
          where: {
            user_email: data.user_email,
          },
          data: {
            user_email: data.user_email,
            user_password: data.user_password,
            business: {
              update: {
                business_name: data.business_name,
                business_tel: data.business_tel,
                businessOwnerName: data.owner_name,
                businessOwnerSurname: data.owner_surnames,
              },
            },
          },
        });

        return {
          data: user,
          message: "El usuario y el negocio se modifico correctamente",
        };
      }
    }
  } catch (e) {
    console.info("[ERROR_EDIT_USER]", e);
    return {
      data: null,
      message: "Algo salio mal",
    };
  }
};

export const deleteUser = async ({ user_email }: IUser) => {
  try {
    await prisma.user.delete({
      where: {
        user_email,
      },
    });

    return {
      data: null,
      message: "El usuario se elimino correctamente",
    };
  } catch (e) {
    console.info("[ERROR_DELETE_USER]", e);
    return {
      data: null,
      message: "Algo salio mal",
    };
  }
};
