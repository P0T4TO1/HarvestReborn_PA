import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { SidebarWrapper } from "@/components";

const AdminDashboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  return (
    <>
      <SidebarWrapper />
    </>
  );
};

export default AdminDashboardPage;
