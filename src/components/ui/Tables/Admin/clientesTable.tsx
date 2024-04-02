"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { ICliente } from "@/interfaces";

interface Props {
  clientes: ICliente[];
}

export const TableClientes = ({ clientes }: Props) => {
  return (
    <div className=" w-full flex flex-col gap-4">
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
              <TableCell className="py-4">{cliente.telefono_cliente}</TableCell>
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
    </div>
  );
};
