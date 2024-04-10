"use client";

import React, { useContext, useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { chatHrefConstructor, toPusherKey } from "@/utils/cn";
import { toast } from "react-hot-toast";
import UnseenChatToast from "@/components/Chats/UnseenChatToast";
import { Sidebar } from "./sidebar.styles";
import {
  SidebarMenu,
  SidebarItem,
  DropdownComponent,
  DarkModeSwitch,
} from "@/components";
import { usePathname } from "next/navigation";
import { UiContext } from "@/context/ui";
import { FaSearch } from "react-icons/fa";
import { Input } from "@nextui-org/react";
import { IChatWithLastMessage, IMensaje } from "@/interfaces";
import { useSession } from "next-auth/react";

interface Props {
  chats: IChatWithLastMessage[];
}

export const SidebarWrapperChats = ({ chats }: Props) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
  // const [unseenMessages, setUnseenMessages] = useState<IMensaje[]>([]);
  // const [activeChats, setActiveChats] = useState<IChatWithLastMessage[]>(chats);

  // useEffect(() => {
  //   pusherClient.subscribe(toPusherKey(`user:${session?.user.id}:chats`));
  //   pusherClient.subscribe(toPusherKey(`user:${session?.user.id}:friends`));

  //   const newFriendHandler = (newFriend: IChatWithLastMessage) => {
  //     console.log("received new user", newFriend);
  //     setActiveChats((prev) => [...prev, newFriend]);
  //   };

  //   const chatHandler = (message: IMensaje) => {
  //     const shouldNotify =
  //       pathname !==
  //       `/chats/chat/${chatHrefConstructor(session?.user.id!, message.id_user)}`;

  //     if (!shouldNotify) return;

  //     // should be notified
  //     toast.custom((t) => (
  //       <UnseenChatToast
  //         t={t}
  //         sessionId={session?.user.id!}
  //         senderId={message.id_user}
  //         senderMessage={message.cuerpo_mensaje}
  //         senderName={
  //           message.user?.duenonegocio?.nombre_dueneg ??
  //           message.user?.cliente?.nombre_cliente ??
  //           message.user?.email!
  //         }
  //       />
  //     ));

  //     setUnseenMessages((prev) => [...prev, message]);
  //   };

  //   pusherClient.bind("new_message", chatHandler);
  //   pusherClient.bind("new_friend", newFriendHandler);

  //   return () => {
  //     pusherClient.unsubscribe(toPusherKey(`user:${session?.user.id!}:chats`));
  //     pusherClient.unsubscribe(
  //       toPusherKey(`user:${session?.user.id!}:friends`)
  //     );

  //     pusherClient.unbind("new_message", chatHandler);
  //     pusherClient.unbind("new_friend", newFriendHandler);
  //   };
  // }, [pathname, session?.user.id!]);

  // useEffect(() => {
  //   if (pathname?.includes("chat")) {
  //     setUnseenMessages((prev) => {
  //       return prev.filter((msg) => !pathname.includes(msg.id_user));
  //     });
  //   }
  // }, [pathname]);

  const getChatPartnerName = (chat: IChatWithLastMessage) => {
    const chatPartner = chat.participants?.filter(
      (p) => p.id_user !== session?.user.id
    );
    return (
      chatPartner
        ?.map((partnerChat) => {
          return (
            partnerChat.user?.negocio?.nombre_negocio ??
            partnerChat.user?.cliente?.nombre_cliente ??
            partnerChat.user?.email
          );
        })
        ?.toString() ?? ""
    );
  };

  return (
    <aside className="h-screen z-[50] sticky top-0">
      {isMenuOpen ? (
        <div className={Sidebar.Overlay()} onClick={toggleSideMenu} />
      ) : null}
      <div
        className={`bg-background transition-transform h-full fixed -translate-x-full w-96 shrink-0 z-[202] overflow-y-auto border-r border-divider flex-col py-6 px-3 md:ml-0 md:flex md:static md:h-screen md:translate-x-0 ${
          isMenuOpen ? "translate-x-0 ml-0 [display:inherit]" : ""
        }`}
      >
        <div className={"flex gap-4 items-center px-6 flex-col"}>
          <div className="flex items-center justify-between gap-2 w-full">
            <h3 className="text-xl font-medium m-0 text-default-900 whitespace-nowrap">
              Chats
            </h3>
            <div className="flex items-center justify-center">
              <DarkModeSwitch />
              <DropdownComponent />
            </div>
          </div>
          <div className="w-full">
            <Input
              startContent={<FaSearch size={20} />}
              placeholder="Buscar chat"
              size="md"
              width="100%"
            />
          </div>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            {chats.length === 0 ? (
              <p className="text-sm text-zinc-500">
                No tienes chats aún, comienza uno!
              </p>
            ) : (
              chats.map((chat) => (
                <SidebarMenu key={chat.id} title="Todos los chats">
                  <SidebarItem
                    href={`/chats/chat/${chat.id}`}
                    isActive={pathname === `/chats/chat/${chat.id}`}
                    title={getChatPartnerName(chat)}
                  >
                    <p className="mt-1 max-w-md">
                      <span className="text-zinc-400">
                        {chat.lastMessage.senderId === session?.user.id
                          ? "Tú: "
                          : `${chat.lastMessage.senderName}: `}
                      </span>
                      {chat.lastMessage.text}
                    </p>
                  </SidebarItem>
                </SidebarMenu>
              ))
            )}
            {/* {activeChats.length === 0 ? (
              <p className="text-sm text-zinc-500">
                No tienes chats aún, comienza uno!
              </p>
            ) : (
              activeChats.sort().map((friend) => {
                const unseenMessagesCount = unseenMessages.filter(
                  (unseenMsg) => {
                    return unseenMsg.id_user === friend.id;
                  }
                ).length;
                return (
                  <SidebarMenu key={friend.id} title="Todos los chats">
                    <SidebarItem
                      href={`/chats/chat/${friend.id}`}
                      isActive={
                        pathname ===
                        `/chats/chat/${friend.id}`
                      }
                      title={getChatPartnerName(friend)}
                    >
                      <p className="mt-1 max-w-md">
                        <span className="text-zinc-400">
                          {friend.lastMessage.senderId === session?.user.id
                            ? "Tú: "
                            : `${friend.lastMessage.senderName}: `}
                        </span>
                        {friend.lastMessage.text}
                        {unseenMessagesCount > 0 && (
                          <span className="text-xs text-zinc-400">
                            {unseenMessagesCount} mensajes nuevos
                            {unseenMessages[0].cuerpo_mensaje}
                          </span>
                        )}
                      </p>
                    </SidebarItem>
                  </SidebarMenu>
                );
              })
            )} */}
          </div>
        </div>
      </div>
    </aside>
  );
};
