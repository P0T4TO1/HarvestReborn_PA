"use client";

import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { ILote, IProductoOrden } from "@/interfaces";
import {
  Input,
  Button,
  Checkbox,
} from "@nextui-org/react";
import { ProductCard } from "@/components";
import { BagContext } from "@/context/order";
import { FaSearch } from "react-icons/fa";

interface NegocioProductsProps {
  lotes: ILote[];
  nombre_negocio: string;
  id_negocio: number;
}

export const NegocioProducts = ({
  nombre_negocio,
  id_negocio,
  lotes,
}: NegocioProductsProps) => {
  const { addProductToBag } = useContext(BagContext);
  const [items, setItems] = useState<ILote[]>(lotes);
  const [search, setSearch] = useState("");
  const [isSeletedFrutas, setIsSelectedFrutas] = useState(false);
  const [isSeletedVerduras, setIsSelectedVerduras] = useState(false);
  // const [value, setValue] = useState("");

  const filterByCategory = (categoria: string) => {
    if (categoria === "TODOS") {
      setItems(lotes);
      return;
    }
    const filteredResults = lotes.filter((lote) => {
      return lote.producto.categoria === categoria;
    });
    return setItems(filteredResults);
  };

  useEffect(() => {
    if (isSeletedFrutas && isSeletedVerduras) {
      filterByCategory("TODOS");
    } else if (isSeletedFrutas) {
      filterByCategory("FRUTA");
    } else if (isSeletedVerduras) {
      filterByCategory("VERDURA");
    } else if (!isSeletedFrutas && !isSeletedVerduras) {
      filterByCategory("TODOS");
    }
  }, [isSeletedFrutas, isSeletedVerduras]);

  const onAddProduct = (product: IProductoOrden) => {
    addProductToBag(product);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const results = !search
    ? items
    : items.filter((lote) =>
        lote.producto.nombre_producto
          .toLowerCase()
          .includes(search.toLowerCase())
      );

  return (
    <div className="pt-16 container mx-auto">
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
          aria-label="Buscar productos..."
          type="text"
          startContent={
            <FaSearch size={25} className="text-gray-500 dark:text-gray-300" />
          }
          defaultValue={search}
          onChange={handleChange}
        />
      </div>

      <div className="grid lg:grid-cols-6 mt-12 grid-cols-1">
        <div className="lg:col-span-1 block px-4">
          {/* <div className="flex flex-col gap-4 mt-4 mb-2">
            <h3>Ordenar por</h3>
            <Select
              size="md"
              selectedKeys={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Ordenar por"
              aria-label="Ordenar por"
            >
              <SelectItem key="precio-desc" value="precio-desc">
                Precio de menor a mayor
              </SelectItem>
              <SelectItem key="precio-asc" value="precio-asc">
                Precio de mayor a menor
              </SelectItem>
              <SelectItem key="alphabetic-asc" value="alphabetic-asc">
                Nombre de la A a la Z
              </SelectItem>
              <SelectItem key="alphabetic-desc" value="alphabetic-desc">
                Nombre de la Z a la A
              </SelectItem>
            </Select>
          </div>
          <Divider /> */}
          <div className="flex flex-col gap-4 mt-4">
            <h3>Filtros</h3>
            <Checkbox
              isSelected={isSeletedFrutas}
              onValueChange={setIsSelectedFrutas}
            >
              Frutas
            </Checkbox>
            <Checkbox
              isSelected={isSeletedVerduras}
              onValueChange={setIsSelectedVerduras}
            >
              Verduras
            </Checkbox>
          </div>
        </div>
        <div className="lg:col-span-5 flex justify-center lg:block">
          <ul className="grid lg:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 grid-cols-1 xl:grid-cols-4">
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
    </div>
  );
};
