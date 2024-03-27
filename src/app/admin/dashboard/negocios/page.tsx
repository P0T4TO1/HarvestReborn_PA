import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { SidebarWrapper, NegociosAdmin } from "@/components";

const NegociosPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session?.user.id_rol !== 1) redirect("/home");
  return (
    <div className="flex">
      <div>
        <SidebarWrapper />
      </div>
      <NegociosAdmin />
    </div>
  );
};

export default NegociosPage;
