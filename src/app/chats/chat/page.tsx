import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

interface ChatPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ChatPage = async ({ searchParams }: ChatPageProps) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  if (searchParams.user) {
    return (
      <section className="flex mt-16 flex-col relative overflow-hidden min-h-screen">
        <div>Chat {searchParams.user}</div>
      </section>
    );
  }
  return (
    <section className="flex mt-16 flex-col relative overflow-hidden min-h-screen">
      <div>Chat</div>
    </section>
  );
};

export default ChatPage;
