"use client";

import React, { useContext } from "react";
import { Button, Link, Chip } from "@nextui-org/react";
import { AuthContext } from "@/context/auth";

export const HomeNegocio = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user?.duenonegocio?.negocio?.estado_negocio === "PENDIENTE" && (
        <>
          <Chip
            size="lg"
            variant="flat"
            color="warning"
            startContent={
              <span className="material-symbols-outlined">info</span>
            }
            className="mx-auto"
          >
            Su negocio esta siendo verificado, completa los datos de tu negocio
            para ser verificado más rápido.
          </Chip>
        </>
      )}
      <div className="pt-20 lg:px-48 md:px-20 sm:px-12">
        <div className="my-4">
          <h1>Comienza configurando tu negocio</h1>
          <Link href={"/mi-negocio"}>
            <Button>Configurar negocio</Button>
          </Link>
          <h1>
            Si ya lo configuraste puedes{" "}
            <Link href="#inventory-howitworks">
              que se puedes hacer en la aplicación
            </Link>
          </h1>
        </div>
        <div className="w-full sm:p-4" id="inventory-howitworks"></div>
      </div>
    </>
  );
};
