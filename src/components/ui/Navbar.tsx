import NextLink from "next/link";
import React, { useState } from "react";
import { Dropdown } from "./Dropdown";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-green-800 w-full z-30 fixed">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-200 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Abrir/cerrar menú</span>

              {/* Cambiamos el icono dependiendo del estado del menú */}
              {mobileMenuOpen ? (
                <span className="material-symbols-outlined">menu_open</span>
              ) : (
                <span className="material-symbols-outlined">menu</span>
              )}
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-center sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="h-24 w-auto"
                src="/images/logo.png"
                alt="Harvest Reborn"
              />
            </div>
            <div className="hidden sm:ml-8 sm:block">
              <div className="flex space-x-4">
                <NextLink
                  href={"/#"}
                  className="text-gray-200 hover:text-gray-300 rounded-md px-3 py-2 text-base font-semibold"
                >
                  Inicio
                </NextLink>
                <NextLink
                  href={"/#servicios"}
                  className="text-gray-200 hover:text-gray-300 rounded-md px-3 py-2 text-base font-semibold"
                >
                  Cómo funciona
                </NextLink>
                <NextLink
                  href={"/#aboutUs"}
                  className="text-gray-200 hover:text-gray-300 px-3 py-2 text-base font-semibold"
                >
                  Acerca de nosotros
                </NextLink>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div>
              <Dropdown />
            </div>
          </div>
        </div>
      </div>

      {/* Utilizamos el estado `mobileMenuOpen` para controlar la visibilidad del menú */}
      <div
        className={`sm:hidden ${mobileMenuOpen ? "" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pb-3 pt-2">
          <NextLink
            href={"/#"}
            className="text-gray-300 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            aria-current="page"
          >
            Inicio
          </NextLink>
          <NextLink
            href={"/#servicios"}
            className="text-gray-300 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            ¿Como funciona?
          </NextLink>
          <NextLink
            href={"/#aboutUs"}
            className="text-gray-300 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Acerca de nosotros
          </NextLink>
        </div>
      </div>
    </nav>
  );
};
