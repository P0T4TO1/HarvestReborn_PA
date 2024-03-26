"use client";

import React, { useContext } from "react";
import { Button, Link } from "@nextui-org/react";
import { AuthContext } from "@/context/auth";

export const HomeNegocio = () => {
  const { user } = useContext(AuthContext);
    console.log(user)
  return (
    <div>
      <h1>Comienza configurando tu negocio</h1>
      <Link href={"/mi-negocio"}>
        <Button>Configurar negocio</Button>
      </Link>
    </div>
  );
};
