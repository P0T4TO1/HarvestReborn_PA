import prisma from "@/lib/prisma";

export const getChatsByUserId = async (userId: string) => {
  console.log("userId", userId);
  const chats = await prisma.m_chat.findMany({
    where: {
      participantes: {
        some: {
          id_user: userId,
        },
      },
    },
    include: {
      user: true,
      participantes: {
        include: {
          user: {
            select: {
              email: true,
              duenonegocio: {
                select: {
                  nombre_dueneg: true,
                },
              },
              cliente: {
                select: {
                  nombre_cliente: true,
                },
              },
            },
          },
        },
      },
      mensajes: {
        include: {
          user: {
            select: {
              email: true,
              duenonegocio: {
                select: {
                  nombre_dueneg: true,
                },
              },
              cliente: {
                select: {
                  nombre_cliente: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return chats;
};
