"use client";

import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hrApi } from "@/api";
import { ILote } from "@/interfaces";
import { AuthContext } from "@/context/auth";
import {
  Select,
  SelectItem,
  Input,
  CircularProgress,
  Button,
} from "@nextui-org/react";
import { ProductsCollapsibleTable } from "@/components";

export const ProductsInventory = () => {
  const router = useRouter();
  const navigateTo = (path: string) => {
    router.push(path);
  };
  const { user } = useContext(AuthContext);

  const [lotes, setLotes] = useState<ILote[]>([]);
  const [allLotes, setAllLotes] = useState<ILote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const results = !search
    ? lotes
    : lotes.filter((dato) =>
        dato.producto?.nombre_producto
          .toLowerCase()
          .includes(search.toLocaleLowerCase())
      );

  useEffect(() => {
    if (!user?.duenonegocio?.negocio?.id_negocio) {
      return;
    }
    hrApi
      .get(
        `/negocio/inventory/lotes/${user?.duenonegocio?.negocio?.id_negocio}`
      )
      .then((res) => {
        if (res.status === 200) {
          setAllLotes(res.data);
        } else {
          setError(true);
          console.log("Error al obtener productos", res.data);
        }
        setLoading(false);
      });
    hrApi
      .get(`/negocio/inventory/${user?.duenonegocio?.negocio?.id_negocio}`)
      .then((res) => {
        if (res.status === 200) {
          setLotes(res.data);
        } else {
          setError(true);
          console.log("Error al obtener productos", res.data);
        }
        setLoading(false);
      });
  }, [user?.duenonegocio?.negocio?.id_negocio]);

  return (
    <div className="pt-20 lg:px-48 md:px-20 sm:px-12">
      <h1 className="font-bebas-neue uppercase text-4xl font-black flex flex-col leading-none text-green-900">
        Tú inventario
        <span className="text-xl text-gray-900 font-semibold">
          Aquí puedes ver todos tus productos
        </span>
      </h1>
      <div className="my-4">
        <Button
          onClick={() => navigateTo("/inventory/add-product")}
          startContent={
            <span className="material-symbols-outlined">add_circle</span>
          }
        >
          <span className="ml-2">Agregar productos</span>
        </Button>
      </div>
      <div className="flex">
        <div className="flex flex-1 justify-center sm:justify-start">
          <div className="mt-4 p-2">
            <Input
              isClearable
              size="md"
              radius="lg"
              placeholder="Buscar productos..."
              type="text"
              startContent={
                <span className="material-symbols-outlined">search</span>
              }
              defaultValue={search}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-end pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 flex-col">
          <Select
            placeholder="Filtrar por"
            className="w-60"
            onChange={(e) => console.log(e)}
          >
            <SelectItem value="0" key="0">
              -- --
            </SelectItem>
            <SelectItem value="1" key="1">
              Nombre
            </SelectItem>
            <SelectItem value="2" key="2">
              Fecha de entrada
            </SelectItem>
            <SelectItem value="3" key="3">
              Fecha de vencimiento
            </SelectItem>
            <SelectItem value="4" key="4">
              Cantidad
            </SelectItem>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold">Cargando...</h2>
          <CircularProgress size="lg" aria-label="Loading..." />
        </div>
      ) : error ? (
        <p>Hubo un error</p>
      ) : (
        <>
          <div className="w-full sm:p-4">
            <div className="rounded-md sm:border">
              <ProductsCollapsibleTable
                lotesById={results}
                allLotes={allLotes}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
