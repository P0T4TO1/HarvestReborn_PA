"use client";

import { FC } from "react";

import NextLink from "next/link";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

type FormData = {
  email: string;
  password: string;
};
export const LoginForm: FC = () => {
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
          <form noValidate>
            <div className="space-y-6">
              <div className="relative">
                <input
                  className="w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-green-700"
                  type="email"
                  placeholder="Email"
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

              <div className="flex items-center justify-between">
                <div className="text-sm ml-auto">
                  <a href="#" className="text-green-800 hover:text-green-600">
                    Olvidaste tu contraseña?
                  </a>
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
