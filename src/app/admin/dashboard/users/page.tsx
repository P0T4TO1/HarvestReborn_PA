import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils/authOptions";
import { redirect } from "next/navigation";
import { SidebarWrapper, Accounts } from "@/components";

const UsersPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  return (
    <div className="flex">
      <div>
        <SidebarWrapper />
      </div>
      <Accounts />
    </div>
  );
};

export default UsersPage;
