"use client"

import { FC } from "react";
import { useRouter } from "next/navigation";

export const RegisterSelect: FC = () => {
  const router = useRouter();
  const navigateTo = (url: string) => {
    router.push(url);
  };

  return (
    <div className="relative py-16 min-h-screen flex">
      <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
        <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
          <div className="rounded-xl bg-white shadow-xl">
            <div className="p-6 sm:p-16">
              <div className="space-y-4">
                <h2 className="mb-8 text-2xl text-green-800 font-bold">
                  Selecciona como quieres <br /> registrarte.
                </h2>
              </div>
              <div className="mt-16 grid space-y-4">
                <button
                  onClick={() => navigateTo("/auth/register/register_business")}
                  className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                >
                  <div className="relative flex items-center space-x-4 justify-center">
                    <span className="material-symbols-outlined">
                      local_convenience_store
                    </span>
                    <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                      Negocio local
                    </span>
                  </div>
                </button>
                <button
                  onClick={() =>
                    navigateTo("/auth/register/register_organization")
                  }
                  className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                >
                  <div className="relative flex items-center space-x-4 justify-center">
                    <span className="material-symbols-outlined">apartment</span>
                    <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                      Organización benéfica
                    </span>
                  </div>
                </button>
              </div>

              <div className="mt-32 space-y-4 text-gray-600 text-center sm:-mb-8">
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
                {/*<p className="text-xs">
                      This site is protected by reCAPTCHA and the{" "}
                      <a href="#" className="underline">
                          Google Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a href="#" className="underline">
                          Terms of Service
                      </a>{" "}
                      apply.
                  </p>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
