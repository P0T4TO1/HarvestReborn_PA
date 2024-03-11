import type { NextApiRequest, NextApiResponse } from "next";

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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return checkJWT(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token = "" } = req.cookies;

  let userId = "";

  try {
    userId = await jwt.isValidToken(token);
  } catch (error) {
    return res.status(401).json({
      message: "Token de autorización no es válido",
    });
  }

  const user = await prisma?.m_user.findUnique({
    where: {
      id_user: userId,
    },
  });

  if (!user) {
    return res.status(400).json({ message: "No existe usuario con ese id" });
  }

  const { id_user, email, id_rol } = user;

  return NextResponse.json({
    token: jwt.signToken(id_user, email),
    user: {
      email,
      role: id_rol.toString(),
    },
  });
};
