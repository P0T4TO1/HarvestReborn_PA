"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hrApi } from "@/api";
import { Product } from "@/interfaces";
import { AuthContext } from "@/context/auth";

export const ProductsList = () => {
  const router = useRouter();
  const navigateTo = (path: string) => {
    router.push(path);
  };
  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  console.log(user);

  useEffect(() => {
    hrApi.get(`/inventory/${user?.business?.inventory_id}`).then((res) => {
      if (res.status === 200) {
        setProducts(res.data);
      } else {
        setError(true);
        console.log("Error al obtener productos", res.data);
      }
      setLoading(false);
    });
  }, [user?.business?.inventory_id]);

  return (
    <div className="container pt-16 px-16">
      <h1 className="font-bebas-neue uppercase text-4xl font-black flex flex-col leading-none text-green-900">
        Tú inventario
        <span className="text-xl text-gray-900 font-semibold">
          Aquí puedes ver todos tus productos
        </span>
      </h1>
      <button
        onClick={() => navigateTo("/inventory/add-product")}
        className="mt-4 flex justify-center bg-green-800 hover:bg-green-700 text-gray-100 p-3 text-sm rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
      >
        <span className="material-symbols-outlined">add_circle</span>
        <span className="ml-2">Agregar productos</span>
      </button>
      <div>
        <input
          type="text"
          placeholder="Buscar productos"
          className="mt-4 p-2 border-2 border-gray-300 rounded-lg"
        />
      </div>
      <ul className="mt-8 grid grid-cols-4 gap-4">
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>Hubo un error</p>
        ) : (
          products.map((product) => (
            <li key={product.product_id} className="p-4 flex">
              <div className="product">
                <div className="left-side bg-[#87b663]">
                  <img src={product.product_image} alt="" className="image" />
                </div>
                <div
                  className={`setting-modal-container ${
                    open ? "show-setting-modal" : ""
                  }`}
                >
                  <button className="edit-btn setting-modal-btn">
                    Editar producto
                  </button>
                  <button className="delete-btn setting-modal-btn">
                    Borrar producto
                  </button>
                </div>

                <div className="right-side flex flex-col">
                  <h2 className="name text-md font-semibold text-center text-gray-700">
                    {product.product_name}
                  </h2>
                  <div className="flex flex-col items-center">
                    <p className="text-center text-gray-700">Quedan </p>
                    <span className="font-bold">
                      {product.product_amount} kg
                    </span>
                  </div>
                  <div className="setting-icon-container">
                    <button onClick={() => setOpen(!open)}>
                      <span className="material-symbols-outlined setting-icon">
                        settings
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
  );
};
