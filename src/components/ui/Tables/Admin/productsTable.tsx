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
  useDisclosure,
  Pagination,
  Input,
  Image,
} from "@nextui-org/react";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { IProduct } from "@/interfaces";
import { hrApi } from "@/api";
import { toast } from "sonner";
import {
  DANGER_TOAST,
  EditProductAdminModal,
  SUCCESS_TOAST,
} from "@/components";

export const TableProducts = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const [loading, setLoading] = useState(true);
  const [loadingModal, setLoadingModal] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [product, setProduct] = useState<IProduct>();
  const [search, setSearch] = useState("");

  useEffect(() => {
    hrApi.get("/admin/product").then((res) => {
      if (res.status === 200) {
        setProducts(res.data);
      } else {
        setError(true);
      }
      setLoading(false);
    });
  }, []);

  const [page, setPage] = useState(1);
  const rowsPerPage = 15;

  const pages = Math.ceil(products.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return products.slice(start, end);
  }, [page, products]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const results = !search
    ? items
    : items.filter((dato) =>
        dato.nombre_producto.toLowerCase().includes(search.toLocaleLowerCase())
      );

  const getProduct = async (id: number) => {
    setLoadingModal(true);
    await hrApi.get(`/negocio/inventory/products/${id}`).then((res) => {
      if (res.status === 200) {
        setProduct(res.data);
      } else {
        setError(true);
        console.log("Error al obtener producto", res.data);
      }
      setLoadingModal(false);
    });
  };

  const handleDelete = async (id: number) => {
    await hrApi.delete("/admin/product", { data: { id } }).then((res) => {
      if (res.status === 200) {
        toast("Producto eliminado con éxito", SUCCESS_TOAST);
        setProducts(products.filter((product) => product.id_producto !== id));
        window.location.reload();
      } else {
        toast("Hubo un error al borrar el producto", DANGER_TOAST);
        console.log("Error al borrar producto", res.data);
      }
    });
  };

  return (
    <>
      <div className="flex flex-1 justify-center sm:justify-start">
        <div className="mt-4 p-2">
          <Input
            size="md"
            radius="lg"
            placeholder="Buscar productos..."
            type="text"
            startContent={
              <span className="material-symbols-outlined">search</span>
            }
            defaultValue={search}
            onChange={handleChange}
          />
        </div>
      </div>
      <EditProductAdminModal
        product={product}
        useDisclosure={{ isOpen, onClose }}
        loading={loadingModal}
      />
      <div className=" w-full flex flex-col gap-4">
        {loading ? (
          <CircularProgress size="lg" aria-label="Loading..." />
        ) : error ? (
          <p>Hubo un error</p>
        ) : (
          <Table
            aria-label="Tabla de usuario"
            selectionMode="multiple"
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="primary"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </div>
            }
          >
            <TableHeader>
              <TableColumn allowsSorting>No. de producto</TableColumn>
              <TableColumn>Imagen</TableColumn>
              <TableColumn allowsSorting>Nombre</TableColumn>
              <TableColumn allowsSorting>Descripcion</TableColumn>
              <TableColumn allowsSorting>En temporada</TableColumn>
              <TableColumn allowsSorting>Categoria</TableColumn>
              <TableColumn>Acciones</TableColumn>
            </TableHeader>
            <TableBody items={items}>
              {results.map((productMap, key) => (
                <TableRow key={productMap.id_producto}>
                  <TableCell className="py-4">
                    {key + 1 + rowsPerPage * (page - 1)}
                  </TableCell>
                  <TableCell className="py-4">
                    <Image
                      src={productMap.imagen_producto}
                      alt={productMap.nombre_producto}
                      className="w-12 h-12 rounded-full"
                    />
                  </TableCell>
                  <TableCell className="py-4">
                    {productMap.nombre_producto}
                  </TableCell>
                  <TableCell className="py-4">
                    {productMap.descripcion}
                  </TableCell>
                  <TableCell className="py-4">
                    <Chip
                      size="sm"
                      variant="flat"
                      color={`${productMap.enTemporada ? "success" : "danger"}`}
                    >
                      {productMap.enTemporada ? "Si" : "No"}
                    </Chip>
                  </TableCell>
                  <TableCell className="py-4">
                    <Chip
                      size="sm"
                      variant="flat"
                      color={`${
                        productMap.categoria === "VERDURA"
                          ? "primary"
                          : "secondary"
                      }`}
                    >
                      {productMap.categoria}
                    </Chip>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-4">
                      <Tooltip content="Editar">
                        <Button
                          type="button"
                          variant="light"
                          isIconOnly
                          onPress={() => {
                            getProduct(productMap.id_producto).then(() => {});
                            setLoadingModal(true);
                            onOpen();
                          }}
                        >
                          <span className="material-symbols-outlined text-gray-600 cursor-pointer">
                            edit
                          </span>
                        </Button>
                      </Tooltip>
                      <Tooltip content="Eliminar">
                        <Button
                          type="button"
                          variant="light"
                          isIconOnly
                          onPress={() => handleDelete(productMap.id_producto)}
                        >
                          <span className="material-symbols-outlined  text-red-800 cursor-pointer">
                            delete
                          </span>
                        </Button>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  );
};
