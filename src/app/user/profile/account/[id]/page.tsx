import { AccountForm } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

const Account = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user.id_rol === 4) redirect("/auth/register?oauth=true");
  if (!session) redirect("/auth/login");

  return (
    <>
      <AccountForm />
    </>
  );
};

export default Account;
