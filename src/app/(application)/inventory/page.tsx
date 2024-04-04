import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { ProductsInventory } from "@/components";

const InventoryPage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user.id_rol === 4) redirect("/auth/register?oauth=true");
  if (!session) redirect("/auth/login");
  return (
    <>
      <section className="flex mt-16 flex-col relative overflow-hidden min-h-screen">
        <ProductsInventory />
      </section>
    </>
  );
};

export default InventoryPage;
