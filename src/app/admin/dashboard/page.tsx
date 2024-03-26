import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { SidebarWrapper, HomeDashboard } from "@/components";

const AdminDashboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  return (
    <div className="flex">
      <div>
        <SidebarWrapper />
      </div>
      <div className="my-10 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
        <HomeDashboard />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
