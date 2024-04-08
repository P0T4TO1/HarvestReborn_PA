import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { Spinner } from "@nextui-org/react";

const ChatsPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session?.user.id_rol === 4) redirect("/auth/register?oauth=true");
  if (session?.user.id_rol === 1) redirect("/admin/dashboard");
  
  return (
    <>
      {!session ? (
        <div className="flex flex-col items-center justify-center">
          <Spinner size="lg" />
          <p>Cargando...</p>
        </div>
      ) : (
        <section className="flex flex-col relative overflow-hidden min-h-screen">
          {/* <Chats /> */}
          <h2>Chats</h2>
        </section>
      )}
    </>
  );
};
