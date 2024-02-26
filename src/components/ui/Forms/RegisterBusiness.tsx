"use client";

import { FC } from "react";
import NextLink from "next/link";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export const RegisterFormBusiness: FC = () => {

  return (
    <section className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent">
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
          <form className="space-y-6">
            <div className="grid grid-rows-2 grid-flow-col gap-6">
              <div className="relative">
                <input
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-green-700"
                  type="text"
                  placeholder="Nombres(s)"
                />
              </div>

              <div className="relative">
                <input
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-green-700"
                  type="text"
                  placeholder="Apellidos"
                />
              </div>

              <div className="relative">
                <input
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-green-700"
                  type="text"
                  placeholder="Nombre del negocio"
                />
              </div>

              <div className="relative">
                <input
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-green-700"
                  type="email"
                  placeholder="Correo electrónico"
                />
              </div>
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

            <div>
              <button
                type="submit"
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
