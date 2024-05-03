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
        today(getLocalTimeZone()).toDate(getLocalTimeZone())
      );
    });

    const lotesPorVencer = lotes.filter((lote) => {
      return (
        new Date(lote.fecha_vencimiento) >
          new Date(
            new Date().setDate(
              today(getLocalTimeZone()).toDate(getLocalTimeZone()).getDate() + 3
            )
          ) &&
        new Date(lote.fecha_vencimiento) <
          new Date(
            new Date().setDate(
              today(getLocalTimeZone()).toDate(getLocalTimeZone()).getDate() + 7
            )
          )
      );
    });

    const lotesVigentes = lotes.filter((lote) => {
      return (
        new Date(lote.fecha_vencimiento) >
        new Date(
          new Date().setDate(
            today(getLocalTimeZone()).toDate(getLocalTimeZone()).getDate() + 7
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

export const getLotesForPosts = async (id_negocio: number) => {
  if (!id_negocio) return;

  try {
    const lotes = (await prisma.m_lote.findMany({
      where: {
        inventario: {
          id_negocio,
        },
      },
      include: {
        producto: true,
      },
    })) as unknown as ILote[];

    const lotesBuenEstado = lotes.filter((lote) => {
      return (
        new Date(lote.fecha_vencimiento) >
        new Date(
          new Date().setDate(
            today(getLocalTimeZone()).toDate(getLocalTimeZone()).getDate() + 7
          )
        )
      );
    });

    const lotesRecomendados = lotes.filter((lote) => {
      const fechaVencimiento = new Date(lote.fecha_vencimiento);
      const fechaHoy = today(getLocalTimeZone()).toDate(getLocalTimeZone());
      const diferencia = fechaVencimiento.getTime() - fechaHoy.getTime();
      const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

      return dias <= lote.dias_aviso;
    });

    return {
      todos: lotes,
      buenEstado: lotesBuenEstado,
      apuntoVencer: lotesRecomendados,
    };
  } catch (error) {
    console.error(error);
    return;
  }
};
