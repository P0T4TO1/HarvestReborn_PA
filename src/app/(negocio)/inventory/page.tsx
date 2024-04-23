import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { ProductsInventory } from "@/components";

const InventoryPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session?.user.id_rol === 4) redirect("/auth/register?oauth=true");
  
  return (
    <>
      <section className="flex flex-col relative overflow-hidden min-h-screen">
        <ProductsInventory />
      </section>
    </>
  );
};

export default InventoryPage;
