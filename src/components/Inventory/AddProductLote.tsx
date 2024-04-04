"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { IProduct } from "@/interfaces";
import { hrApi } from "@/api";
import { AddLoteToInventory, ProductCard } from "@/components";
import { Input, useDisclosure, CircularProgress } from "@nextui-org/react";

export const AddProductLote = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [productId, setProductId] = useState<number>(0);
  const [product, setProduct] = useState<IProduct>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const results = !search
    ? products
    : products.filter((dato) =>
        dato.nombre_producto.toLowerCase().includes(search.toLocaleLowerCase())
      );

  useEffect(() => {
    hrApi.get("/negocio/inventory/products").then((res) => {
      if (res.status === 200) {
        setProducts(res.data);
      } else {
        setError(true);
      }
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div className="pt-16 container mx-auto">
        <h1 className="font-bebas-neue uppercase text-4xl font-black flex flex-col leading-none dark:text-green-600 text-green-900">
          Agregar productos
        </h1>
        <p className="text-xl dark:text-gray-300 text-gray-900 font-semibold">
          Aquí puedes agregar productos a tu inventario
        </p>

        <AddLoteToInventory
          id={productId}
          product={product}
          useDisclosure={{ isOpen, onClose }}
        />

        <div className="flex mt-12">
          <div className="flex flex-col flex-1 justify-center sm:justify-start">
            <h1 className="font-bebas-neue uppercase text-xl font-black flex flex-col leading-none dark:text-green-600 text-green-900">
              Todos los productos registrados
            </h1>
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
          </div>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4">
          {loading ? (
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold">Cargando...</h2>
              <CircularProgress size="lg" aria-label="Loading..." />
            </div>
          ) : error ? (
            <p>Hubo un error</p>
          ) : (
            results.map((product) => (
              <li key={product.id_producto} className="p-4 flex">
                <ProductCard product={product} route={"add-product"}>
                  <button
                    onClick={() => {
                      setProduct(product);
                      setProductId(product.id_producto);
                      onOpen();
                    }}
                  >
                    <span className="material-symbols-outlined setting-icon">
                      add_circle
                    </span>
                  </button>
                </ProductCard>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};
