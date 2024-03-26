import { Card, CardBody } from "@nextui-org/react";
import React from "react";

interface CardClientesAdminProps {
  clientes: number;
}

export const CardClientesAdmin = ({ clientes }: CardClientesAdminProps) => {
  return (
    <Card className="xl:max-w-sm bg-primary rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <span className="material-symbols-outlined">groups</span>
          <div className="flex flex-col">
            <span className="text-white">Clientes registrados</span>
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-white text-xl font-semibold">{clientes}</span>
        </div>
      </CardBody>
    </Card>
  );
};
