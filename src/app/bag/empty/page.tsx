import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import React from "react";

const BagPage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user.id_rol === 2) redirect("/inventory");

  return (
    <>
      <section className="flex flex-col relative overflow-hidden min-h-screen">
        <div className="flex items-center justify-center m-auto">
          <p>No hay productos en la bolsa</p>
        </div>
      </section>
    </>
  );
};

export default BagPage;
