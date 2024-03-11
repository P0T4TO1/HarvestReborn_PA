import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils/authOptions";
import { redirect } from "next/navigation";
import { NegociosList } from "@/components";

const NegociosPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  return (
    <>
      <section className="flex flex-col relative overflow-hidden min-h-screen py-20">
        <NegociosList />
      </section>
    </>
  );
};

export default NegociosPage;
