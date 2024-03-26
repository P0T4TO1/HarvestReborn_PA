import { AccountForm } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

const Account = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");

  return (
    <>
      <AccountForm />
    </>
  );
};

export default Account;