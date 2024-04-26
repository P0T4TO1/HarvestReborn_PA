"use client";

import React, { ChangeEvent, useContext, useState } from "react";
import { Sidebar } from "./sidebar.styles";
import { SidebarMenu, SidebarItem } from "@/components";
import { UiContext } from "@/context/ui";
import { FaUser } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import { AuthContext } from "@/context/auth";

export const SidebarWrapperGlobal = () => {
  const { isGlobalOpen, toggleGlobalMenu } = useContext(UiContext);
  const { user } = useContext(AuthContext);

  return (
    <aside className="h-screen z-[50] sticky top-0">
      {isGlobalOpen ? (
        <div className={Sidebar.Overlay()} onClick={toggleGlobalMenu} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: isGlobalOpen,
        })}
      >
        <div className={Sidebar.Header()}>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-medium m-0 text-default-900 -mb-4 whitespace-nowrap">
              Dashboard
            </h3>
          </div>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Inicio"
              icon={<FaHome size={24} />}
              href="/admin/dashboard"
            />
            <SidebarMenu title="Cuenta">
              <SidebarItem
                title="Mi cuenta"
                icon={<MdOutlineSettings size={24} />}
                href="/user/account/account"
              />
              <SidebarItem
                title="Mi perfil"
                icon={<FaUser size={24} />}
                href="/user/profile"
              />
              {user?.id_rol === 2 && (
                <SidebarItem
                  title="Mi negocio"
                  icon={<MdOutlineSettings size={24} />}
                  href="/mi-negocio"
                />
              )}
              {user?.id_rol === 3 && (
                <SidebarItem
                  title="Mis pedidos"
                  icon={<MdOutlineSettings size={24} />}
                  href="/user/pedidos"
                />
              )}
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
