import { NextPage } from "next";
import { authOptions } from "@/lib/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { RegisterFormBusiness } from "@/components";

const LoginPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");
  return (
    <>
      <RegisterFormBusiness />
    </>
  );
};

export default LoginPage;
