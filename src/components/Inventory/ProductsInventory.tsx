"use client";

import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { hrApi } from "@/api";
import { ILote } from "@/interfaces";
import { AuthContext } from "@/context/auth";
import { Input, CircularProgress, Button, Link } from "@nextui-org/react";
import { ProductsCollapsibleTable } from "@/components";
import { MdAddCircleOutline } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

export const ProductsInventory = () => {
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
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
    hrApi
      .get(`/negocio/inventory/${user?.duenonegocio?.negocio?.id_negocio}`)
      .then((res) => {
        if (res.status === 200) {
          setLotes(res.data);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [user?.duenonegocio?.negocio?.id_negocio]);

  return (
    <div className="pt-16 container mx-auto">
      <h1 className="font-bebas-neue uppercase text-4xl font-black flex flex-col leading-none dark:text-green-600 text-green-900">
        Tú inventario
        <span className="text-xl text-gray-900 dark:text-gray-300 font-semibold">
          Aquí puedes ver todos tus productos
        </span>
      </h1>
      <div className="my-4">
        <Link href={"/inventory/add-product"}>
          <Button
            color="primary"
            variant="faded"
            startContent={<MdAddCircleOutline size={25} />}
          >
            <span className="ml-2">Agregar productos</span>
          </Button>
        </Link>
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
              startContent={<FaSearch size={25} />}
              defaultValue={search}
              onChange={handleChange}
            />
          </div>
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
