import { Card, CardBody } from "@nextui-org/react";
import React from "react";

interface CardProductsAdminProps {
  products: number;
}

export const CardProductsAdmin = ({ products }: CardProductsAdminProps) => {
  return (
    <Card className="xl:max-w-sm bg-primary rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <span className="material-symbols-outlined">nutrition</span>
          <div className="flex flex-col">
            <span className="text-white">Productos registrados</span>
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-white text-xl font-semibold">{products}</span>
        </div>
      </CardBody>
    </Card>
  );
};
