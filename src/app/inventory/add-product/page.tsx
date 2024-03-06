import { AddProduct } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils/authOptions";
import { redirect } from "next/navigation";

const AddProductPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  return (
    <div className="pt-32 px-16 min-h-screen w-full">
      <h1 className="font-bebas-neue uppercase text-4xl font-black flex flex-col leading-none text-green-900">
        Agregar productos
      </h1>
      <p className="text-xl text-gray-900 font-semibold">
        Aquí puedes agregar productos a tu inventario
      </p>
      <AddProduct />
    </div>
  );
};

export default AddProductPage;
