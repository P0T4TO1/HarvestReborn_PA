import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { BagType, Estado } from "@/interfaces";
import sgMail from "@sendgrid/mail";
import { render } from "@react-email/render";
import { OrderNotificationEmail } from "@/components";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

interface body {
  fecha_orden: string;
  hora_orden: string;
  monto_subtotal: number;
  monto_total: number;
  estado_orden: string;
  id_cliente: number;
  id_historial: number;
  bag: BagType;
}

async function createOrder(req: NextRequest, res: NextResponse) {
  const { body } = (await new Response(req.body).json()) as {
    body: body;
  };
  // make an id for the order
  let now = new Date().toString();
  now += now + Math.floor(Math.random() * 10);
  const id_orden = now
    .replace(/[^0-9]/g, "")
    .slice(0, 10)
    .toString();

  try {
    const orders = body.bag.map(async (item) => {
      const order = await prisma.d_orden.create({
        data: {
          id_orden: id_orden + item.id_negocio,
          fecha_orden: new Date(body.fecha_orden),
          hora_orden: new Date(body.hora_orden),
          monto_total: item.total,
          estado_orden: Estado.Pendiente,
          id_cliente: body.id_cliente,
          id_historial: body.id_historial,
          id_negocio: item.id_negocio,
          productoOrden: {
            createMany: {
              data: item.productos.map((product) => {
                if (!product.lote) {
                  throw new Error("No se ha seleccionado un lote");
                }
                return {
                  id_producto: product.id_producto,
                  cantidad_orden: product.cantidad_orden,
                  monto: product.monto,
                  id_lote: product.lote.id_lote,
                };
              }),
            },
          },
        },
      });
      return order;
    });

    const emailCliente = await prisma.d_cliente.findFirst({
      where: {
        id_cliente: body.id_cliente,
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!emailCliente) {
      throw new Error("Cliente no encontrado");
    }

    const emailsPromise = body.bag.map(async (item) => {
      const negocio = await prisma.m_negocio.findFirst({
        where: {
          id_negocio: item.id_negocio,
        },
        include: {
          dueneg: {
            select: {
              user: {
                select: {
                  email: true,
                },
              },
            },
          },
        },
      });

      if (!negocio) {
        throw new Error("Negocio no encontrado");
      }
      return negocio.email_negocio || negocio.dueneg.user.email;
    });

    const emails = await Promise.all(emailsPromise);

    if (!emails) {
      throw new Error("No se encontraron correos de negocio");
    }

    // send email to all the businesses
    const emailsHTML = emails.map((email) => {
      return render(
        OrderNotificationEmail({
          email_cliente: emailCliente.user.email,
          email_negocio: email,
          fecha_orden: body.fecha_orden,
          hora_orden: body.hora_orden,
          monto_total: body.monto_total,
        })
      );
    });

    const msgs = emails.map((email, index) => {
      return {
        to: email,
        from: "Harvest Reborn<harvestreborn@gmail.com>",
        subject: "Nueva orden en Harvest Reborn",
        html: emailsHTML[index],
      };
    });

    try {
      await sgMail.send(msgs);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Error al enviar correos" },
        { status: 400 }
      );
    }

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
