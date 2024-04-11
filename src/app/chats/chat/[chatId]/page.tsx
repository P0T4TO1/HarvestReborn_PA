import ChatInput from "@/components/Chats/ChatInput";
import Messages from "@/components/Chats/Messages";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/authOptions";
import { messageArrayValidator } from "@/validations/chat.validation";
import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import { IUser } from "@/interfaces";
import { NavbarWrapperChats } from "@/components";

// The following generateMetadata functiion was written after the video and is purely optional
export async function generateMetadata({
  params,
}: {
  params: { chatId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/auth/login");
  const [userId1, userId2] = params.chatId.split("--");
  const { user } = session;

  const chatPartnerId = user.id === userId1 ? userId2 : userId1;
  const chatPartnerRaw = await prisma.m_user.findUnique({
    where: { id: chatPartnerId },
    include: {
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
  });
  const chatPartner = JSON.parse(JSON.stringify(chatPartnerRaw)) as IUser;

  return {
    title: `Harvest Reborn | ${chatPartner.duenonegocio?.nombre_dueneg ?? chatPartner.cliente?.nombre_cliente ?? chatPartner.email}`,
  };
}

interface PageProps {
  params: {
    chatId: string;
  };
}

async function getChatMessages(chatId: string) {
  try {
    const results = await prisma.d_mensajes.findMany({
      where: {
        id_chat: chatId,
      },
    });
    const dbMessages = JSON.parse(JSON.stringify(results));
    const reversedMessages = dbMessages.reverse();
    const messages = messageArrayValidator.parse(reversedMessages);

    return messages;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

const page = async ({ params }: PageProps) => {
  const { chatId } = params;
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const { user } = session;

  const [userId1, userId2] = chatId.split("--");

  if (user.id !== userId1 && user.id !== userId2) {
    console.log("-----User not in chat-----");
    notFound();
  }

  const chatPartnerId = user.id === userId1 ? userId2 : userId1;
  // new

  const chatPartnerRaw = (await prisma.m_user.findUnique({
    where: { id: chatPartnerId },
    select: {
      email: true,
      duenonegocio: {
        select: {
          negocio: {
            select: {
              nombre_negocio: true,
            },
          },
        },
      },
      cliente: {
        select: {
          nombre_cliente: true,
        },
      },
    },
  })) as IUser;
  const chatPartner = JSON.parse(JSON.stringify(chatPartnerRaw)) as IUser;
  const initialMessages = await getChatMessages(chatId);

  return (
    <>
      {/* <div className="flex-1 justify-between flex flex-col h-full max-h-[calc(100vh-6rem)]">
        <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
          <div className="relative flex items-center space-x-4">
            <div className="flex flex-col leading-tight">
              <div className="text-xl flex items-center">
                <span className="text-gray-700 mr-3 font-semibold">
                  {chatPartner.duenonegocio?.nombre_dueneg ??
                    chatPartner.cliente?.nombre_cliente ??
                    chatPartner.email}
                </span>
              </div>

              <span className="text-sm text-gray-600">{chatPartner.email}</span>
            </div>
          </div>
        </div>

        <Messages
          chatId={chatId}
          chatPartner={chatPartner}
          sessionImg={session.user.image}
          sessionId={session.user.id}
          initialMessages={initialMessages}
        />
        <ChatInput chatId={chatId} chatPartner={chatPartner} />
      </div> */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <NavbarWrapperChats
          partnerName={
            chatPartner.duenonegocio?.negocio?.nombre_negocio ??
            chatPartner.cliente?.nombre_cliente ??
            chatPartner.email
          }
        />
        <Messages
          chatId={chatId}
          chatPartner={chatPartner}
          sessionImg={session.user.image}
          sessionId={session.user.id}
          initialMessages={initialMessages}
        />
        <ChatInput chatId={chatId} chatPartner={chatPartner} />
      </div>
    </>
  );
};

export default page;
