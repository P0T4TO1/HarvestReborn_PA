"use client";

import { Link, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import React, { useContext } from "react";
import { UiContext } from "@/context/ui";
import { DropdownComponent, DarkModeSwitch } from "@/components";

type Props = {
  partnerName?: string;
}

export const NavbarWrapperChats = ({ partnerName }: Props) => {
  const { toggleSideMenu } = useContext(UiContext);
  return (
    <Navbar
      isBordered
      className="w-full"
      classNames={{
        wrapper: "w-full max-w-full",
      }}
    >
      <NavbarContent className="md:hidden">
        <button onClick={toggleSideMenu} className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </NavbarContent>
      <NavbarContent className="w-full max-md:hidden">
        <NavbarItem>
          <Link href={"/admin/dashboard"} color="foreground">
            Inicio {partnerName}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href={"/admin/dashboard/users"} color="foreground">
            Usuarios
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href={"/admin/dashboard/products"} color="foreground">
            Productos
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent
        justify="end"
        className="w-fit data-[justify=end]:flex-grow-0"
      >
        <DarkModeSwitch />
        <DropdownComponent />
      </NavbarContent>
    </Navbar>
  );
};
