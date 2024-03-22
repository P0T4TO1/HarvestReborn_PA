import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import {
  DescriptionComponent,
  ServicesComponent,
  AboutUsComponent,
} from "@/components";

const Home = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/home");
  return (
    <>
      <DescriptionComponent />
      <ServicesComponent />
      <AboutUsComponent />
    </>
  );
};

export default Home;
