import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { SidebarWrapper, NegocioInfoAdmin } from "@/components";

interface Props {
  params: { id: number };
}

const AdminDashboardNegociosNamePage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session?.user.id_rol !== 1) redirect("/home");
  return (
    <>
      <NegocioInfoAdmin id_negocio={params.id} />
    </>
  );
};

export default AdminDashboardNegociosNamePage;
