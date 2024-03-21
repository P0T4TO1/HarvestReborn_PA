import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export const oAuthToDb = async (oAuthEmail: string, oAuthName: string) => {
  const user = await prisma.m_user.findUnique({
    where: {
      email: oAuthEmail,
    },
  });

  if (user) {
    return user;
  }
  const role =
    oAuthEmail === "jaretgarciagomez@gmail.com" ||
    oAuthEmail === "saulchanona@yahoo.com"
      ? 1
      : 2 || 3;

  const password = Math.random().toString(36).slice(-8);
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt) as string;

  const [nombre, apellidos]: string[] = oAuthName.split(" ");
  const newUser = await prisma.m_user.create({
    data: {
      email: oAuthEmail,
      password: hash,
      id_rol: role === 1 ? 1 : 3,
    },
  });
};
