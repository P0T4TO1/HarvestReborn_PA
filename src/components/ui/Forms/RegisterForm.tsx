"use client";

import { FC, useContext, useState } from "react";
import NextLink from "next/link";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

import { AuthContext } from "@/context/auth";
import { UserDataForm, ContactDataForm, PersonalDataForm } from "@/components";

export const RegisterForm: FC = () => {
  const { indexActive } = useContext(AuthContext);

  return (
    <section className="relative min-h-screen sm:flex flex-col items-center justify-center bg-transparent">
      <div className={`flex justify-center z-10 shadow-xl ${indexActive === 1 ? "xl:w-[396px] sm:w-full md:w-[428px]" : "xl:w-2/6 sm:w-full md:w-[620px]"}`}>
        <div className="p-12 bg-white mx-auto rounded-3xl w-full">
          <div className="mb-7 text-center">
            <p className="text-gray-700 text-4xl">
              {indexActive === 1
                ? "Datos de usuario"
                : indexActive === 2
                ? "Datos personales"
                : "Datos de contacto"}
            </p>
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

          <div className={`${indexActive !== 1 && "hidden"}`}>
            <UserDataForm />
          </div>

          <div className={`${indexActive !== 2 && "hidden"}`}>
            <PersonalDataForm />
          </div>

          <div className={`${indexActive !== 3 && "hidden"}`}>
            <ContactDataForm />
          </div>

          <div>
            <div className="flex items-center justify-center space-x-2 my-5 text-center">
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
          </div>
          <div className="flex items-center justify-center space-x-2 my-5">
            <span className="h-px w-full bg-gray-400"></span>
          </div>

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
