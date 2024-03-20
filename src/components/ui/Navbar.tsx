"use client";

import React, { useContext, useState } from "react";
import { DropdownComponent } from "@/components";
import { useSession } from "next-auth/react";
import { AuthContext } from "@/context/auth";
import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";
import { UiContext } from "@/context/ui";
import { useRouter, usePathname } from "next/navigation";

export const NavbarComponent = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const { user } = useContext(AuthContext);
  const { toggleSideMenu, isMenuOpen } = useContext(UiContext);

  const pathname = usePathname();

  return (
    <>
      <Navbar
        onMenuOpenChange={setMobileMenuOpen}
        className="bg-green-800 z-[40]"
      >
        {user?.id_rol === 1 ? (
          <NavbarContent>
            {pathname === "/admin/dashboard" ? (
              <button onClick={toggleSideMenu} className="md:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            ) : (
              <NavbarMenuToggle
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
              />
            )}

            <NavbarBrand>
              <Image
                src="/images/logo.png"
                alt="Harvest Reborn"
                width={80}
                height={80}
              />
            </NavbarBrand>
          </NavbarContent>
        ) : (
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
            />
            <NavbarBrand>
              <Image
                src="/images/logo.png"
                alt="Harvest Reborn"
                width={80}
                height={80}
              />
            </NavbarBrand>
          </NavbarContent>
        )}

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {session ? (
            <>
              <NavbarItem>
                <Link className="text-gray-300" href={"/home"}>
                  Inicio
                </Link>
              </NavbarItem>
              {user?.id_rol === 2 ? (
                <>
                  <NavbarItem>
                    <Link className="text-gray-300" href="/inventory">
                      Inventario
                    </Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link className="text-gray-300" href={"/orders"}>
                      Pedidos
                    </Link>
                  </NavbarItem>
                </>
              ) : user?.id_rol === 3 ? (
                <>
                  <NavbarItem>
                    <Link className="text-gray-300" href="/negocios">
                      Negocios
                    </Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link className="text-gray-300" href={"/orders"}>
                      Mis pedidos
                    </Link>
                  </NavbarItem>
                </>
              ) : (
                <>
                  <NavbarItem>
                    <Link className="text-gray-300" href={"/admin/dashboard"}>
                      Dashboard
                    </Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link className="text-gray-300" href={"/admin/tickets"}>
                      Tickets
                    </Link>
                  </NavbarItem>
                </>
              )}
            </>
          ) : (
            <>
              <NavbarItem>
                <Link className="text-gray-300" href="/#">
                  Inicio
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link className="text-gray-300" href="/#servicios">
                  Cómo funciona
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link className="text-gray-300" href="/#aboutUs">
                  Acerca de nosotros
                </Link>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <DropdownComponent />
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {session ? (
            <>
              <NavbarMenuItem>
                <Link color="foreground" href={"/home"}>
                  Inicio
                </Link>
              </NavbarMenuItem>
              {user?.id_rol === 2 ? (
                <>
                  <NavbarMenuItem>
                    <Link className="text-gray-300" href="/inventory">
                      Inventario
                    </Link>
                  </NavbarMenuItem>
                  <NavbarMenuItem>
                    <Link className="text-gray-300" href={"/orders"}>
                      Pedidos
                    </Link>
                  </NavbarMenuItem>
                </>
              ) : user?.id_rol === 3 ? (
                <>
                  <NavbarMenuItem>
                    <Link className="text-gray-300" href="/negocios">
                      Negocios
                    </Link>
                  </NavbarMenuItem>
                  <NavbarMenuItem>
                    <Link className="text-gray-300" href={"/orders"}>
                      Mis pedidos
                    </Link>
                  </NavbarMenuItem>
                </>
              ) : (
                <>
                  <NavbarMenuItem>
                    <Link className="text-gray-300" href={"/admin/dashboard"}>
                      Dashboard
                    </Link>
                  </NavbarMenuItem>
                  <NavbarMenuItem>
                    <Link className="text-gray-300" href={"/admin/tickets"}>
                      Tickets
                    </Link>
                  </NavbarMenuItem>
                </>
              )}
              <NavbarMenuItem>
                <Link color="foreground" href={"/auth/logout"}>
                  Cerrar sesión
                </Link>
              </NavbarMenuItem>
            </>
          ) : (
            <>
              <NavbarMenuItem>
                <Link color="foreground" href={"/#"}>
                  Inicio
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link color="foreground" href="/#servicios">
                  Cómo funciona
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link color="foreground" href="/#aboutUs">
                  Acerca de nosotros
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <hr />
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link color="foreground" href={"/auth/login"}>
                  Iniciar sesión
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link color="foreground" href={"/auth/register"}>
                  Regístrate
                </Link>
              </NavbarMenuItem>
            </>
          )}
        </NavbarMenu>
      </Navbar>
    </>
  );
};
