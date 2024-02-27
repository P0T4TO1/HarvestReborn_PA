"use client";

import { FC, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { registerBusinessSchema } from "@/validations/auth.validation";
import { authRegisterBusinessAction } from "@/actions/auth.action";

import { toast } from "sonner";

type Errors = {
  owner_name?: string;
  owner_surnames?: string;
  business_name?: string;
  business_tel?: string;
  business_email?: string;
  business_pass?: string;
} | null;

export const RegisterFormBusiness: FC = () => {
  const router = useRouter();
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
        owner_name: formData.get("name") as string,
        owner_surnames: formData.get("surnames") as string,
        business_name: formData.get("business_name") as string,
        business_tel: formData.get("telephone") as string,
        business_email: formData.get("email") as string,
        business_pass: formData.get("password") as string,
        business_path: window.location.pathname,
      };

      const validations = registerBusinessSchema.safeParse(data);
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

      const res = await authRegisterBusinessAction(data);
      if (res.message === "Este correo ya esta registrado") {
        setErrors({ business_email: "Este correo ya esta registrado" });
      }
      if (
        res.message === "El usuario y el negocio se registraron correctamente"
      ) {
        window.location.href = "/auth/login";
        navigateTo("/auth/login");
      }
    } catch (e) {
      console.info("[ERROR_CLIENT_ACTION]", e);
      toast("¡Algo salio mal!");
    } finally {
      setIsMutation(false);
    }
  };

  return (
    <section className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent pt-32">
      <div className="flex justify-center self-center z-10 w-2/5 shadow-xl">
        <div className="p-12 bg-white mx-auto rounded-3xl w-full">
          <div className="mb-7">
            <h3 className="font-semibold text-2xl text-gray-800">
              Registrar negocio local{" "}
            </h3>
            <p className="text-gray-400">
              ¿Ya tienes una cuenta?{" "}
              <NextLink
                href="/auth/login"
                className="text-sm text-green-700 hover:text-green-800 hover:underline"
              >
                Inicia sesión
              </NextLink>
            </p>
          </div>
          <form action={clientAction} className="space-y-6">
            <div className="grid grid-rows-3 grid-flow-col gap-6">
              <div className="relative">
                <input
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-green-700"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nombres(s)"
                />
                {errors?.owner_name && (
                  <p className="text-red-700 text-xs">{errors?.owner_name}</p>
                )}
              </div>

              <div className="relative">
                <input
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-green-700"
                  type="text"
                  id="surnames"
                  name="surnames"
                  placeholder="Apellidos"
                />
                {errors?.owner_surnames && (
                  <p className="text-red-700 text-xs">
                    {errors?.owner_surnames}
                  </p>
                )}
              </div>

              <div className="relative">
                <input
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-green-700"
                  type="text"
                  id="business_name"
                  name="business_name"
                  placeholder="Nombre del negocio"
                />
                {errors?.business_name && (
                  <p className="text-red-700 text-xs">
                    {errors?.business_name}
                  </p>
                )}
              </div>

              <div className="relative">
                <input
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-green-700"
                  type="text"
                  id="telephone"
                  name="telephone"
                  placeholder="Número telefónico"
                />
                {errors?.business_tel && (
                  <p className="text-red-700 text-xs">{errors?.business_tel}</p>
                )}
              </div>

              <div className="relative">
                <input
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-green-700"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Correo electrónico"
                />
                {errors?.business_email && (
                  <p className="text-red-700 text-xs">
                    {errors?.business_email}
                  </p>
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
                {errors?.business_pass && (
                  <p className="text-red-700 text-xs">
                    {errors?.business_pass}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isMutation}
                className="w-full flex justify-center bg-green-800 hover:bg-green-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
              >
                Registrarse
              </button>

              <div className="flex items-center justify-center space-x-2 my-5">
                <span className="h-px w-40 bg-gray-400"></span>
                <span className="text-gray-600 font-normal text-sm">
                  o registrate con
                </span>
                <span className="h-px w-40 bg-gray-400"></span>
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

              <div className="flex items-center  space-x-2 my-5">
                <p className="text-gray-400">
                  ¿No eres una negocio?{" "}
                  <NextLink
                    href="/auth/register/register_organization"
                    className="text-sm text-green-700 hover:text-green-800 hover:underline"
                  >
                    Registrate como organización
                  </NextLink>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2 my-5">
              <span className="h-px w-full bg-gray-400"></span>
            </div>
          </form>

          <div className="mt-7 text-center text-gray-500 text-xs">
            <p className="text-xs">
              Una vez registrado, aceptas nuestros{" "}
              <a href="#" className="underline">
                Términos de uso
              </a>{" "}
              y confirmas que leiste nuestro{" "}
              <a href="#" className="underline">
                Aviso de Privacidad
              </a>
              .
            </p>
            <span className="flex justify-center mt-2">
              Copyright © 2024
              <p
                title="Harvest Reborn"
                className="text-green-500 hover:text-green-600"
              >
                {" "}
                Harvest Reborn
              </p>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
