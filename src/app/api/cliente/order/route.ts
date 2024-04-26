import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Estado } from "@/interfaces";
import sgMail from "@sendgrid/mail";
// import { render } from "@react-email/render";
// import { OrderNotificationEmail } from "@/components";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

interface body {
  fecha_orden: string;
  hora_orden: string;
  monto_subtotal: number;
  monto_total: number;
  estado_orden: string;
  id_cliente: number;
  id_historial: number;
  id_negocio: number;
}

interface products {
  cantidad_orden: number;
  monto: number;
  id_producto: number;
  id_lote: number;
}

async function createOrder(req: NextRequest, res: NextResponse) {
  const { body, products } = (await new Response(req.body).json()) as {
    body: body;
    products: products[];
  };
  // make an id for the order
  let now = new Date().toString();
  now += now + Math.floor(Math.random() * 10);
  const id_orden = now
    .replace(/[^0-9]/g, "")
    .slice(0, 10)
    .toString();

  try {
    const orders = await prisma.d_orden.createMany({
      data: {
        id_orden,
        fecha_orden: body.fecha_orden,
        hora_orden: body.hora_orden,
        monto_total: body.monto_total,
        estado_orden: Estado.Pendiente,
        id_cliente: body.id_cliente,
        id_historial: body.id_historial,
        id_negocio: body.id_negocio,
      },
    });

    return NextResponse.json(
      {
        orders,
        message: "Orden creada con éxito",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: true,
        message: "Error al crear la order",
      },
      { status: 500 }
    );
  }
}

export { createOrder as POST };
