import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { SidebarWrapper, UserInfoAdmin } from "@/components";

interface Props {
  params: { id: string };
}

const AdminDashboardUserPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session?.user.id_rol !== 1) redirect("/home");
  return (
    <div className="flex">
      <div>
        <SidebarWrapper />
      </div>
      <div className="my-10 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
        <UserInfoAdmin id_user={params.id} />
      </div>
    </div>
  );
};

export default AdminDashboardUserPage;
