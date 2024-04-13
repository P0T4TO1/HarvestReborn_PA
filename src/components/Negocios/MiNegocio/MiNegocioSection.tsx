"use client";

import React, { useContext, useEffect, useState } from "react";
import { Tab, Tabs, CircularProgress } from "@nextui-org/react";
import {
  GeneralDataForm,
  DescriptionForm,
  ImagesForm,
  DANGER_TOAST,
} from "@/components";
import { INegocio } from "@/interfaces";
import { hrApi } from "@/api";
import { AuthContext } from "@/context/auth";
import { toast } from "sonner";

export const MiNegocioSection = () => {
  const { user } = useContext(AuthContext);
  const [negocio, setNegocio] = useState<INegocio>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.duenonegocio?.negocio.id_negocio) return;
    hrApi
      .get(`/negocio/${user?.duenonegocio?.negocio.id_negocio}`)
      .then((res) => {
        setNegocio(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast("Hubo un error", DANGER_TOAST);
      });
  }, [user?.duenonegocio?.negocio.id_negocio]);

  return (
    <>
      {loading ? (
        <div className="w-full flex items-center justify-center min-h-screen">
          <h1 className="text-2xl font-semibold py-4">Cargando...</h1>
          <CircularProgress size="lg" />
        </div>
      ) : (
        <div className="container m-auto mt-12 h-full">
          <div>
            <h1 className="font-bebas-neue uppercase text-2xl font-black flex flex-col leading-none dark:text-green-600 text-green-900 mb-4">
              Tu negocio
            </h1>
          </div>
          <div className="flex flex-col gap-4">
            <Tabs variant="underlined" aria-label="Tabs variants">
              <Tab title="Datos del negocio">
                <GeneralDataForm negocio={negocio as INegocio} />
              </Tab>
              <Tab title="Descripción">
                <DescriptionForm negocio={negocio as INegocio} />
              </Tab>
              <Tab title="Imágenes">
                <ImagesForm negocio={negocio as INegocio} />
              </Tab>
            </Tabs>
          </div>
        </div>
      )}
    </>
  );
};
