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
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { IProduct } from "@/interfaces";
import { hrApi } from "@/api";
import { toast } from "sonner";
import {
  DANGER_TOAST,
  EditProductAdminModal,
  SUCCESS_TOAST,
} from "@/components";
import { useRouter } from "next/navigation";

export const TableProducts = () => {
  const router = useRouter();
  const { onOpen, onClose, isOpen } = useDisclosure();

  const [loading, setLoading] = useState(true);
  const [loadingModal, setLoadingModal] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [product, setProduct] = useState<IProduct>();

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(products.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return products.slice(start, end);
  }, [page, products]);

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

  const getProduct = async (id: number) => {
    setLoadingModal(true);
    await hrApi.get(`/inventory/products/${id}`).then((res) => {
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
    try {
      await hrApi.delete("/admin/product", { data: { id } }).then((res) => {
        if (res.status === 200) {
          toast("Producto eliminado con éxito", SUCCESS_TOAST);
          setProducts(products.filter((product) => product.id_producto !== id));
          window.location.reload();
          router.refresh();
          return true;
        } else {
          toast("Hubo un error al borrar el producto", DANGER_TOAST);
          console.log("Error al borrar producto", res.data);
        }
      });
    } catch (error) {
      console.log(error);
      console.log("Hubo un error");
    }
  };

  return (
    <>
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
              <TableColumn allowsSorting>ID</TableColumn>
              <TableColumn allowsSorting>Nombre</TableColumn>
              <TableColumn allowsSorting>Descripcion</TableColumn>
              <TableColumn allowsSorting>En temporada</TableColumn>
              <TableColumn allowsSorting>Categoria</TableColumn>
              <TableColumn>Acciones</TableColumn>
            </TableHeader>
            <TableBody items={items}>
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
                        product.categoria === "VERDURA"
                          ? "primary"
                          : "secondary"
                      }`}
                    >
                      {product.categoria}
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
                            getProduct(product.id_producto).then(() => {});
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
    </>
  );
};
