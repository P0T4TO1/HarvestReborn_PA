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
    const order = await prisma.d_orden.create({
      data: {
        id_orden,
        fecha_orden: body.fecha_orden,
        hora_orden: body.hora_orden,
        monto_total: body.monto_total,
        estado_orden: Estado.Pendiente,
        id_cliente: body.id_cliente,
        id_historial: body.id_historial,
        id_negocio: body.id_negocio,
        productoOrden: {
          createMany: {
            data: products.map((product) => ({
              cantidad_orden: product.cantidad_orden,
              monto: product.monto,
              id_producto: product.id_producto,
              id_lote: product.id_lote,
            })),
          },
        },
      },
      include: {
        productoOrden: {
          include: {
            producto: true,
          },
        },
        cliente: {
          include: {
            user: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });

    // const emailHtml = render(
    //   OrderNotificationEmail({
    //     email_cliente: order.cliente?.user.email!,
    //     email_negocio: order.productoOrden.map(
    //       (product) => product.negocio.dueneg.user.email
    //     ),
    //     fecha_orden: order.fecha_orden.toISOString(),
    //     hora_orden: order.hora_orden.toISOString(),
    //     monto_total: order.monto_total,
    //   }) as React.ReactElement
    // );

    // const msgs = order.productoOrden.map((product) => ({
    //   from: "Harvest Reborn<harvestreborn@gmail.com>",
    //   to: product.negocio.dueneg.user.email,
    //   subject: "Nueva orden en Harvest Reborn",
    //   html: emailHtml,
    // }));

    // try {
    //   await sgMail.send(msgs);
    // } catch (error) {
    //   console.error(error);
    //   return NextResponse.json(
    //     { message: "Error al enviar correo" },
    //     { status: 400 }
    //   );
    // }

    return NextResponse.json(
      {
        order,
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
