import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { SidebarWrapper, ProductsAdmin } from "@/components";

const ProductsPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  return (
    <div className="flex">
      <div>
        <SidebarWrapper />
      </div>
      <ProductsAdmin />
    </div>
  );
};

export default ProductsPage;
