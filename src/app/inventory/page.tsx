import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { ProductsInventory } from "@/components";

const InventoryPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  return (
    <>
      <section className="flex flex-col relative overflow-hidden min-h-screen">
        <ProductsInventory />
      </section>
    </>
  );
};

export default InventoryPage;
