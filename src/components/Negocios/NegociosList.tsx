"use client";

import React, { useEffect, useState } from "react";
import { Estado, INegocio } from "@/interfaces";
import { hrApi } from "@/api";
import {
  CardBody,
  Link,
  Divider,
  Select,
  SelectItem,
  CircularProgress,
  Button,
  Card,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { MdLabelImportantOutline } from "react-icons/md";

export const NegociosList = () => {
  const [negocios, setNegocios] = useState<INegocio[]>([]);
  const [negocio, setNegocio] = useState<INegocio>();
  const [loading, setLoading] = useState(true);
  const [loadingNegocio, setLoadingNegocio] = useState(false);
  const [error, setError] = useState(false);

  // const [search, setSearch] = useState("");
  //
  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setSearch(event.target.value);
  // };
  //
  // const results = !search
  //   ? negocios
  //   : negocios.filter((dato) =>
  //       dato.inventario?.lote?.filter((lote) =>
  //         lote.producto?.nombre_producto
  //           .toLowerCase()
  //           .includes(search.toLocaleLowerCase())
  //       )
  //     );

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
            // defaultValue={search}
            // onChange={handleChange}
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
      <div className="grid grid-cols-5 mt-10 gap-8">
        <div className="col-span-2">
          {loading ? (
            <CircularProgress size="lg" />
          ) : error ? (
            <p>Error al cargar los negocios</p>
          ) : (
            negocios.map(
              (negocio) =>
                negocio.estado_negocio === Estado.Activo && (
                  <Card
                    isPressable
                    isHoverable
                    shadow="lg"
                    key={negocio.id_negocio}
                    className="mb-6 w-full"
                    classNames={{
                      base: "hover:border-green-700 border-2 border-gray-300",
                    }}
                    onPress={() => getNegocio(negocio.id_negocio)}
                  >
                    <CardHeader className="flex justify-between flex-row items-center px-5 pt-4">
                      <div className="flex gap-2 justify-center items-center">
                        <span className="material-symbols-outlined">
                          storefront
                        </span>
                        <h2 className="text-2xl font-bold">
                          {negocio.nombre_negocio}
                        </h2>
                      </div>
                      <div>
                        <Button color="success" variant="light" isIconOnly>
                          <span className="material-symbols-outlined">
                            star
                          </span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardBody className="overflow-visible px-5 pb-2">
                      <p className="mb-4">{negocio.direccion_negocio}</p>
                    </CardBody>
                  </Card>
                )
            )
          )}
        </div>

        <div className="col-span-3">
          {loadingNegocio ? (
            <CircularProgress size="lg" />
          ) : error ? (
            <p>Error al cargar los negocios</p>
          ) : negocio ? (
            <Card
              className="mb-6 w-full max-h-[50rem]"
              classNames={{
                base: "border-2 border-gray-300",
              }}
            >
              <Image
                src={negocio?.images_negocio[0] || "/images/no-image.jpg"}
                alt={negocio?.nombre_negocio}
                className="min-w-full h-40 object-cover rounded-t-lg"
              />
              <CardHeader className="px-4 flex flex-col items-start">
                <h2 className="text-2xl font-bold mb-4">
                  {negocio?.nombre_negocio}
                </h2>
                <p>Ve los productos que ofrece </p>
                <Button color="success" size="md" className="mt-2">
                  <Link
                    href={`/negocios/${negocio.id_negocio}/${negocio.nombre_negocio}`}
                    className="text-gray-700"
                  >
                    Ver productos
                  </Link>
                </Button>
              </CardHeader>
              <Divider />
              <CardBody className="px-4 pb-4 overflow-y-scroll">
                <div className="flex flex-col mt-6">
                  <div className="flex gap-2 items-center">
                    <span className="material-symbols-outlined">help</span>
                    <h3 className="text-xl font-semibold">Descripción</h3>
                  </div>
                  <p className="mb-2 mt-2">{negocio?.descripcion_negocio}</p>
                </div>
                <Divider />
                <div className="flex flex-col mt-6">
                  <div className="flex gap-2 items-center mt-2">
                    <span className="material-symbols-outlined">inventory</span>
                    <h3 className="text-xl font-semibold">
                      Productos disponibles
                    </h3>
                  </div>
                  <div className="grid grid-cols-3">
                    {negocio?.inventario?.lote?.map((lote) => (
                      <ul
                        key={lote.id_lote}
                        className="flex gap-2 items-center"
                      >
                        <li className="flex items-center">
                          <MdLabelImportantOutline />
                          <p className="mb-2 mt-2">
                            {lote.producto?.nombre_producto}
                          </p>
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
                <Divider />
                <div className="flex flex-col mt-6">
                  <div className="flex gap-2 items-center">
                    <span className="material-symbols-outlined">
                      perm_phone_msg
                    </span>
                    <h3 className="text-xl font-semibold mt-2">Contacto</h3>
                  </div>
                  <p className="mb-2 mt-2">{negocio?.dueneg?.nombre_dueneg}</p>
                  <p className="mb-2">{negocio?.telefono_negocio}</p>
                  <p className="mb-2">
                    {negocio?.email_negocio || negocio?.dueneg?.user?.email}
                  </p>
                </div>
                <Divider />
                <div className="flex flex-col mt-6">
                  <div className="flex gap-2 items-center">
                    <span className="material-symbols-outlined">
                      location_on
                    </span>
                    <h3 className="text-xl font-semibold mt-2">Ubicación</h3>
                  </div>
                  <p className="mb-2 mt-2">{negocio?.direccion_negocio}</p>
                  <iframe
                    style={{ border: "0" }}
                    width="100%"
                    height="450"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAIAxu9rSTpzfa_kkep1niIDxKvMtypqXM&q=${negocio?.direccion_negocio}`}
                  ></iframe>
                </div>
              </CardBody>
            </Card>
          ) : (
            <Card
              classNames={{
                base: "border-2 border-gray-300",
              }}
            >
              <CardHeader>
                <h2>Seleccione un negocio para visualizar su información</h2>
              </CardHeader>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
