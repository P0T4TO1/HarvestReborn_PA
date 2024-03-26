import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

const MiNegocioPage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user.id_rol !== 2) redirect("/home");
  return (
    <div className="min-h-screen flex justify-center items-center">
      Mi negocio
    </div>
  );
};

export default MiNegocioPage;