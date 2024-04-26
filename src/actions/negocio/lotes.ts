import prisma from "@/lib/prisma";

export const getLotes = async (id_negocio: number) => {
  if (!id_negocio) return { message: "Falta id del negocio" };

  try {
    const lotes = await prisma.m_lote.findMany({
      where: {
        inventario: {
          id_negocio,
        },
      },
      include: {
        productoOrden: {
          orderBy: {
            cantidad_orden: "desc",
          },
        },
      },
    });

    return lotes;
  } catch (error) {
    console.error(error);
    return { message: "Error al encontrar lotes" };
  }
};
