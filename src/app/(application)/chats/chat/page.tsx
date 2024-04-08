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
    return <div>Chat {searchParams.user}</div>;
  }
  return <div>Chat</div>;
};

export default ChatPage;