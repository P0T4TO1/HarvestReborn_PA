import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { HomeCliente, HomeNegocio } from "@/components";

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user.id_rol === 4) redirect("/auth/register?oauth=true");
  if (session?.user.id_rol === 1) redirect("/admin/dashboard");
  if (session?.user.id_rol === 3) redirect("/negocios");
  if (!session) redirect("/auth/login");
  return (
    <>
      <section className="flex flex-col relative overflow-hidden min-h-screen">
        {session?.user.id_rol === 2 ? <HomeNegocio /> : <HomeCliente />}
      </section>
    </>
  );
};

export default HomePage;
