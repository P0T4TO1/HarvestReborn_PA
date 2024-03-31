"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ILote, INegocio } from "@/interfaces";
import { hrApi } from "@/api";
import { CircularProgress, Image, Button } from "@nextui-org/react";
import {
  ProductsCollapsibleTable,
  SUCCESS_TOAST,
  EditNegocioAdmin,
} from "@/components";
import { toast } from "sonner";

interface NegocioInfoAdminProps {
  id_negocio: number;
}

export const NegocioInfoAdmin = ({ id_negocio }: NegocioInfoAdminProps) => {
  const [negocio, setNegocio] = useState<INegocio>();
  const [allLotes, setAllLotes] = useState<ILote[]>([]);
  const [lotesSorted, setLotesSorted] = useState<ILote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    hrApi.get(`/admin/users/negocios/${id_negocio}`).then((res) => {
      if (res.status === 200) {
        setNegocio(res.data);
      } else {
        setError(true);
        console.log("Error");
      }
      setLoading(false);
    });
    hrApi.get(`/negocio/inventory/${id_negocio}`).then((res) => {
      if (res.status === 200) {
        setLotesSorted(res.data);
      } else {
        setError(true);
        console.log("Error al obtener productos", res.data);
      }
    });
    hrApi.get(`/negocio/inventory/lotes/${id_negocio}`).then((res) => {
      if (res.status === 200) {
        setAllLotes(res.data);
      } else {
        setError(true);
        console.log("Error al obtener productos", res.data);
      }
    });
  }, [id_negocio]);

  return (
    <div className="my-10 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex">
        <li className="flex gap-2">
          <span className="material-symbols-outlined">home</span>
          <Link href={"/admin/dashboard"}>
            <span>Home</span>
          </Link>
          <span> / </span>{" "}
        </li>

        <li className="flex gap-2">
          <span className="material-symbols-outlined">store</span>
          <span>Negocios </span> <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>Info</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Información del negocio</h3>

      {loading ? (
        <CircularProgress size="lg" aria-label="Loading..." />
      ) : error ? (
        <p>Hubo un error</p>
      ) : (
        <>
          <div className="max-w-[95rem] mx-auto w-full">
            <div className="flex flex-col gap-4">
              <div className="col-span-2">
                <Button
                  type="button"
                  color="success"
                  className="mt-4"
                  size="md"
                  onClick={() => setIsEditing(!isEditing)}
                  startContent={
                    <span className="material-symbols-outlined">
                      edit_square
                    </span>
                  }
                >
                  {isEditing ? "Cancelar" : "Editar"}
                </Button>
              </div>
              <EditNegocioAdmin
                negocio={negocio as INegocio}
                isEditing={isEditing}
              />
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Imágenes</span>
                {negocio?.images_negocio.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={index.toString()}
                    width={200}
                    height={200}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Productos</span>
                <ProductsCollapsibleTable
                  allLotes={allLotes}
                  lotesById={lotesSorted}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
