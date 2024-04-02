"use client";

import { Button, CircularProgress } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TableUsers } from "@/components";
import { IUser } from "@/interfaces";
import { hrApi } from "@/api";

export const UsersAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = React.useState<IUser[]>([]);
  useEffect(() => {
    hrApi.get("/admin/users").then((res) => {
      if (res.status === 200) {
        setUsers(res.data);
      } else {
        setError(true);
      }
      setLoading(false);
    });
  }, []);

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
          <span>Usuarios</span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>Listado</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Todos los usuarios</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex flex-row gap-3.5 flex-wrap">
          {/*<AddUser />*/}
          <Link href={"/admin/dashboard/users/add-user"}>
            <Button
              color="primary"
              variant="faded"
              startContent={
                <span className="material-symbols-outlined">person_add</span>
              }
            >
              Agregar usuario
            </Button>
          </Link>
          {/*<Button*/}
          {/*  color="primary"*/}
          {/*  startContent={*/}
          {/*    <span className="material-symbols-outlined">ios_share</span>*/}
          {/*  }*/}
          {/*>*/}
          {/*  Export to CSV*/}
          {/*</Button>*/}
        </div>
      </div>
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold">Cargando...</h2>
          <CircularProgress size="lg" aria-label="Loading..." />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold text-red-800">
            Hubo un error al cargar los usuarios
          </h3>
        </div>
      ) : (
        <div className="max-w-[95rem] mx-auto w-full">
          <TableUsers users={users} />
        </div>
      )}
    </div>
  );
};
