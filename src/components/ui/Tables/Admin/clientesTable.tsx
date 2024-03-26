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
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { ICliente } from "@/interfaces";
import { hrApi } from "@/api";

export const TableClientes = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [clientes, setClientes] = React.useState<ICliente[]>([]);

  useEffect(() => {
    hrApi.get("/admin/users/clientes").then((res) => {
      if (res.status === 200) {
        setClientes(res.data);
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
            <TableColumn allowsSorting>Apellidos</TableColumn>
            <TableColumn allowsSorting>Teléfono</TableColumn>
            {/*<TableColumn allowsSorting>Email</TableColumn>*/}
            <TableColumn allowsSorting>ID del usuario</TableColumn>
            <TableColumn>Acciones</TableColumn>
          </TableHeader>
          <TableBody items={clientes}>
            {(cliente) => (
              <TableRow key={cliente.id_cliente}>
                <TableCell className="py-4">{cliente.id_cliente}</TableCell>
                <TableCell className="py-4">{cliente.nombre_cliente}</TableCell>
                <TableCell className="py-4">
                  {cliente.apellidos_cliente}
                </TableCell>
                <TableCell className="py-4">
                  {cliente.telefono_cliente}
                </TableCell>
                <TableCell className="py-4">{cliente.id_user}</TableCell>
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
