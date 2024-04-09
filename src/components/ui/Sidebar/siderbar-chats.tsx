"use client";

import React, { useContext } from "react";
import { Sidebar } from "./sidebar.styles";
import { SidebarMenu, SidebarItem } from "@/components";
import { Divider } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { UiContext } from "@/context/ui";
import {
  MdOutlineDashboard,
  MdOutlineForum,
  MdOutlineQuiz,
  MdOutlineStorefront,
} from "react-icons/md";
import { FaPeopleGroup, FaTicket, FaUserGroup } from "react-icons/fa6";
import { FaAppleAlt, FaShoppingBag } from "react-icons/fa";

interface Props {
  users: any[];
  chats: any[];
}

export const SidebarWrapperChats = () => {
  const pathname = usePathname();
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);

  return (
    <aside className="h-screen z-[50] sticky top-0">
      {isMenuOpen ? (
        <div className={Sidebar.Overlay()} onClick={toggleSideMenu} />
      ) : null}
      <div
        className={`bg-background transition-transform h-full fixed -translate-x-full w-96 shrink-0 z-[202] overflow-y-auto border-r border-divider flex-col py-6 px-3 md:ml-0 md:flex md:static md:h-screen md:translate-x-0 ${
          isMenuOpen ? "translate-x-0 ml-0 [display:inherit]" : ""
        }`}
      >
        <div className={Sidebar.Header()}>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-medium m-0 text-default-900 -mb-4 whitespace-nowrap">
              Chats
            </h3>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<MdOutlineDashboard size={24} />}
              isActive={pathname === "/admin/dashboard"}
              href="/admin/dashboard"
            />
            <SidebarMenu title="Menu Principal">
              <SidebarItem
                isActive={pathname === "/admin/dashboard/users"}
                title="Usuarios"
                icon={<FaPeopleGroup size={24} />}
                href="/admin/dashboard/users"
              />
              <SidebarItem
                isActive={pathname === "/admin/dashboard/products"}
                title="Productos"
                icon={<FaAppleAlt size={24} />}
                href="/admin/dashboard/products"
              />
              <SidebarItem
                isActive={pathname === "/admin/dashboard/negocios"}
                title="Negocios"
                icon={<MdOutlineStorefront size={24} />}
                href="/admin/dashboard/negocios"
              />
              <SidebarItem
                isActive={pathname === "/admin/dashboard/clientes"}
                title="Clientes"
                icon={<FaUserGroup size={24} />}
                href="/admin/dashboard/clientes"
              />
              <SidebarItem
                isActive={pathname === "/admin/dashboard/orders"}
                title="Ordenes"
                icon={<FaShoppingBag size={24} />}
                href="/admin/dashboard/orders"
              />
              <SidebarItem
                isActive={pathname === "/admin/dashboard/chats"}
                title="Chats"
                icon={<MdOutlineForum size={24} />}
                href="/admin/dashboard/chats"
              />
            </SidebarMenu>
            <SidebarMenu title={"Soporte"}>
              <SidebarItem
                title="Tickets"
                icon={<FaTicket size={24} />}
                href="/admin/dashboard/tickets"
              />
              <SidebarItem
                title="Preguntas Frecuentes"
                icon={<MdOutlineQuiz size={24} />}
                href="/admin/dashboard/faqs"
              />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
