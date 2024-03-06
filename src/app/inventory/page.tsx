import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils/authOptions";
import { redirect } from "next/navigation";
import { ProductsList } from "@/components/ui/Inventory/ProductsList";

const InventoryPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  return (
    <>
      <section className="flex relative justify-center overflow-hidden min-h-screen py-20">
        <ProductsList />
      </section>
    </>
  );
};

export default InventoryPage;
