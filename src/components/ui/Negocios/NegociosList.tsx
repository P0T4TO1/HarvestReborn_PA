"use client";

import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/auth";
import { INegocio } from "@/interfaces";
import { hrApi } from "@/api";
import { Select, SelectItem } from "@nextui-org/react";
import NextLink from "next/link";

export const NegociosList = () => {
  const router = useRouter();
  const navigateTo = (path: string) => {
    router.push(path);
  };

  const { user } = useContext(AuthContext);
  const [negocios, setNegocios] = useState<INegocio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [search, setSearch] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const results = !search
    ? negocios
    : negocios.filter((dato) =>
        dato.inventario?.lote?.filter((lote) =>
          lote.producto?.nombre_producto
            .toLowerCase()
            .includes(search.toLocaleLowerCase())
        )
      );

  useEffect(() => {
    hrApi.get("/negocio").then((res) => {
      if (res.status === 200) {
        setNegocios(res.data);
      } else {
        setError(true);
        console.log("Error al obtener negocios", res.data);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-24">
      <h1 className="font-bebas-neue uppercase text-4xl font-black flex flex-col leading-none text-green-900">
        Negocios
        <span className="text-xl text-gray-900 font-semibold">
          Aquí puedes ver los negocios donde puedes adquirir productos
        </span>
      </h1>

      <div className="flex">
        <div className="flex flex-1 justify-center sm:justify-start">
          <input
            type="text"
            placeholder="Buscar productos"
            className="mt-4 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-700"
            defaultValue={search}
            onChange={handleChange}
          />
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
          </Select>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2">
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>Hubo un error</p>
        ) : (
          results.map((negocio) => (
            <div
              className="max-w-2xl bg-emerald-600 shadow-lg rounded-lg"
              key={negocio.id_negocio}
            >
              <div className="px-6 py-5">
                <div className="flex items-start">
                  <span className="material-symbols-outlined fill-current flex-shrink-0 mr-5 mt-1.5 text-gray-300">
                    storefront
                  </span>

                  <div className="flex-grow truncate">
                    <div className="w-full sm:flex justify-between items-center mb-3">
                      <h2 className="text-2xl leading-snug font-extrabold text-gray-50 truncate mb-1 sm:mb-0">
                        {negocio.nombre_negocio}
                      </h2>

                      <div className="flex-shrink-0 flex items-center space-x-3 sm:ml-2">
                        <button className="flex items-center text-left text-sm font-medium text-indigo-100 hover:text-white group focus:outline-none focus-visible:border-b focus-visible:border-indigo-100">
                          <span className="material-symbols-outlined">
                            favorite
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="flex items-end justify-between whitespace-normal">
                      <div className="max-w-md text-indigo-100">
                        <p className="mb-2">
                          <span className="font-semibold">Dirección:</span>{" "}
                          {negocio.direccion_negocio}, Ciudad de México
                        </p>
                        <p className="mb-2">
                          <span className="font-semibold">Teléfono:</span>{" "}
                          {negocio.telefono_negocio}
                        </p>
                        {negocio.email_negocio && (
                          <p className="mb-2">
                            <span className="font-semibold">Correo:</span>{" "}
                            {negocio.email_negocio}
                          </p>
                        )}
                        <p className="mb-2">
                          <span className="font-semibold">
                            Productos disponibles:
                          </span>{" "}
                          {negocio.inventario?.lote?.map((lote) => (
                            <span key={lote.id_lote}>
                              {lote.producto?.nombre_producto}
                              {", "}
                            </span>
                          ))}
                        </p>
                      </div>

                      <NextLink
                        className="flex-shrink-0 flex items-center justify-center text-indigo-600 w-10 h-10 rounded-full bg-gradient-to-b from-indigo-50 to-indigo-100 hover:from-white hover:to-indigo-50 focus:outline-none focus-visible:from-white focus-visible:to-white transition duration-150 ml-2"
                        href={`/negocios/${negocio.nombre_negocio}?id=${negocio.id_negocio}`}
                      >
                        <span className="material-symbols-outlined">
                          more_up
                        </span>
                      </NextLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
