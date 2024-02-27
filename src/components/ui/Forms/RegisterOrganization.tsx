"use client";

import { FC, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import {
  registerOrganizationSchema,
} from "@/validations/auth.validation";
import { authRegisterOrganizationAction } from "@/actions/auth.action";
import { toast } from "sonner";

type Errors = {
  org_name?: string;
  org_acro?: string;
  org_cluni?: string;
  org_rfc?: string;
  org_email?: string;
  org_pass?: string;
} | null;

export const RegisterFormOrganization: FC = () => {
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
        org_name: formData.get("name") as string,
        org_acro: formData.get("acronym") as string,
        org_cluni: formData.get("cluni") as string,
        org_rfc: formData.get("rfc") as string,
        org_email: formData.get("email") as string,
        org_pass: formData.get("password") as string,
        org_path: window.location.pathname,
      };

      const validations = registerOrganizationSchema.safeParse(data);
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

      const res = await authRegisterOrganizationAction(data);
      if (res.message === "Este correo ya esta registrado") {
        setErrors({ org_email: "Este correo ya esta registrado" });
      }
      if (res.message === "El usuario y el negocio se registro correctamente") {
        window.location.href = "/auth/login";
        navigateTo("/auth/login");
      }
    } catch (e) {
      console.log("[ERROR_CLIENT_ACTION]", e);
      toast("¡Algo salio mal¡");
    } finally {
      setIsMutation(false);
    }
  };

  return (
    <section className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent">
      <div className="flex justify-center self-center z-10 w-1/2 shadow-xl">
        <div className="p-12 bg-white mx-auto rounded-3xl w-full">
          <div className="mb-7">
            <h3 className="font-semibold text-2xl text-gray-800">
              Registrar organización{" "}
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
                  placeholder="Nombre de la organizacion(OSC)"
                />
                {errors?.org_name && (
                    <p className="text-red-700 text-xs">{errors?.org_name}</p>
                )}
              </div>

              <div className="relative">
                <input
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-green-700"
                  type="text"
                  id="acronym"
                  name="acronym"
                  placeholder="Acrónimo"
                />
                {errors?.org_acro && (
                    <p className="text-red-700 text-xs">{errors?.org_acro}</p>
                )}
              </div>

              <div className="relative">
                <input
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-green-700"
                  type="text"
                  id="cluni"
                  name="cluni"
                  placeholder="CLUNI"
                />
                {errors?.org_cluni && (
                    <p className="text-red-700 text-xs">{errors?.org_cluni}</p>
                )}
              </div>

              <div className="relative">
                <input
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-green-700"
                  type="text"
                  id="rfc"
                  name="rfc"
                  placeholder="RFC"
                />
                {errors?.org_rfc && (
                    <p className="text-red-700 text-xs">{errors?.org_rfc}</p>
                )}
              </div>

              <div className="relative">
                <input
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-green-700"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Correo electrónico de la OSC"
                />
                {errors?.org_email && (
                    <p className="text-red-700 text-xs">{errors?.org_email}</p>
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
                {errors?.org_pass && (
                    <p className="text-red-700 text-xs">{errors?.org_pass}</p>
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
              <div className="flex items-center  space-x-2 my-5">
                <p className="text-gray-400">
                  ¿No eres una organización?{" "}
                  <NextLink
                    href="/auth/register/register_business"
                    className="text-sm text-green-700 hover:text-green-800 hover:underline"
                  >
                    Registrate como negocio
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
