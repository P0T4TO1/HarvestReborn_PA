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
  Button,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { IProduct } from "@/interfaces";
import { hrApi } from "@/api";
import { toast } from "sonner";
import { DANGER_TOAST, SUCCESS_TOAST } from "@/components";

export const TableProducts = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = React.useState<IProduct[]>([]);

  useEffect(() => {
    hrApi.get("/inventory/products").then((res) => {
      if (res.status === 200) {
        setProducts(res.data);
      } else {
        setError(true);
      }
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const res = await hrApi
        .delete("/admin/product", { data: { id } })
        .then(() => {
          toast("Producto eliminado con éxito", SUCCESS_TOAST);
          window.location.reload();
          return true;
        })
        .catch((err) => {
          console.log(err);
          toast("Hubo un error al eliminar el producto", DANGER_TOAST);
          return null;
        });
      if (res) {
        console.log("Producto eliminado");
      } else {
        console.log("Hubo un error data");
      }
    } catch (error) {
      console.log(error);
      console.log("Hubo un error");
    }
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
            <TableColumn allowsSorting>Descripcion</TableColumn>
            <TableColumn allowsSorting>En temporada</TableColumn>
            <TableColumn allowsSorting>Categoria</TableColumn>
            <TableColumn>Acciones</TableColumn>
          </TableHeader>
          <TableBody items={products}>
            {(product) => (
              <TableRow key={product.id_producto}>
                <TableCell className="py-4">{product.id_producto}</TableCell>
                <TableCell className="py-4">
                  {product.nombre_producto}
                </TableCell>
                <TableCell className="py-4">{product.descripcion}</TableCell>
                <TableCell className="py-4">
                  <Chip
                    size="sm"
                    variant="flat"
                    color={`${product.enTemporada ? "success" : "danger"}`}
                  >
                    {product.enTemporada ? "Si" : "No"}
                  </Chip>
                </TableCell>
                <TableCell className="py-4">
                  <Chip
                    size="sm"
                    variant="flat"
                    color={`${
                      product.categoria === "VERDURA" ? "primary" : "secondary"
                    }`}
                  >
                    {product.categoria}
                  </Chip>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-4">
                    <Tooltip content="Editar">
                      <span className="material-symbols-outlined text-gray-600 cursor-pointer">
                        edit
                      </span>
                    </Tooltip>
                    <Tooltip content="Eliminar">
                      <Button
                        type="button"
                        isIconOnly
                        onPress={() => handleDelete(product.id_producto)}
                      >
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
