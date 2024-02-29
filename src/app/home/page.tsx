import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils/authOptions";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1>Home page logged in</h1>
    </div>
  );
};

export default HomePage;
