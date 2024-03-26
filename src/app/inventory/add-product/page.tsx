import { AddProductLote } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

const AddProductPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");

  return (
    <section className="flex flex-col relative overflow-hidden min-h-screen">
      <AddProductLote />
    </section>
  );
};

export default AddProductPage;
