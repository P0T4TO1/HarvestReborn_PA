import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { ProductsList } from "@/components/ui/Inventory/ProductsList";

const InventoryPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  return (
    <>
      <section className="flex flex-col relative overflow-hidden min-h-screen">
        <ProductsList />
      </section>
    </>
  );
};

export default InventoryPage;
