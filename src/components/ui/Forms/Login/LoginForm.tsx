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
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { DANGER_TOAST, SUCCESS_TOAST } from "@/components";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEmailVerified } from "@/hooks";
import { IUser } from "@/interfaces";

interface IFormData {
  user_email: string;
  user_password: string;
}

export const LoginForm: FC = () => {
  const router = useRouter();
  const { loginUser } = useContext(AuthContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<IFormData>({
    resolver: zodResolver(loginSchema),
  });
  const [visible, setVisible] = useState<boolean>(false);

  const clientAction: SubmitHandler<IFormData> = async (data) => {
    try {
      const result = await loginUser(data.user_email, data.user_password);

      const isEmailVerifiedRes = await isEmailVerified(data.user_email);

      if (!result) {
        setError("user_email", {
          message: "Correo o contraseña inválidos",
        });
        setError("user_password", {
          message: "Correo o contraseña inválidos",
        });
        return null;
      }

      if (isEmailVerifiedRes.message === "Este correo no ha sido verificado") {
        setError("user_email", {
          message: "Este correo no ha sido verificado",
        });
        return null;
      } else if (
        isEmailVerifiedRes.message === "Este usuario se encuentra inactivo"
      ) {
        setError("user_email", {
          message: "Este usuario se encuentra inactivo",
        });
        return null;
      }
      const res: SignInResponse | undefined = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (res?.error === "CredentialsSignin") {
        setError("user_email", {
          message: "Correo o contraseña inválidos",
        });
        setError("user_password", {
          message: "Correo o contraseña inválidos",
        });
      }
      if (res && res.ok && res.status === 200) {
        toast("¡Bienvenido!", SUCCESS_TOAST);
        router.push("/home");
        return;
      }
    } catch (e) {
      console.info("[ERROR_CLIENT_ACTION]", e);
      toast("¡Algo salio mal!", DANGER_TOAST);
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
          <form onSubmit={handleSubmit(clientAction)}>
            <div className="space-y-6">
              <div className="relative">
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  {...register("user_email")}
                />
                {errors?.user_email && (
                  <p className="text-red-500 text-xs">
                    {errors?.user_email.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <Input
                  placeholder="Contraseña"
                  type={visible ? "text" : "password"}
                  id="password"
                  {...register("user_password")}
                  endContent={
                    <button
                      type="button"
                      onClick={() => setVisible(!visible)}
                      className="flex items-center absolute inset-y-0 right-0 mr-3 cursor-pointer text-sm leading-5 text-green-700"
                    >
                      {visible ? (
                        <span className="material-symbols-outlined">
                          visibility_off
                        </span>
                      ) : (
                        <span className="material-symbols-outlined">
                          visibility
                        </span>
                      )}
                    </button>
                  }
                />
                {errors?.user_password && (
                  <p className="text-red-700 text-xs">
                    {errors?.user_password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm ml-auto">
                  <Link
                    href={"/auth/reset-password"}
                    className="text-green-800 hover:text-green-600"
                  >
                    Olvidaste tu contraseña?
                  </Link>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center bg-green-800 hover:bg-green-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
                >
                  Iniciar sesión
                </button>
              </div>
              <div className="flex items-center justify-center space-x-2 my-5">
                <span className="h-px w-16 bg-gray-400"></span>
                <span className="text-gray-700 font-normal text-sm text-center">
                  O también puedes iniciar sesión con
                </span>
                <span className="h-px w-16 bg-gray-400"></span>
              </div>
              <div className="flex justify-center gap-5 w-full ">
                <button
                  onClick={() => signIn("google")}
                  className="w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:border-gray-500 hover:text-yellow-700 text-sm text-gray-500 p-3  rounded-lg tracking-wide font-medium  cursor-pointer transition ease-in duration-500"
                >
                  <FcGoogle className="mr-2" />
                  <span>Google</span>
                </button>

                <button
                  onClick={() => signIn("facebook")}
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
                href="https://github.com/P0T4TO1"
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
