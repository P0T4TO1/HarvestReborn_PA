"use client";

import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { ILote, IProductoOrden } from "@/interfaces";
import { hrApi } from "@/api";
import { Input, Button, CircularProgress } from "@nextui-org/react";
import { ProductCard } from "@/components";
import { BagContext } from "@/context/order";
import { FaSearch } from "react-icons/fa";

interface NegocioProductsProps {
  id_negocio: number;
  nombre_negocio: string;
}

export const NegocioProducts = ({
  id_negocio,
  nombre_negocio,
}: NegocioProductsProps) => {
  const { addProductToBag } = useContext(BagContext);

  const [lotes, setLotes] = useState<ILote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  const onAddProduct = (product: IProductoOrden) => {
    addProductToBag(product);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const results = !search
    ? lotes
    : lotes.filter((lote) =>
        lote.producto.nombre_producto
          .toLowerCase()
          .includes(search.toLowerCase())
      );

  useEffect(() => {
    hrApi.get(`/negocio/inventory/${id_negocio}`).then((res) => {
      if (res.status === 200) {
        setLotes(res.data);
      } else {
        setError(true);
        console.log("Error al obtener negocio", res.data);
      }
      setLoading(false);
    });
  }, [id_negocio]);

  return (
    <div className="pt-16 container mx-auto">
      {loading ? (
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold">Cargando...</h2>
          <CircularProgress size="lg" aria-label="Loading..." />
        </div>
      ) : error ? (
        <p>Hubo un error</p>
      ) : (
        <>
          <h1 className="font-bebas-neue uppercase text-4xl font-black flex flex-col leading-none dark:text-green-600 text-green-900">
            {nombre_negocio}
            <span className="text-xl dark:text-gray-300 text-gray-900 font-semibold">
              Aquí puedes ver los productos disponibles en este negocio
            </span>
          </h1>
          <div className="flex mt-2 w-2/5">
            <Input
              size="md"
              radius="lg"
              placeholder="Buscar productos..."
              type="text"
              startContent={
                <FaSearch
                  size={25}
                  className="text-gray-500 dark:text-gray-300"
                />
              }
              defaultValue={search}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-6 mt-12">
            <div className="col-span-1">
              <div>Filtros</div>
            </div>
            <div className="col-span-5">
              <ul className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 xl:grid-cols-4">
                {results?.map((lote) => (
                  <li key={lote.id_producto} className="p-2 flex">
                    <ProductCard lote={lote} route={"negocio-prods-cliente"}>
                      <Button
                        className="w-full"
                        color="primary"
                        size="md"
                        onClick={() => {
                          onAddProduct({
                            id_producto: lote.id_producto,
                            cantidad_orden: 1,
                            monto: lote.precio_kg,
                            id_orden: undefined,
                            id_negocio: id_negocio,
                            producto: lote.producto,
                          });
                        }}
                      >
                        Agregar a la bolsa
                      </Button>
                    </ProductCard>
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
