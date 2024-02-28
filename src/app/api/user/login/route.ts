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

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   switch (req.method) {
//     case "POST":
//       return loginUser(req, res);
//
//     default:
//       res.status(400).json({
//         message: "Bad request",
//       });
//   }
// }

export async function loginUser(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email = "", password = "" } = await new Response(req.body).json();

  const user = await prisma?.user.findUnique({
    where: {
      user_email: email,
    },
  });

  if (!user) {
    return NextResponse.json({
      message: "Correo o contraseña no válidos - Email",
    });
  }

  if (!bcrypt.compareSync(password, user.user_password!)) {
    return NextResponse.json({
      message: "Correo o contraseña no válidos - Password",
    });
  }

  const { role_id, id } = user;

  const token = jwt.signToken(id, email);

  return NextResponse.json({
    token,
    user: {
      email,
      role: role_id.toString(),
      name: "random name",
    },
  });
}

export { loginUser as GET, loginUser as POST };
