"use server";

import prisma from "@/lib/prisma";
import { IPublicacion } from "@/interfaces";

export const getPublicaciones = async (id_negocio: number) => {
  if (!id_negocio) return;

  try {
    const publicaciones = (await prisma.m_publicaciones.findMany({
      where: {
        id_negocio,
      },
      include: {
        lotes: true,
      },
    })) as unknown as IPublicacion[];
    return publicaciones;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getPublicactionById = async (id_publicacion: number) => {
  if (!id_publicacion) return;

  try {
    const publicacion = (await prisma.m_publicaciones.findUnique({
      where: {
        id_publicacion,
      },
      include: {
        lotes: true,
        negocio: {
          select: {
            dueneg: {
              select: {
                user: {
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    })) as unknown as IPublicacion;
    return publicacion;
  } catch (error) {
    console.error(error);
    return;
  }
};
