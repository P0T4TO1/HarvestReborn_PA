import { RegisterForm } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

interface RegisterPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Register = async ({ searchParams }: RegisterPageProps) => {
  if (searchParams.oauth === "true") {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    return <RegisterForm user={user} />;
  }

  return <RegisterForm />;
};

export default Register;
