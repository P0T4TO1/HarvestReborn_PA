"use client";

import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hrApi } from "@/api";
import { ILote } from "@/interfaces";
import { AuthContext } from "@/context/auth";
import { DANGER_TOAST, ProductCard, SUCCESS_TOAST } from "@/components";
import {
  Select,
  SelectItem,
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
import { toast } from "sonner";
import { useForm } from "react-hook-form";

type Errors = {
  cantidad_producto?: number;
  fecha_entrada?: string;
  fecha_vencimiento?: string;
  precio_kg?: number;
} | null;

interface IFormData {
  cantidad_producto: number;
  fecha_entrada: Date;
  fecha_vencimiento: Date;
  precio_kg: number;
  monto_total: number;
}

export const ProductsList = () => {
  const router = useRouter();
  const navigateTo = (path: string) => {
    router.push(path);
  };
  const { user } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [lotes, setLotes] = useState<ILote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState<Errors>(null);
  const [search, setSearch] = useState("");
  const [lote, setLote] = useState<ILote>();
  const [isEditing, setIsEditing] = useState(false);

  const methods = useForm<IFormData>();
  const { handleSubmit, register } = methods;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const results = !search
    ? lotes
    : lotes.filter((dato) =>
        dato.producto?.nombre_producto
          .toLowerCase()
          .includes(search.toLocaleLowerCase())
      );

  useEffect(() => {
    if (!user?.negocio?.id_negocio) {
      return;
    }
    hrApi.get(`/inventory/${user?.negocio?.id_negocio}`).then((res) => {
      if (res.status === 200) {
        setLotes(res.data);
      } else {
        setError(true);
        console.log("Error al obtener productos", res.data);
      }
      setLoading(false);
    });
  }, [user?.negocio?.id_negocio]);

  const getLote = async (id: number) => {
    await hrApi.get(`/inventory/lote/${id}`).then((res) => {
      if (res.status === 200) {
        setLote(res.data);
      } else {
        setError(true);
        console.log("Error al obtener producto", res.data);
      }
      setLoading(false);
    });
  };

  const onSubmit = async (data: IFormData) => {
    console.log(data, lote);
    await hrApi
      .put(`/inventory/lote/${lote?.id_lote}`, {
        ...lote,
        ...data,
      })
      .then((res) => {
        if (res.status === 200) {
          toast("Producto actualizado", SUCCESS_TOAST);
          window.location.reload();
          onClose();
        } else {
          toast("Hubo un error al actualizar el producto", DANGER_TOAST);
          console.log("Error al actualizar producto", res.data);
        }
      });
  };

  const handleDelete = async (id: number) => {
    await hrApi.delete(`/inventory/${id}`).then((res) => {
      if (res.status === 200) {
        setLotes(lotes.filter((lote) => lote.id_producto !== id));
        window.location.reload();
      } else {
        toast("Hubo un error al borrar el producto", DANGER_TOAST);
        console.log("Error al borrar producto", res.data);
      }
    });
  };

  return (
    <div className="p-24">
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              {loading ? (
                <CircularProgress size="lg" aria-label="Loading..." />
              ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalHeader className="flex flex-col">
                    Editar {lote?.producto?.nombre_producto}
                    <Button
                      type="button"
                      className="mt-2"
                      onClick={() => setIsEditing(!isEditing)}
                      startContent={
                        <span className="material-symbols-outlined">
                          edit_square
                        </span>
                      }
                    >
                      Editar
                    </Button>
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      label="Cantidad en kg"
                      type="number"
                      {...register("cantidad_producto")}
                      errorMessage={errors?.cantidad_producto}
                      defaultValue={lote?.cantidad_producto?.toString()}
                      isDisabled={!isEditing}
                    />
                    <Input
                      label="Precio por kg"
                      type="number"
                      {...register("precio_kg")}
                      errorMessage={errors?.precio_kg}
                      defaultValue={lote?.precio_kg?.toString()}
                      isDisabled={!isEditing}
                    />
                    <Input
                      label="Fecha de llegada"
                      type="date"
                      {...register("fecha_entrada")}
                      errorMessage={errors?.fecha_entrada}
                      defaultValue={
                        new Date(lote?.fecha_vencimiento || "")
                          .toISOString()
                          .split("T")[0]
                      }
                      isDisabled={!isEditing}
                    />
                    <Input
                      label="Fecha de duración aproximada en estado fresco"
                      type="date"
                      {...register("fecha_vencimiento")}
                      errorMessage={errors?.fecha_vencimiento}
                      defaultValue={
                        new Date(lote?.fecha_vencimiento || "")
                          .toISOString()
                          .split("T")[0]
                      }
                      isDisabled={!isEditing}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cerrar
                    </Button>
                    <Button type="submit" className="bg-green-600">
                      Actualizar
                    </Button>
                  </ModalFooter>
                </form>
              )}
            </>
          )}
        </ModalContent>
      </Modal>

      <h1 className="font-bebas-neue uppercase text-4xl font-black flex flex-col leading-none text-green-900">
        Tú inventario
        <span className="text-xl text-gray-900 font-semibold">
          Aquí puedes ver todos tus productos
        </span>
      </h1>
      <button
        onClick={() => navigateTo("/inventory/add-product")}
        className="mt-4 ml-2 flex justify-center bg-green-800 hover:bg-green-700 text-gray-100 p-3 text-sm rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
      >
        <span className="material-symbols-outlined">add_circle</span>
        <span className="ml-2">Agregar productos</span>
      </button>

      <div className="flex">
        <div className="flex flex-1 justify-center sm:justify-start">
          <div className="mt-4 p-2">
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
          <Select
            placeholder="Filtrar por"
            className="w-60"
            onChange={(e) => console.log(e)}
          >
            <SelectItem value="0" key="0">
              -- --
            </SelectItem>
            <SelectItem value="1" key="1">
              Nombre
            </SelectItem>
            <SelectItem value="2" key="2">
              Fecha de entrada
            </SelectItem>
            <SelectItem value="3" key="3">
              Fecha de vencimiento
            </SelectItem>
            <SelectItem value="4" key="4">
              Cantidad
            </SelectItem>
          </Select>
        </div>
      </div>

      <ul className="mt-8 grid grid-cols-4">
        {loading ? (
          <CircularProgress size="lg" aria-label="Loading..." />
        ) : error ? (
          <p>Hubo un error</p>
        ) : (
          results.map((lote) => (
            <li key={lote.id_producto} className="p-2 flex">
              <ProductCard lote={lote} route={"product-list"}>
                <button
                  className="edit-btn setting-modal-btn"
                  onClick={() => {
                    getLote(lote.id_lote).then(() => {});
                    setLoading(true);
                    onOpen();
                  }}
                >
                  Editar producto
                </button>
                <button
                  className="delete-btn setting-modal-btn"
                  onClick={() => handleDelete(lote.id_lote)}
                >
                  Borrar producto
                </button>
              </ProductCard>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
