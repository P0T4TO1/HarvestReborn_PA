import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export const oAuthToDb = async (oAuthEmail: string, oAuthName: string) => {
  const user = await prisma.m_user.findUnique({
    where: {
      email: oAuthEmail,
    },
  });

  if (user) {
    await prisma.m_user.update({
      where: {
        id: user.id,
      },
      data: {
        email: oAuthEmail,
      },
    });
    const { id, email, id_rol, estado } = user;
    return { id, email, id_rol, estado };
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

  const { email, id_rol, id } = newUser;
  return { id, email, nombre, apellidos, id_rol };
};
