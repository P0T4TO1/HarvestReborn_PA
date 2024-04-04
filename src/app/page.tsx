import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import {
  DescriptionComponent,
  ServicesComponent,
  AboutUsComponent,
  NavbarComponent,
  Footer,
} from "@/components";

const LandingPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/home");
  return (
    <>
      <NavbarComponent />
      <DescriptionComponent />
      <ServicesComponent />
      <AboutUsComponent />
      <Footer />
    </>
  );
};

export default LandingPage;
