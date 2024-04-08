import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { MiNegocioSection } from "@/components";

const MiNegocioPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session?.user.id_rol !== 2) redirect("/home");
  return (
    <section className="min-h-screen">
      <MiNegocioSection />
    </section>
  );
};

export default MiNegocioPage;
