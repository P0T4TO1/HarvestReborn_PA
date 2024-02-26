"use client";

import { FC } from "react";
import NextLink from "next/link";

type FormData = {
  name: string;
  acronym: string;
  cluni: string;
  rfc: string;
  email: string;
  password: string;
};

export const RegisterFormOrganization: FC = () => {

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
          <form
            noValidate
            className="space-y-6"
          >
            <div className="grid grid-rows-3 grid-flow-col gap-6">
              <div className="relative">
                <input
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-green-700"
                  type="text"
                  placeholder="Nombre de la organizacion(OSC)"
                />
              </div>

              <div className="relative">
                <input
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-green-700"
                  type="text"
                  placeholder="Acrónimo"
                />
              </div>

              <div className="relative">
                <input
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-green-700"
                  type="text"
                  placeholder="CLUNI"
                />
              </div>

              <div className="relative">
                <input
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-green-700"
                  type="text"
                  placeholder="RFC"
                />
              </div>

              <div className="relative">
                <input
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-green-700"
                  type="email"
                  placeholder="Correo electrónico de la OSC"
                />
              </div>

              <div className="relative">
                <input
                  placeholder="Contraseña"
                  type="password"
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
              </div>
            </div>

            <div>
              <button
                type="submit"
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
