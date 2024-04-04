import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { SidebarWrapper, HomeDashboard } from "@/components";

const AdminDashboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session?.user.id_rol !== 1) redirect("/home");
  return (
    <>
      <div className="my-10 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
        <HomeDashboard />
      </div>
    </>
  );
};

export default AdminDashboardPage;
