"use client";

import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/auth";
import { INegocio } from "@/interfaces";
import { hrApi } from "@/api";
import { useSearchParams } from "next/navigation";
import { Input } from "@nextui-org/input";
import { ProductCard } from "@/components";

export const NegocioProducts = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [negocio, setNegocio] = useState<INegocio>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [search, setSearch] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const results = !search
    ? negocio?.inventario?.lote
    : negocio?.inventario?.lote?.filter((dato) =>
        dato.producto?.nombre_producto
          .toLowerCase()
          .includes(search.toLocaleLowerCase())
      );

  useEffect(() => {
    hrApi.get(`/negocio/${parseInt(id as string)}`).then((res) => {
      if (res.status === 200) {
        setNegocio(res.data);
      } else {
        setError(true);
        console.log("Error al obtener negocio", res.data);
      }
      setLoading(false);
    });
  }, [id]);

  return (
    <div className="pt-20 lg:px-48 md:px-20 sm:px-12">
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Hubo un error</p>
      ) : (
        <>
          <h1 className="font-bebas-neue uppercase text-4xl font-black flex flex-col leading-none text-green-900">
            {negocio?.nombre_negocio}
            <span className="text-xl text-gray-900 font-semibold">
              Aquí puedes ver los productos disponibles en este negocio
            </span>
            <div className="flex mt-2 w-2/5">
              <Input
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
          </h1>

          <div className="grid grid-cols-6 mt-12">
            <div className="col-span-1">
              <div>Filtros</div>
            </div>
            <div className="col-span-5">
              <ul className="grid grid-cols-4">
                {results?.map((lote) => (
                  <li key={lote.id_producto} className="p-2 flex">
                    <ProductCard lote={lote} route={"negocio-prods-cliente"} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
