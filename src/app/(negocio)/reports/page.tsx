import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect, notFound } from "next/navigation";
import { ReportsSection } from "@/components";
import { getOrders, getLotes } from "@/actions/negocio";
import { IOrden, ILote } from "@/interfaces";
import prisma from "@/lib/prisma";

export const revalidate = 3600;

const ReportsPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session?.user.id_rol !== 2) redirect("/home");

  const user = await prisma.d_duenonegocio.findUnique({
    where: { id_user: session.user.id },
    include: { negocio: true },
  });

  if (!user?.negocio?.id_negocio) notFound();

  const orders = await getOrders(user?.negocio?.id_negocio);
  const lotes = await getLotes(user?.negocio?.id_negocio);

  return (
    <section className="flex flex-col relative overflow-hidden min-h-screen">
      <ReportsSection
        orders={orders as IOrden[] | any}
        lotes={lotes as ILote[] | any}
      />
    </section>
  );
};

export default ReportsPage;
