"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ILote, INegocio, IUser } from "@/interfaces";
import { hrApi } from "@/api";
import { CircularProgress, Image, Button } from "@nextui-org/react";
import {
  ProductsCollapsibleTable,
  EditUserForm,
  EditNegocioAdmin,
} from "@/components";

interface UserInfoAdminProps {
  id_user: string;
}

export const UserInfoAdmin = ({ id_user }: UserInfoAdminProps) => {
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    hrApi.get(`/admin/users/${id_user}`).then((res) => {
      if (res.status === 200) {
        setUser(res.data);
      } else {
        setError(true);
        console.log("Error");
      }
      setLoading(false);
    });
  }, [id_user]);

  return (
    <div className="my-10 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex">
        <li className="flex gap-2">
          <span className="material-symbols-outlined">home</span>
          <Link href={"/admin/dashboard"}>
            <span>Home</span>
          </Link>
          <span> / </span>{" "}
        </li>

        <li className="flex gap-2">
          <span className="material-symbols-outlined">group</span>
          <span>Usuarios </span> <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>Info</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Información del usuario</h3>

      {loading ? (
        <CircularProgress size="lg" aria-label="Loading..." />
      ) : error ? (
        <p>Hubo un error</p>
      ) : (
        <>
          <div className="max-w-[95rem] mx-auto w-full">
            <div className="flex flex-col gap-4">
              <div className="col-span-2">
                <Button
                  type="button"
                  color="success"
                  className="mt-4"
                  size="md"
                  onClick={() => setIsEditing(!isEditing)}
                  startContent={
                    <span className="material-symbols-outlined">
                      edit_square
                    </span>
                  }
                >
                  {isEditing ? "Cancelar" : "Editar"}
                </Button>
              </div>
              <EditUserForm user={user as IUser} isEditing={isEditing} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
