import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { SidebarWrapper, ClientesAdmin } from "@/components";

const ClientesPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session?.user.id_rol !== 1) redirect("/home");
  return (
    <div className="flex">
      <div>
        <SidebarWrapper />
      </div>
      <ClientesAdmin />
    </div>
  );
};

export default ClientesPage;
