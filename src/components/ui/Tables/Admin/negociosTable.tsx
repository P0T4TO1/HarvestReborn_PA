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
  Button,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { INegocio } from "@/interfaces";
import { hrApi } from "@/api";
import { useRouter } from "next/navigation";

export const TableNegocios = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [negocios, setNegocios] = React.useState<INegocio[]>([]);

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
            <TableColumn>Fecha de creación</TableColumn>
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
                  {negocio.created_at?.toString().split("-")[2].split("T")[0]}
                </TableCell>
                <TableCell className="py-4">{negocio.id_dueneg}</TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-4">
                    <Tooltip content="Ver más">
                      <Button
                        type="button"
                        variant="light"
                        isIconOnly
                        onPress={() =>
                          router.push(
                            `/admin/dashboard/negocios/${negocio.id_negocio}`
                          )
                        }
                      >
                        <span className="material-symbols-outlined">info</span>
                      </Button>
                    </Tooltip>
                    <Tooltip content="Eliminar">
                      <Button type="button" variant="light" isIconOnly>
                        <span className="material-symbols-outlined  text-red-800 cursor-pointer">
                          delete
                        </span>
                      </Button>
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
