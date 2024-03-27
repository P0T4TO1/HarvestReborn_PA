import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { SidebarWrapper, AddUserForm } from "@/components";

const AddUsersPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session?.user.id_rol !== 1) redirect("/home");
  return (
    <div className="flex">
      <div>
        <SidebarWrapper />
      </div>
      <AddUserForm />
    </div>
  );
};

export default AddUsersPage;
