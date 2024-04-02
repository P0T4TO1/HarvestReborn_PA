"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TableClientes } from "@/components";
import { ICliente } from "@/interfaces";
import { hrApi } from "@/api";
import { CircularProgress } from "@nextui-org/react";

export const ClientesAdmin = () => {
  const [clientes, setClientes] = useState<ICliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    hrApi.get("/admin/users/clientes").then((res) => {
      if (res.status === 200) {
        setClientes(res.data);
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
          <span className="material-symbols-outlined">store</span>
          <span>Clientes </span> <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>Listado</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Todos los clientes</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex flex-row gap-3.5 flex-wrap">
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
        <p>
          Ha ocurrido un error al cargar los datos. Por favor, intenta de nuevo
          más tarde.
        </p>
      ) : (
        <div className="max-w-[95rem] mx-auto w-full">
          <TableClientes clientes={clientes} />
        </div>
      )}
    </div>
  );
};
