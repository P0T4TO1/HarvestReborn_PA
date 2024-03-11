"use client";

import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hrApi } from "@/api";
import { ILote } from "@/interfaces";
import { AuthContext } from "@/context/auth";
import { Select, SelectItem, Input } from "@nextui-org/react";

export const ProductsList = () => {
  const router = useRouter();
  const navigateTo = (path: string) => {
    router.push(path);
  };
  const { user } = useContext(AuthContext);

  const [lotes, setLotes] = useState<ILote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSelected, setOpenSelected] = useState(false);

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
    hrApi.get(`/inventory/${user?.negocio?.id_negocio}`).then((res) => {
      if (res.status === 200) {
        setLotes(res.data);
      } else {
        setError(true);
        console.log("Error al obtener productos", res.data);
      }
      setLoading(false);
    });
  }, [user?.negocio?.id_negocio]);

  const handleDelete = (id: number) => {
    hrApi.delete(`/inventory/${id}`).then((res) => {
      if (res.status === 200) {
        setLotes(lotes.filter((lote) => lote.id_producto !== id));
        router.refresh();
      } else {
        console.log("Error al borrar producto", res.data);
      }
    });
  };

  return (
    <div className="container p-24">
      <h1 className="font-bebas-neue uppercase text-4xl font-black flex flex-col leading-none text-green-900">
        Tú inventario
        <span className="text-xl text-gray-900 font-semibold">
          Aquí puedes ver todos tus productos
        </span>
      </h1>
      <button
        onClick={() => navigateTo("/inventory/add-product")}
        className="mt-4 ml-2 flex justify-center bg-green-800 hover:bg-green-700 text-gray-100 p-3 text-sm rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
      >
        <span className="material-symbols-outlined">add_circle</span>
        <span className="ml-2">Agregar productos</span>
      </button>

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

      <ul className="mt-8 grid grid-cols-4">
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>Hubo un error</p>
        ) : (
          results.map((lote) => (
            <li key={lote.id_producto} className="p-2 flex">
              <div className="product">
                <div className="left-side bg-[#87b663]">
                  <img
                    src={lote.producto.imagen_producto}
                    alt=""
                    className="image"
                  />
                </div>
                <div
                  className={`setting-modal-container ${
                    open ? "show-setting-modal" : ""
                  }`}
                >
                  <button className="edit-btn setting-modal-btn">
                    Editar producto
                  </button>
                  <button
                    onClick={() => handleDelete(lote.id_lote)}
                    className="delete-btn setting-modal-btn"
                  >
                    Borrar producto
                  </button>
                </div>

                <div className="right-side flex flex-col">
                  <h2 className="name text-md font-semibold text-center text-gray-700">
                    {lote.producto.nombre_producto}
                  </h2>
                  <div className="flex flex-col items-center">
                    <p className="text-center text-gray-700">Quedan </p>
                    <span className="font-bold">
                      {lote.cantidad_producto} kg
                    </span>
                    <p className="text-center text-gray-700">Llegó el</p>
                    <span className="font-semibold">
                      {lote.fecha_entrada
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("/")
                        .slice(0, 5)}
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
