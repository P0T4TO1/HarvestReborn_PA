"use client";

import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { TableProducts, AddProd } from "@/components";

export const Products = () => {
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
          <span className="material-symbols-outlined">nutrition</span>
          <span>Productos </span> <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>Listado</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Todos los productos</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Buscar productos"
          />
          <span className="material-symbols-outlined cursor-pointer">delete</span>
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <AddProd />
          <Button
            color="primary"
            startContent={
              <span className="material-symbols-outlined">ios_share</span>
            }
          >
            Export to CSV
          </Button>
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableProducts />
      </div>
    </div>
  );
};
