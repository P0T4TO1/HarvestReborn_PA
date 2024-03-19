import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Data = { message: string } | any;

async function getProfile(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  if (!params.id)
    return NextResponse.json(
      { message: "Falta Id del usuario" },
      { status: 400 }
    );

  const profile = await prisma.m_user.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!profile)
    return NextResponse.json(
      { message: "No existe usuario por ese id" },
      { status: 400 }
    );

  if (profile?.id_rol === 2) {
    const duenonegocio = await prisma.d_duenonegocio.findFirst({
      where: {
        id_user: profile.id,
      },
      include: {
        negocio: true,
      },
    });
    return NextResponse.json({ ...profile, duenonegocio }, { status: 200 });
  } else if (profile?.id_rol === 3) {
    const cliente = await prisma.d_cliente.findFirst({
      where: {
        id_user: profile.id,
      },
    });
    return NextResponse.json({ ...profile, cliente }, { status: 200 });
  }

  return NextResponse.json({ ...profile }, { status: 200 });
}

async function updateProfile(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  // const body = await request.json();
  // const {
  //   email,
  //   nombre_cliente,
  //   apellidos_cliente,
  //   telefono_cliente,
  //   fecha_nacimiento_d,
  //   nombre_negocio_c,
  //   direccion_negocio_c,
  //   nombre_dueneg,
  //   apellidos_dueneg,
  //   fecha_nacimiento_c,
  //   nombre_negocio_d,
  //   direccion_negocio_d,
  //   telefono_negocio,
  //   email_negocio,
  // } = body;
  const {
    email = "",
    nombre_cliente = "",
    apellidos_cliente = "",
    telefono_cliente = "",
    fecha_nacimiento_d = "",
    nombre_negocio_c = "",
    direccion_negocio_c = "",
    nombre_dueneg = "",
    apellidos_dueneg = "",
    fecha_nacimiento_c = "",
    nombre_negocio_d = "",
    direccion_negocio_d = "",
    telefono_negocio = "",
    email_negocio = "",
  } = (await new Response(request.body).json()) as {
    email: string;
    nombre_cliente: string;
    apellidos_cliente: string;
    telefono_cliente: string;
    fecha_nacimiento_d: string;
    nombre_negocio_c: string;
    direccion_negocio_c: string;
    nombre_dueneg: string;
    apellidos_dueneg: string;
    fecha_nacimiento_c: string;
    nombre_negocio_d: string;
    direccion_negocio_d: string;
    telefono_negocio: string;
    email_negocio: string;
  };

  if (!params.id)
    return NextResponse.json(
      { message: "Falta Id del usuario" },
      { status: 400 }
    );

  try {
    if (nombre_negocio_d && direccion_negocio_d && telefono_negocio) {
      await prisma.m_user.update({
        where: {
          id: params.id,
        },
        data: {
          email,
          duenonegocio: {
            update: {
              where: {
                id_dueneg: parseInt(params.id),
              },
              data: {
                nombre_dueneg: nombre_dueneg,
                apellidos_dueneg: apellidos_dueneg,
                fecha_nacimiento: new Date(fecha_nacimiento_c),
                negocio: {
                  update: {
                    nombre_negocio: nombre_negocio_d,
                    telefono_negocio: telefono_negocio,
                    direccion_negocio: direccion_negocio_d,
                  },
                },
              },
            },
          },
        },
      });
    } else if (nombre_negocio_c && direccion_negocio_c) {
      await prisma.m_user.update({
        where: {
          id: params.id,
        },
        data: {
          email,
          cliente: {
            update: {
              where: {
                id_cliente: parseInt(params.id),
              },
              data: {
                nombre_cliente: nombre_cliente,
                apellidos_cliente: apellidos_cliente,
                telefono_cliente: telefono_cliente,
                fecha_nacimiento: new Date(fecha_nacimiento_d),
              },
            },
          },
        },
      });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error al actualizar usuario" },
      { status: 400 }
    );
  }
}

export { getProfile as GET, updateProfile as PUT };
