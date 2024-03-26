"use client";

import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  Chip,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { INegocio } from "@/interfaces";
import { hrApi } from "@/api";

export const TableNegocios = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [negocios, setNegocios] = React.useState<INegocio[]>([]);
  const [negocio, setNegocio] = useState<INegocio>();

  useEffect(() => {
    hrApi.get("/admin/users/negocios").then((res) => {
      if (res.status === 200) {
        setNegocios(res.data);
      } else {
        setError(true);
      }
      setLoading(false);
    });
  }, []);

  const getNegocio = async (id: number) => {
    setLoading(true);
    await hrApi.get(`/admin/users/negocios/${id}`).then((res) => {
      if (res.status === 200) {
        setNegocio(res.data);
      } else {
        setError(true);
      }
      setLoading(false);
    });
  };

  return (
    <div className=" w-full flex flex-col gap-4">
      {loading ? (
        <CircularProgress size="lg" aria-label="Loading..." />
      ) : error ? (
        <p>Hubo un error</p>
      ) : (
        <Table aria-label="Tabla de usuario" selectionMode="multiple">
          <TableHeader>
            <TableColumn allowsSorting>ID</TableColumn>
            <TableColumn allowsSorting>Nombre</TableColumn>
            <TableColumn allowsSorting>Dirección</TableColumn>
            <TableColumn allowsSorting>Teléfono</TableColumn>
            <TableColumn allowsSorting>Email</TableColumn>
            <TableColumn allowsSorting>ID dueño</TableColumn>
            <TableColumn>Estado</TableColumn>
            <TableColumn>Acciones</TableColumn>
          </TableHeader>
          <TableBody items={negocios}>
            {(negocio) => (
              <TableRow key={negocio.id_negocio}>
                <TableCell className="py-4">{negocio.id_negocio}</TableCell>
                <TableCell className="py-4">{negocio.nombre_negocio}</TableCell>
                <TableCell className="py-4">
                  {negocio.direccion_negocio}
                </TableCell>
                <TableCell className="py-4">
                  {negocio.telefono_negocio}
                </TableCell>
                <TableCell className="py-4">{negocio.email_negocio}</TableCell>
                <TableCell className="py-4">{negocio.id_dueneg}</TableCell>
                <Chip
                  size="sm"
                  variant="flat"
                  color={
                    negocio.estado_negocio === "ACTIVO"
                      ? "success"
                      : negocio.estado_negocio === "INACTIVO"
                      ? "danger"
                      : "warning"
                  }
                >
                  {negocio.estado_negocio.charAt(0) +
                    negocio.estado_negocio.slice(1).toLowerCase()}
                </Chip>
                <TableCell className="py-4">
                  <div className="flex items-center gap-4">
                    <Tooltip content="Editar">
                      <span className="material-symbols-outlined text-gray-600 cursor-pointer">
                        edit
                      </span>
                    </Tooltip>
                    <Tooltip content="Eliminar">
                      <span className="material-symbols-outlined  text-red-800 cursor-pointer">
                        delete
                      </span>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
