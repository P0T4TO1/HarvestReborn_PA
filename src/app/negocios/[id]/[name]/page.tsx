import { NegocioProducts } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

interface NegocioInfoPageProps {
  params: {
    id: number;
    name: string;
  };
}
const NegocioInfoPage = async ({ params }: NegocioInfoPageProps) => {
  const session = await getServerSession(authOptions);
  if (session?.user.id_rol === 4) redirect("/auth/register?oauth=true");
  const { id, name } = params;
  return (
    <>
      <section className="flex flex-col relative overflow-hidden min-h-screen">
        <NegocioProducts id_negocio={id} nombre_negocio={name} />
      </section>
    </>
  );
};

export default NegocioInfoPage;
