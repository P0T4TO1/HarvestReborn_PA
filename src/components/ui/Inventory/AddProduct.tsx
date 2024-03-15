"use client";

import { ChangeEvent, useContext, useEffect, useState } from "react";
import { IProduct } from "@/interfaces";
import { hrApi } from "@/api";
import { ProductCard } from "@/components";
import { AuthContext } from "@/context/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  CircularProgress,
} from "@nextui-org/react";
import { productSchema } from "@/validations/products.validation";
import { SUCCESS_TOAST } from "@/components/toast";

interface IFormData {
  id_producto: number;
  cantidad_producto: number;
  fecha_entrada: Date;
  fecha_vencimiento: Date;
  precio_kg: number;
  monto_total: number;
  inventory_id: number;
}

type Errors = {
  cantidad_producto?: number;
  fecha_entrada?: string;
  fecha_vencimiento?: string;
  precio_kg?: number;
} | null;

export const AddProduct = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState<Errors>(null);
  const [productId, setProductId] = useState<number>();
  const [product, setProduct] = useState<IProduct>();
  const [isEditing, setIsEditing] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(AuthContext);

  const methods = useForm<IFormData>();
  const { handleSubmit, register } = methods;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const results = !search
    ? products
    : products.filter((dato) =>
        dato.nombre_producto.toLowerCase().includes(search.toLocaleLowerCase())
      );

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

  const addProduct: SubmitHandler<IFormData> = async (data) => {
    try {
      const validations = productSchema.safeParse(data);
      if (!validations.success) {
        let newErrors: Errors = {};

        validations.error.issues.forEach((issue) => {
          newErrors = { ...newErrors, [issue.path[0]]: issue.message };
        });
        setErrors(newErrors);
        return null;
      } else {
        setErrors(null);
      }

      const res = await hrApi
        .post(`/inventory/${productId}`, {
          id: productId,
          cantidad_producto: data.cantidad_producto,
          fecha_entrada: data.fecha_entrada,
          fecha_vencimiento: data.fecha_vencimiento,
          precio_kg: data.precio_kg,
          monto_total: data.cantidad_producto * data.precio_kg,
          inventory_id: user?.negocio?.id_negocio,
        })
        .then(() => {
          toast("Producto agregado a tu inventario", SUCCESS_TOAST);
          onClose();
          return true;
        })
        .catch((err) => {
          console.log(err);
          return null;
        });
      if (res) {
        console.log("Producto agregado");
      } else {
        console.log("Hubo un error data");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="p-24">
        <h1 className="font-bebas-neue uppercase text-4xl font-black flex flex-col leading-none text-green-900">
          Agregar productos
        </h1>
        <p className="text-xl text-gray-900 font-semibold">
          Aquí puedes agregar productos a tu inventario
        </p>

        <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <form onSubmit={handleSubmit(addProduct)}>
                <ModalHeader className="flex flex-col gap-1 mt-4">
                  Añadir {product?.nombre_producto} a tu inventario
                </ModalHeader>
                <ModalBody>
                  <Input
                    label="Cantidad en kg"
                    type="number"
                    {...register("cantidad_producto")}
                    errorMessage={errors?.cantidad_producto}
                  />
                  <Input
                    label="Precio por kg"
                    type="number"
                    {...register("precio_kg")}
                    errorMessage={errors?.precio_kg}
                  />
                  <Input
                    label="Fecha de llegada"
                    type="date"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    {...register("fecha_entrada")}
                    errorMessage={errors?.fecha_entrada}
                  />
                  <Input
                    label="Fecha de duración aproximada en estado fresco"
                    type="date"
                    {...register("fecha_vencimiento")}
                    errorMessage={errors?.fecha_vencimiento}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button type="submit" className="bg-green-600">
                    Agregar
                  </Button>
                </ModalFooter>
              </form>
            )}
          </ModalContent>
        </Modal>

        <div className="flex mt-12">
          <div className="flex flex-col flex-1 justify-center sm:justify-start">
            <h1 className="font-bebas-neue uppercase text-xl font-black flex flex-col leading-none text-green-900">
              Todos los productos registrados
            </h1>
            <div className="flex mt-2 w-2/5">
              <Input
                isClearable
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
          <div className="absolute inset-y-0 right-0 flex items-end pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 flex-col">
            <div className="mt-4 flex justify-center text-gray-900 p-3 text-xs tracking-wide font-semibold">
              <h3 className="text-sm text-gray-900 font-normal">
                Si no encuentras el producto que buscas, puedes agregarlo
              </h3>
              <button className="ml-4">
                <span className="material-symbols-outlined">add_circle</span>
              </button>
            </div>
          </div>
        </div>

        <ul className="mt-8 grid grid-cols-4 gap-4">
          {loading ? (
            <CircularProgress size="lg" aria-label="Loading..." />
          ) : error ? (
            <p>Hubo un error</p>
          ) : (
            results.map((product) => (
              <li key={product.id_producto} className={`p-4 flex`}>
                <ProductCard product={product} route={"add-product"}>
                  <button
                    onClick={() => {
                      setProduct(product);
                      setProductId(product.id_producto);
                      onOpen();
                    }}
                  >
                    <span className="material-symbols-outlined setting-icon">
                      add_circle
                    </span>
                  </button>
                </ProductCard>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};
