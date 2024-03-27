import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { SidebarWrapper, UsersAdmin } from "@/components";

const UsersPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session?.user.id_rol !== 1) redirect("/home");
  return (
    <div className="flex">
      <div>
        <SidebarWrapper />
      </div>
      <UsersAdmin />
    </div>
  );
};

export default UsersPage;
