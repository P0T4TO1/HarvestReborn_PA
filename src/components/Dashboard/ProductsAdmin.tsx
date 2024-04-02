"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { TableProducts, AddProductAdminModal } from "@/components";
import { IProduct } from "@/interfaces";
import { hrApi } from "@/api";
import { CircularProgress } from "@nextui-org/react";

export const ProductsAdmin = () => {
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  useEffect(() => {
    hrApi.get("/admin/product").then((res) => {
      if (res.status === 200) {
        setProducts(res.data);
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
          <span className="material-symbols-outlined">nutrition</span>
          <span>Productos </span> <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>Listado</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Todos los productos</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex flex-row gap-3.5 flex-wrap">
          <AddProductAdminModal />
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
            Hubo un error al cargar los productos
          </h3>
        </div>
      ) : (
        <div className="max-w-[95rem] mx-auto w-full">
          <TableProducts products={products} />
        </div>
      )}
    </div>
  );
};
