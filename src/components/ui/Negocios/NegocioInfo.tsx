"use client";

import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/auth";
import { INegocio } from "@/interfaces";
import { hrApi } from "@/api";
import { useSearchParams } from "next/navigation";
import { Input } from "@nextui-org/input";
import { ProductCard } from "@/components";

export const NegocioInfo = () => {
  const router = useRouter();
  const navigateTo = (path: string) => {
    router.push(path);
  };
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { user } = useContext(AuthContext);
  const [negocio, setNegocio] = useState<INegocio>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const [productId, setProductId] = useState<number>();

  const [search, setSearch] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const results = !search
    ? negocio?.inventario?.lote
    : negocio?.inventario?.lote?.filter((dato) =>
        dato.producto?.nombre_producto
          .toLowerCase()
          .includes(search.toLocaleLowerCase())
      );

  useEffect(() => {
    hrApi.get(`/negocio/${parseInt(id as string)}`).then((res) => {
      if (res.status === 200) {
        setNegocio(res.data);
      } else {
        setError(true);
        console.log("Error al obtener negocio", res.data);
      }
      setLoading(false);
    });
  }, [id]);

  const addProduct = async (id: number, cantidad: number) => {
    const res = await hrApi.post("/inventory", {
      id_producto: productId,
      cantidad_producto: 0,
      fecha_entrada: new Date(),
      fecha_vencimiento: new Date(),
      precio_kg: 0,
      monto_total: 0,
      inventory_id: user?.negocio?.id_negocio,
    });
    if (res.status === 201) {
      router.refresh();
    } else {
      console.log("Error al agregar producto", res.data);
    }
  };

  return (
    <div className="p-24">
      <h1 className="font-bebas-neue uppercase text-4xl font-black flex flex-col leading-none text-green-900">
        {negocio?.nombre_negocio}
        <span className="text-xl text-gray-900 font-semibold">
          Aquí puedes ver los productos disponibles en este negocio
        </span>
      </h1>
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Hubo un error</p>
      ) : (
        <>
          <div className="flex mt-12">
            <div className="flex flex-1 justify-center sm:justify-start">
              <div className="flex flex-col w-full">
                <div className="flex flex-col w-full">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Información del negocio
                  </h2>
                  <div className="flex flex-col w-full">
                    <div className="flex flex-col w-full">
                      <span className="text-lg font-semibold text-gray-900">
                        Nombre del negocio: {negocio?.nombre_negocio}
                      </span>
                    </div>
                    <div className="flex flex-col w-full">
                      <span className="text-lg font-semibold text-gray-900">
                        Dirección: {negocio?.direccion_negocio}
                      </span>
                    </div>
                    <div className="flex flex-col w-full">
                      <span className="text-lg font-semibold text-gray-900">
                        Teléfono:{" "}
                        {negocio?.telefono_negocio
                          ?.toString()
                          .split("")
                          .map((n, i) =>
                            i === 1 || i === 3 || i === 5 || i === 7
                              ? n + " "
                              : n
                          )
                          .join("")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ul className="mt-8 grid grid-cols-4">
            {results?.map((lote) => (
              <li key={lote.id_producto} className="p-2 flex">
                <ProductCard lote={lote} route={"negocio-info"}>
                  <Input
                      className="setting-modal-btn"
                      placeholder="Cantidad kg"
                      type="number"
                      min="1"
                      max={lote.cantidad_producto}
                      onChange={(e) => {
                        console.log(e.target.value);
                      }}
                  />
                </ProductCard>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
