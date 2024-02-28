"use client";

import { FC, useState, useContext } from "react";

import NextLink from "next/link";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/validations/auth.validation";
import { signIn, SignInResponse } from "next-auth/react";
import { toast } from "sonner";
import { AuthContext } from "@/context/auth";

type Errors = {
  user_email?: string;
  user_pass?: string;
} | null;

export const LoginForm: FC = () => {
  const router = useRouter();
  const { loginUser } = useContext(AuthContext);
  const navigateTo = (url: string) => {
    router.push(url);
  };
  const [errors, setErrors] = useState<Errors>(null);
  const [isMutation, setIsMutation] = useState<boolean>(false);

  const clientAction = async (formData: FormData) => {
    if (isMutation) return null;
    setIsMutation(true);

    try {
      const data = {
        user_email: formData.get("email") as string,
        user_password: formData.get("password") as string,
      };

      const validations = loginSchema.safeParse(data);
      if (!validations.success) {
        let newErrors: Errors = {};

        validations.error.issues.forEach((issue) => {
          newErrors = { ...newErrors, [issue.path[0]]: issue.message };
        });

        setErrors(newErrors);
        return null;
      } else {
        setErrors(null);
      }

      const result = await loginUser(data.user_email, data.user_password);

      if (!result) {
        setErrors({
          user_email: "Correo o contraseña inválidos",
          user_pass: "Correo o contraseña inválidos",
        });
        return null;
      }

      const res: SignInResponse | undefined = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (res?.error === "CredentialsSignin") {
        setErrors({
          user_email: "Correo o contraseña inválidos",
          user_pass: "Correo o contraseña inválidos",
        });
      }
      if (res && res.ok && res.status === 200) {
        navigateTo("/");
      }
    } catch (e) {
      console.info("[ERROR_CLIENT_ACTION]", e);
      toast("¡Algo salio mal!");
    } finally {
      setIsMutation(false);
    }
  };

  return (
    <section className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent">
      <div className="flex justify-center self-center z-10 shadow-xl">
        <div className="p-12 bg-white mx-auto rounded-3xl w-96 ">
          <div className="mb-7">
            <h3 className="font-semibold text-2xl text-gray-800">
              Iniciar sesión{" "}
            </h3>
            <p className="text-gray-400">
              ¿No tienes una cuenta?{" "}
              <NextLink
                href="/auth/register"
                className="text-sm text-green-700 hover:text-green-800 hover:underline"
              >
                Regístrate
              </NextLink>
            </p>
          </div>
          <form action={clientAction}>
            <div className="space-y-6">
              <div className="relative">
                <input
                  className="w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-green-700"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                />
                {errors?.user_email && (
                  <p className="text-red-500 text-xs">{errors?.user_email}</p>
                )}
              </div>

              <div className="relative">
                <input
                  placeholder="Contraseña"
                  type="password"
                  id="password"
                  name="password"
                  className="text-sm px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-green-700"
                />
                <div className="flex items-center absolute inset-y-0 right-0 mr-3  text-sm leading-5 text-green-700">
                  <span className="material-symbols-outlined cursor-pointer">
                    visibility
                  </span>

                  <span className="material-symbols-outlined cursor-pointer hidden">
                    visibility_off
                  </span>
                </div>
                {errors?.user_pass && (
                  <p className="text-red-700 text-xs">{errors?.user_pass}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm ml-auto">
                  <a href="#" className="text-green-800 hover:text-green-600">
                    Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
              <div>
                <button
                  disabled={isMutation}
                  type="submit"
                  className="w-full flex justify-center bg-green-800 hover:bg-green-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
                >
                  Iniciar sesión
                </button>
              </div>
              <div className="flex items-center justify-center space-x-2 my-5">
                <span className="h-px w-16 bg-gray-400"></span>
                <span className="text-gray-700 font-normal text-sm text-center">
                  Si eres un negocio puedes iniciar con las siguientes opciones
                </span>
                <span className="h-px w-16 bg-gray-400"></span>
              </div>
              <div className="flex justify-center gap-5 w-full ">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:border-gray-500 hover:text-yellow-700 text-sm text-gray-500 p-3  rounded-lg tracking-wide font-medium  cursor-pointer transition ease-in duration-500"
                >
                  <FcGoogle className="mr-2" />
                  <span>Google</span>
                </button>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:border-gray-500 hover:text-blue-700 text-sm text-gray-500 p-3  rounded-lg tracking-wide font-medium  cursor-pointer transition ease-in duration-500 px-"
                >
                  <FaFacebook className="mr-2 text-blue-700" />
                  <span>Facebook</span>
                </button>
              </div>
            </div>
          </form>
          <div className="mt-7 text-center text-gray-500 text-xs">
            <span>
              Copyright © 2024
              <a
                href="https://codepen.io/uidesignhub"
                rel=""
                target="_blank"
                title="Codepen aji"
                className="text-green-500 hover:text-green-600"
              >
                {" "}
                Harvest Reborn
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
