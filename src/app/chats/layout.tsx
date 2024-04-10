import { SidebarWrapperChats } from "@/components";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getChatsByUserId } from "@/helpers/get-chats-by-user-id";
import { IChatWithLastMessage } from "@/interfaces";

const inter = Inter({ subsets: ["latin"] });

export default async function ChatsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const chats = await getChatsByUserId(session.user.id);

  const chatsWithLastMessage = chats.map((chat) => {
    const lastMessage = chat.mensajes[chat.mensajes.length - 1];
    if (!lastMessage) {
      return {
        id: chat.id_chat,
        name: chat.nombre_chat,
        lastMessage: {
          text: "No hay mensajes aún",
          senderId: "",
        },
      } as IChatWithLastMessage;
    }
    return {
      id: chat.id_chat,
      name: chat.nombre_chat,
      lastMessage: {
        text: lastMessage.cuerpo_mensaje,
        senderId: lastMessage.id_user,
        senderName:
          lastMessage.user?.duenonegocio?.negocio?.nombre_negocio ??
          lastMessage.user?.cliente?.nombre_cliente ??
          lastMessage.user?.email,
      },
      participants: chat.participantes,
    } as IChatWithLastMessage;
  });
  return (
    <>
      <div className="flex">
        <SidebarWrapperChats chats={chatsWithLastMessage} />
        {children}
      </div>
    </>
  );
}
