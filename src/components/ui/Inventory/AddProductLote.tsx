"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { IProduct } from "@/interfaces";
import { hrApi } from "@/api";
import { AddLoteToInventory, ProductCard } from "@/components";
import {
  Input,
  useDisclosure,
  CircularProgress,
} from "@nextui-org/react";

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
    hrApi.get("/inventory/products").then((res) => {
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
      <div className="p-24">
        <h1 className="font-bebas-neue uppercase text-4xl font-black flex flex-col leading-none text-green-900">
          Agregar productos
        </h1>
        <p className="text-xl text-gray-900 font-semibold">
          Aquí puedes agregar productos a tu inventario
        </p>

        <AddLoteToInventory
          id={productId}
          product={product}
          useDisclosure={{ isOpen, onClose }}
        />

        <div className="flex mt-12">
          <div className="flex flex-col flex-1 justify-center sm:justify-start">
            <h1 className="font-bebas-neue uppercase text-xl font-black flex flex-col leading-none text-green-900">
              Todos los productos registrados
            </h1>
            <div className="flex mt-2 w-2/5">
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
            <div className="mt-4 flex justify-center text-gray-900 p-3 text-xs tracking-wide font-semibold">
              <h3 className="text-sm text-gray-900 font-normal">
                Si no encuentras el producto que buscas, puedes agregarlo
              </h3>
              <button className="ml-4">
                <span className="material-symbols-outlined">add_circle</span>
              </button>
            </div>
          </div>
        </div>

        <ul className="mt-8 grid grid-cols-4 gap-4">
          {loading ? (
            <CircularProgress size="lg" aria-label="Loading..." />
          ) : error ? (
            <p>Hubo un error</p>
          ) : (
            results.map((product) => (
              <li key={product.id_producto} className={`p-4 flex`}>
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