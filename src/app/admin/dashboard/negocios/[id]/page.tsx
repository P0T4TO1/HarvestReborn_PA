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
      <div className="my-10 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
        <NegocioInfoAdmin id_negocio={params.id} />
      </div>
    </>
  );
};

export default AdminDashboardNegociosNamePage;
