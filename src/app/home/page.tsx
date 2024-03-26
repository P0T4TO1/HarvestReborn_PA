import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user.id_rol === 4) redirect("/auth/register?oauth=true");
  if (session?.user.id_rol === 1) redirect("/admin/dashboard");
  if (!session) redirect("/auth/login");
  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1>Home page logged in</h1>
    </div>
  );
};

export default HomePage;
