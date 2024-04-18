import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { HomeDashboard } from "@/components";

const AdminDashboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session?.user.id_rol !== 1) redirect("/home");
  return (
    <>
      <HomeDashboard />
    </>
  );
};

export default AdminDashboardPage;
