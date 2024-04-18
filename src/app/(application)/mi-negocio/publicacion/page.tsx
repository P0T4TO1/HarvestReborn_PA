import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { PublicacionSection } from "@/components";

const PublicacionPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session?.user.id_rol !== 2) redirect("/home");
  return (
    <section className="w-full flex flex-col pt-16 md:flex-row text-[#161931] min-h-screen">
      <PublicacionSection />
    </section>
  );
};

export default PublicacionPage;