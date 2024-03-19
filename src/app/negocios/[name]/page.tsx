import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { NegocioInfo } from "@/components";

const NegocioInfoPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  return (
    <>
      <section className="flex flex-col relative overflow-hidden min-h-screen py-20">
        <NegocioInfo />
      </section>
    </>
  );
};

export default NegocioInfoPage;