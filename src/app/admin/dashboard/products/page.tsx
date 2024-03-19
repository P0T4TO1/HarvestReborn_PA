import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils/authOptions";
import { redirect } from "next/navigation";
import { SidebarWrapper, Products } from "@/components";

const ProductsPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  return (
    <div className="flex">
      <div>
        <SidebarWrapper />
      </div>
      <Products />
    </div>
  );
};

export default ProductsPage;
