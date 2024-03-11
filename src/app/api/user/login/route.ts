import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

import { jwt } from "@/lib/utils";
import { NextResponse } from "next/server";

type Data =
  | { message: string }
  | {
      token: string;
      user: {
        email: string;
        name: string;
        role: string;
      };
    };

export async function loginUser(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email = "", password = "" } = await new Response(req.body).json();

  const user = await prisma?.m_user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json({
      message: "Correo o contraseña no válidos - Email",
    });
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return NextResponse.json({
      message: "Correo o contraseña no válidos - Password",
    });
  }

  const { id, id_rol } = user;

  const token = jwt.signToken(id, email);

  return NextResponse.json({
    token,
    user: {
      email,
      role: id_rol.toString(),
      name: "random name",
    },
  });
}

export { loginUser as GET, loginUser as POST };
