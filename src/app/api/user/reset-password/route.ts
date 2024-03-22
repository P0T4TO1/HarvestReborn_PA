import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as crypto from "crypto";
import { Resend } from "resend";
import { ResetPasswordEmailTemplate } from "@/components";

const resend = new Resend(process.env.RESEND_API_KEY);

async function resetPassword(req: NextRequest, res: NextResponse) {
  const { email } = (await new Response(req.body).json()) as { email: string };

  const user = await prisma.m_user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        message: "Correo no encontrado",
      },
      { status: 400 }
    );
  }

  const resetPasswordToken = crypto.randomBytes(32).toString("base64url");
  const today = new Date();
  const expiryDate = new Date(today.setDate(today.getDate() + 1)); // 24 hours from now

  await prisma.m_user.update({
    where: {
      id: user.id,
    },
    data: {
      resetPasswordToken: resetPasswordToken,
      resetPasswordExpires: expiryDate,
    },
  });

  const { data, error } = await resend.emails.send({
    from: "Admin <admin@harvest-reborn-heroku-e3c30061952b.herokuapp.com>",
    to: [email],
    subject: "Restablecer tu contraseña",
    text: " ",
    react: ResetPasswordEmailTemplate({
      email,
      resetPasswordToken,
    }),
  });
  if (error) {
    console.log(error)
    return NextResponse.json(
      {
        message: "Error al enviar el correo",
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      data,
      message: "Correo enviado",
    },
    { status: 200 }
  );
}

export { resetPassword as POST };
