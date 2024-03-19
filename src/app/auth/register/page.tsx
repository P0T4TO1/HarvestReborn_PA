import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { RegisterForm } from "@/components";

const Register = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");
  return (
    <>
      <RegisterForm />
    </>
  );
};

export default Register;
