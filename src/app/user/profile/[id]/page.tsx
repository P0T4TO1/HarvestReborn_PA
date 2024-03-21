import { ProfileForm } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

const Profile = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  return (
    <>
      <ProfileForm />
    </>
  );
};

export default Profile;
