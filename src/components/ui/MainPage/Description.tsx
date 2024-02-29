"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const DescriptionComponent: FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const navigateTo = (url: string) => {
    router.push(url);
  };

  return (
    <section
      className="flex relative items-center overflow-hidden min-h-screen"
      id="inicio"
    >
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-32 flex relative py-8 sm:py-16">
        <div className="w-full sm:w-1/2 flex flex-col relative z-20 justify-center">
          <h1 className="font-bebas-neue uppercase text-4xl sm:text-5xl lg:text-6xl font-black flex flex-col leading-none text-green-900">
            Unidos
            <span className="text-5xl sm:text-6xl lg:text-7xl text-gray-900">
              Desperdiciamos menos
            </span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-700 mt-4 sm:mt-6">
            El lugar donde tu negocio ayuda a reducir el desperdicio de frutas y
            verduras en la Ciudad de México
          </p>
          <div className="flex mt-6 sm:mt-8">
            {session ? (
              <button
                onClick={() => navigateTo("/user/dashboard")}
                type="button"
                className="py-2 sm:py-3 px-4 sm:px-5 rounded-lg bg-transparent border-2 text-green-700 border-green-700 font-semibold hover:text-gray-900 text-sm sm:text-md transition ease-in duration-[400ms]"
              >
                Dashboard
              </button>
            ) : (
              <button
                onClick={() => navigateTo("/auth/login")}
                type="button"
                className="py-2 sm:py-3 px-4 sm:px-5 rounded-lg bg-transparent border-2 text-green-700 border-green-700 font-semibold hover:text-gray-900 text-sm sm:text-md transition ease-in duration-[400ms]"
              >
                Únete ahora
              </button>
            )}

            <button
              onClick={() => navigateTo("/#servicios")}
              type="button"
              className="ml-2 sm:ml-3 py-2 sm:py-3 px-4 sm:px-5 rounded-lg bg-green-700 border-2 text-gray-900 border-green-700 font-semibold hover:text-white text-sm sm:text-md transition ease-in duration-[400ms]"
            >
              Conoce más
            </button>
          </div>
        </div>
        <div className="hidden sm:block w-1/2 relative">
          <img
            src="/images/Apilados.png"
            className="max-w-xs sm:max-w-sm lg:max-w-md m-auto"
          />
        </div>
      </div>
    </section>
  );
};
