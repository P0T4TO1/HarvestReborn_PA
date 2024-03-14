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
  Button,
} from "@nextui-org/react";

export const NavbarComponent = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar onMenuOpenChange={setMobileMenuOpen} className="bg-green-800">
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
