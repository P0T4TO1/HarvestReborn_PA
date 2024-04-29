import { ILote } from "@/interfaces";
import prisma from "@/lib/prisma";
import { today, getLocalTimeZone } from "@internationalized/date";

export const getLotes = async (id_negocio: number) => {
  if (!id_negocio) return;

  try {
    const lotes = (await prisma.m_lote.findMany({
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
    })) as unknown as ILote[];

    const lotesVencidos = lotes.filter((lote) => {
      return (
        new Date(lote.fecha_vencimiento) <
        new Date(today(getLocalTimeZone()).toString())
      );
    });

    const lotesPorVencer = lotes.filter((lote) => {
      return (
        new Date(lote.fecha_vencimiento) >
          new Date(
            new Date().setDate(
              new Date(today(getLocalTimeZone()).toString()).getDate() + 3
            )
          ) &&
        new Date(lote.fecha_vencimiento) <
          new Date(
            new Date().setDate(
              new Date(today(getLocalTimeZone()).toString()).getDate() + 7
            )
          )
      );
    });

    const lotesVigentes = lotes.filter((lote) => {
      return (
        new Date(lote.fecha_vencimiento) >
        new Date(
          new Date().setDate(
            new Date(today(getLocalTimeZone()).toString()).getDate() + 7
          )
        )
      );
    });

    return {
      all: lotes,
      lotesVencidos,
      lotesPorVencer,
      lotesVigentes,
    };
  } catch (error) {
    console.error(error);
    return;
  }
};
