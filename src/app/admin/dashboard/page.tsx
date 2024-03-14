import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils/authOptions";
import { redirect } from "next/navigation";

const AdminDashboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  return (
    <div className="min-h-screen">

    </div>
  );
};

export default AdminDashboardPage;
