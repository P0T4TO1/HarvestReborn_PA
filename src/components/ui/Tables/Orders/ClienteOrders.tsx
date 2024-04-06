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
import { IOrden } from "@/interfaces";
import { MdOutlineVisibility } from "react-icons/md";

type Props = {
  orders: IOrden[];
};

export const OrdersTable = ({ orders }: Props) => {
  return (
    <div className=" w-full flex flex-col gap-4">
      <Table aria-label="Tabla de ordenes" selectionMode="multiple">
        <TableHeader>
          <TableColumn allowsSorting>ID</TableColumn>
          <TableColumn allowsSorting>Fecha</TableColumn>
          <TableColumn allowsSorting>Total</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody items={orders}>
          {(order) => (
            <TableRow key={order.id_orden}>
              <TableCell className="py-4">{order.id_orden}</TableCell>
              <TableCell className="py-4">{order.fecha_orden}</TableCell>
              <TableCell className="py-4">{order.monto_total}</TableCell>
              <TableCell className="py-4">
                <div className="flex items-center gap-4">
                  <Tooltip content="Ver detalles">
                    <MdOutlineVisibility className="text-blue-800 cursor-pointer" />
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
