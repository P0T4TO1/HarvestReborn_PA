import React from "react";

import { FaGithub, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import NextLink from "next/link";

export const Footer = () => {
  return (
    <>
      <footer className="relative bg-blueGray-200 pb-6">
        <hr className="mb-6 border-blueGray-300" />
        <div className="container mx-auto px-4 pt-8">
          <div className="flex flex-wrap text-left lg:text-left">
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex items-center -ml-6">
                <Image
                  src={"/images/logo.png"}
                  alt={"logoFooter"}
                  width={100}
                  height={100}
                />
                <h4 className="text-3xl font-bold text-green-900">
                  Harvest Reborn
                </h4>
              </div>
              <div className="mt-6 lg:mb-0 mb-6 flex">
                <NextLink
                  target={"_blank"}
                  href="https://github.com/P0T4TO1"
                  className="flex bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <FaGithub />
                </NextLink>
                <NextLink
                  target={"_blank"}
                  href={"facebook.com"}
                  className="bg-white flex text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <FaFacebook />
                </NextLink>
                <NextLink
                  target={"_blank"}
                  href={"twitter.com"}
                  className="flex bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <FaXTwitter />
                </NextLink>
                <NextLink
                  target={"_blank"}
                  href={"instagram.com"}
                  className="flex bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <FaInstagram />
                </NextLink>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full lg:w-4/12 px-4 ml-auto">
                  <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Navegación
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <NextLink
                        className="font-semibold block pb-2 text-sm hover:text-gray-800"
                        href={"/"}
                      >
                        Inicio
                      </NextLink>
                    </li>
                    <li>
                      <NextLink
                        className="font-semibold block pb-2 text-sm hover:text-gray-800"
                        href={"/negocios"}
                      >
                        Recauderías
                      </NextLink>
                    </li>
                    <li>
                      <NextLink
                        className="font-semibold block pb-2 text-sm hover:text-gray-800"
                        href="/#aboutUs"
                      >
                        Acerca de nosotros
                      </NextLink>
                    </li>
                    <li>
                      <NextLink
                        className="font-semibold block pb-2 text-sm hover:text-gray-800"
                        href={"/contact"}
                      >
                        Contacto
                      </NextLink>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Otros recursos
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <NextLink
                        className="font-semibold block pb-2 text-sm hover:text-gray-800"
                        href={"terms-conditions"}
                      >
                        Términos y condiciones
                      </NextLink>
                    </li>
                    <li>
                      <NextLink
                        className="font-semibold block pb-2 text-sm hover:text-gray-800"
                        href={"privacy-policy"}
                      >
                        Aviso de privacidad
                      </NextLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 font-semibold py-1">
              Copyright © <span id="get-current-year">2024</span>
              <NextLink
                href={"https://harvest-reborn-pa.vercel.app/"}
                className="text-blueGray-500 hover:text-gray-800"
                target="_blank"
              >
                {" "}
                Harvest Reborn.
              </NextLink>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
