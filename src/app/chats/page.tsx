import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { NavbarWrapperChats } from "@/components";

const page = async ({}) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  return (
    <>
      {/* <div className="container py-12">
        <h1 className="font-bold text-5xl mb-8">Recent chats</h1>
        {chatsWithLastMessage.length === 0 ? (
          <p className="text-sm text-zinc-500">Nothing to show here...</p>
        ) : (
          chatsWithLastMessage.map((chat) => (
            <div
              key={chat.id}
              className="relative bg-zinc-50 border border-zinc-200 p-3 rounded-md"
            >
              <div className="absolute right-4 inset-y-0 flex items-center">
                <ChevronRight className="h-7 w-7 text-zinc-400" />
              </div>

              <Link
                href={`/chats/chat/${chatHrefConstructor(
                  session.user.id,
                  chat.id.toString()
                )}`}
                className="relative sm:flex"
              >
                <div>
                  <h4 className="text-lg font-semibold">{chat.name}</h4>
                  <p className="mt-1 max-w-md">
                    <span className="text-zinc-400">
                      {chat.lastMessage.senderId === session.user.id
                        ? "You: "
                        : ""}
                    </span>
                    {chat.lastMessage.text}
                  </p>
                </div>
              </Link>
            </div>
          ))
        )}
      </div> */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <NavbarWrapperChats />
        <div className="flex justify-center items-center h-full">
          <h2 className="font-bold text-2xl mb-4">
            Selecciona un chat para comenzar
          </h2>
        </div>
      </div>
    </>
  );
};

export default page;
