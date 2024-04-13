import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { UsersAdmin } from "@/components";

const UsersPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session?.user.id_rol !== 1) redirect("/home");
  return (
    <>
      <UsersAdmin />
    </>
  );
};

export default UsersPage;
