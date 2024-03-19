"use client";

import {
  CircularProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { IUser } from "@/interfaces";
import { hrApi } from "@/api";

export const TableUsers = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = React.useState<IUser[]>([]);

  useEffect(() => {
    hrApi.get("/admin/users").then((res) => {
      if (res.status === 200) {
        setUsers(res.data);
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
            <TableColumn allowsSorting>Nombre</TableColumn>
            <TableColumn allowsSorting>Apellido</TableColumn>
            <TableColumn allowsSorting>Correo</TableColumn>
            <TableColumn allowsSorting>Rol</TableColumn>
            <TableColumn allowsSorting>Estado</TableColumn>
            <TableColumn>Acciones</TableColumn>
          </TableHeader>
          <TableBody items={users}>
            {(user) => (
              <TableRow key={user.id}>
                <TableCell className="py-4">
                  {user.id_rol === 2 ? (
                    user.duenonegocio?.nombre_dueneg
                  ) : user.id_rol === 3 ? (
                    user.cliente?.nombre_cliente
                  ) : (
                    <>
                      {user.cliente?.nombre_cliente}
                      {user.duenonegocio?.nombre_dueneg}
                    </>
                  )}
                </TableCell>
                <TableCell className="py-4">
                  {user.id_rol === 2 ? (
                    user.duenonegocio?.apellidos_dueneg
                  ) : user.id_rol === 3 ? (
                    user.cliente?.apellidos_cliente
                  ) : (
                    <>
                      {user.cliente?.apellidos_cliente}
                      {user.duenonegocio?.apellidos_dueneg}
                    </>
                  )}
                </TableCell>
                <TableCell className="py-4">{user.email}</TableCell>
                <TableCell className="py-4">
                  {user.id_rol === 1
                    ? "Admin"
                    : user.id_rol === 2
                    ? "Dueño de negocio"
                    : "Cliente"}
                </TableCell>
                <TableCell className="py-4">
                  <Chip
                    size="sm"
                    variant="flat"
                    color={user.estado === "ACTIVO" ? "success" : "danger"}
                  >
                    {user.estado.charAt(0) + user.estado.slice(1).toLowerCase()}
                  </Chip>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <Tooltip content="Editar">
                        <span className="material-symbols-outlined text-gray-600 cursor-pointer">
                          edit
                        </span>
                      </Tooltip>
                    </div>
                    <div>
                      <Tooltip content="Desactivar">
                        <span className="material-symbols-outlined text-red-800 cursor-pointer">
                          delete
                        </span>
                      </Tooltip>
                    </div>
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
