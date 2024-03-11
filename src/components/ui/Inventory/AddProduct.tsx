"use client";

import { ChangeEvent, useContext, useEffect, useState } from "react";
import { IProduct } from "@/interfaces";
import { hrApi } from "@/api";
import { Modal } from "@/components/ui/Modal";
import { AuthContext } from "@/context/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { NextResponse } from "next/server";
import { toast } from "sonner";
import { Input } from "@nextui-org/react";

interface IFormData {
  id_producto: number;
  cantidad_producto: number;
  fecha_entrada: Date;
  fecha_vencimiento: Date;
  precio_kg: number;
  monto_total: number;
  inventory_id: number;
}

export const AddProduct = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const [productId, setProductId] = useState<number>();

  const { user } = useContext(AuthContext);

  const methods = useForm<IFormData>();
  const { handleSubmit, register } = methods;

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

  const hideModal = () => {
    setShow(false);
  };

  const showModal = (id: number) => {
    setProductId(id);
    setShow(true);
  };

  const addProduct: SubmitHandler<IFormData> = async (data) => {
    console.log(data);
    try {
      const res = await hrApi
        .post(`/inventory/${productId}`, {
          id: productId,
          cantidad_producto: data.cantidad_producto,
          fecha_entrada: data.fecha_entrada,
          fecha_vencimiento: data.fecha_vencimiento,
          precio_kg: data.precio_kg,
          monto_total: data.cantidad_producto * data.precio_kg,
          inventory_id: user?.negocio?.id_negocio,
        })
        .then(() => {
          hideModal();
          toast("¡Se agregó el producto a tu inventario!");
          return NextResponse.json(
            {
              message: "Producto agregado a tu inventario",
            },
            { status: 200 }
          );
        })
        .catch((err) => {
          console.log(err);
          return null;
        });
      if (res) {
        console.log("Producto agregado");
      } else {
        console.log("Hubo un error data");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container pt-16 px-16">
        <Modal
          show={show}
          handleClose={hideModal}
          title={"Añadir producto a tu inventario"}
        >
          <div className="relative bg-white rounded-b-lg shadow">
            <div className="p-4 md:p-5 space-y-4">
              <form onSubmit={handleSubmit(addProduct)}>
                <div>
                  <label
                    htmlFor="product-amount"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Cantidad en kg
                  </label>
                  <input
                    type="number"
                    id="product-amount"
                    className="mt-1 p-2 block w-full border-2 border-gray-300 rounded-lg"
                    {...register("cantidad_producto")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="product-price"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Precio por kg
                  </label>
                  <input
                    type="number"
                    id="product-price"
                    className="mt-1 p-2 block w-full border-2 border-gray-300 rounded-lg"
                    {...register("precio_kg")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="product-arrive"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Fecha de llegada
                  </label>
                  <input
                    type="date"
                    id="product-arrive"
                    className="mt-1 p-2 block w-full border-2 border-gray-300 rounded-lg"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    {...register("fecha_entrada")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="product-amount"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Fecha de duración aproximada en estado fresco
                  </label>
                  <input
                    type="date"
                    id="product-expiration"
                    className="mt-1 p-2 block w-full border-2 border-gray-300 rounded-lg"
                    {...register("fecha_vencimiento")}
                  />
                </div>
                <div className="flex items-center pt-4 border-t border-gray-200 rounded-b">
                  <button
                    type="submit"
                    className="flex justify-center bg-green-800 hover:bg-green-700 text-gray-100 p-3 text-sm rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
                  >
                    Agregar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>

        <div className="flex">
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

        {/*<div className="flex flex-2">*/}
        {/*  <Input*/}
        {/*    isClearable*/}
        {/*    size="md"*/}
        {/*    radius="lg"*/}
        {/*    placeholder="Buscar productos..."*/}
        {/*    type="text"*/}
        {/*    startContent={*/}
        {/*      <span className="material-symbols-outlined">search</span>*/}
        {/*    }*/}
        {/*    defaultValue={search}*/}
        {/*    onChange={handleChange}*/}
        {/*  />*/}
        {/*</div>*/}

        <ul className="mt-8 grid grid-cols-4 gap-4">
          {loading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p>Hubo un error</p>
          ) : (
            results.map((product) => (
              <li key={product.id_producto} className={`p-4 flex`}>
                <div className="product">
                  <div className="left-side bg-[#87b663]">
                    <img
                      src={product.imagen_producto}
                      alt=""
                      className="image"
                    />
                  </div>
                  <div className="right-side">
                    <h2 className="name text-xl font-semibold text-center text-gray-700">
                      {product.nombre_producto}
                    </h2>
                    <div className="setting-icon-container">
                      <button onClick={() => showModal(product.id_producto)}>
                        <span className="material-symbols-outlined setting-icon">
                          add_circle
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};
