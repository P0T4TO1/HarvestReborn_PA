import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { Spinner } from "@nextui-org/react";
import { ChatsView } from "@/components";
import { SidebarWrapperChats } from "@/components/ui/Sidebar/siderbar-chats";
import { NavbarWrapperChats } from "@/components/ui/navbar/ChatsNavbar";

const ChatsPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session?.user.id_rol === 4) redirect("/auth/register?oauth=true");
  if (session?.user.id_rol === 1) redirect("/admin/dashboard");

  return (
    <>
      {!session ? (
        <div className="flex flex-col items-center justify-center">
          <Spinner size="lg" />
          <p>Cargando...</p>
        </div>
      ) : (
        <div className="flex">
          <SidebarWrapperChats />
          <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {/* <NavbarWrapperChats /> */}
            {/** Chats */}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatsPage;
