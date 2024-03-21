"use client";

import { FC, useContext } from "react";
import { AuthContext } from "@/context/auth";
import { useSession, signOut } from "next-auth/react";
import { SUCCESS_TOAST, showToast } from "@/components/toast";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";

export const DropdownComponent: FC = () => {
  const { data: session } = useSession();
  const { user } = useContext(AuthContext);

  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            as="button"
            icon={
              <span className="material-symbols-outlined">account_circle</span>
            }
            className="transition-transform"
            classNames={{
              base: "bg-transparent",
              icon: "text-gray-300",
            }}
          />
        </DropdownTrigger>
        {session ? (
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Inicio sesión como:</p>
              <p className="font-semibold">{user?.email}</p>
            </DropdownItem>
            <DropdownItem
              key="settings"
              href={`/user/profile/${user?.id}`}
              startContent={
                <span className="material-symbols-outlined">settings</span>
              }
            >
              Cuenta
            </DropdownItem>
            {user?.id_rol === 2 ? (
              <DropdownItem
                key="inventory"
                href={"/inventory"}
                startContent={
                  <span className="material-symbols-outlined">inventory_2</span>
                }
              >
                Mi inventario
              </DropdownItem>
            ) : user?.id_rol === 3 ? (
              <DropdownItem
                key="orders"
                href={"/orders"}
                startContent={
                  <span className="material-symbols-outlined">orders</span>
                }
              >
                Mis pedidos
              </DropdownItem>
            ) : (
              <DropdownItem
                key="dashboard"
                href={"/admin/dashboard"}
                startContent={
                  <span className="material-symbols-outlined">dashboard</span>
                }
              >
                Dashboard
              </DropdownItem>
            )}
            <DropdownItem key="br" color="default">
              <hr />
            </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              onClick={() => {
                signOut().then(async () => {
                  showToast("Logout Successful", SUCCESS_TOAST);
                });
              }}
              startContent={
                <span className="material-symbols-outlined">logout</span>
              }
            >
              Cerrar sesión
            </DropdownItem>
          </DropdownMenu>
        ) : (
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem
              key="login"
              color="primary"
              href={"/auth/login"}
              startContent={
                <span className="material-symbols-outlined">login</span>
              }
            >
              Iniciar sesión
            </DropdownItem>
            <DropdownItem
              key="register"
              color="success"
              href={"/auth/register"}
              startContent={
                <span className="material-symbols-outlined">person_add</span>
              }
            >
              Regístrate
            </DropdownItem>
          </DropdownMenu>
        )}
      </Dropdown>
    </>
  );
};
