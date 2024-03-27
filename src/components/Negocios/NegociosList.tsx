"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Estado, INegocio } from "@/interfaces";
import { hrApi } from "@/api";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
  Select,
  SelectItem,
  CircularProgress,
} from "@nextui-org/react";
import { Box, Grid } from "@mui/material";

export const NegociosList = () => {
  const [negocios, setNegocios] = useState<INegocio[]>([]);
  const [negocio, setNegocio] = useState<INegocio>();
  const [loading, setLoading] = useState(true);
  const [loadingNegocio, setLoadingNegocio] = useState(false);
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

  const getNegocio = async (id: number | undefined) => {
    setLoadingNegocio(true);
    await hrApi.get(`/negocio/${id}`).then((res) => {
      if (res.status === 200) {
        setNegocio(res.data);
      } else {
        console.log("Error al obtener negocio", res.data);
      }
      setLoadingNegocio(false);
    });
  };

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
    <div className="pt-20 lg:px-48 md:px-20 sm:px-12">
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
      <div className="grid grid-cols-3 mt-10 gap-8">
        <div>
          {loading ? (
            <CircularProgress size="lg" />
          ) : error ? (
            <p>Error al cargar los negocios</p>
          ) : (
            results.map(
              (negocio) =>
                negocio.estado_negocio === Estado.Activo && (
                  <Card
                    isPressable
                    key={negocio.id_negocio}
                    className="mb-6 w-full"
                    onPress={() => getNegocio(negocio.id_negocio)}
                  >
                    <CardHeader>
                      <h2 className="text-2xl font-bold">
                        {negocio.nombre_negocio}
                      </h2>
                    </CardHeader>
                    <CardBody>
                      <p>{negocio.descripcion_negocio}</p>
                    </CardBody>
                    <CardFooter>
                      <Link href={`/negocios/${negocio.id_negocio}`}>
                        Ver más
                      </Link>
                    </CardFooter>
                  </Card>
                )
            )
          )}
        </div>
        <div className="col-span-2">
          {loadingNegocio ? (
            <CircularProgress size="lg" />
          ) : error ? (
            <p>Error al cargar los negocios</p>
          ) : (
            <Card>
              {negocio ? (
                <>
                  <CardHeader>
                    <h2 className="text-xl font-bold">
                      Información general de {negocio?.nombre_negocio}
                    </h2>
                  </CardHeader>
                  <CardBody>
                    <p>
                      <span className="font-bold">Nombre:</span>{" "}
                      {negocio?.nombre_negocio}
                    </p>
                    <p>
                      <span className="font-bold">Descripción:</span>{" "}
                      {negocio?.descripcion_negocio}
                    </p>
                    <p>
                      <span className="font-bold">Dirección:</span>{" "}
                      {negocio?.direccion_negocio}
                    </p>
                    <p>
                      <span className="font-bold">Teléfono:</span>{" "}
                      {negocio?.telefono_negocio}
                    </p>
                    <p>
                      <span className="font-bold">Email:</span>{" "}
                      {negocio?.email_negocio}
                    </p>

                    <p>
                      <span className="font-bold">Total de productos:</span>{" "}
                      {negocio?.inventario?.lote?.length}
                    </p>
                  </CardBody>
                </>
              ) : (
                <>
                  <CardHeader>
                    <h2 className="text-xl font-bold">
                      Seleccione un negocio para visualizar su información
                    </h2>
                  </CardHeader>
                </>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
