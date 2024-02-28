import { authOptions } from "@/lib/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { RegisterSelect } from "@/components";

const Register = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");
  return (
    <>
      <RegisterSelect />
    </>
  );
};

export default Register;
