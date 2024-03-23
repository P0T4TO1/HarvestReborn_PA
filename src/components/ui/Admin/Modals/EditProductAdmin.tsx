"use client";

import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  CircularProgress,
} from "@nextui-org/react";
import React, { useState } from "react";
import { hrApi } from "@/api";
import { toast } from "sonner";
import { DANGER_TOAST, SUCCESS_TOAST } from "@/components";
import { useForm } from "react-hook-form";
import { IProduct } from "@/interfaces";
import { useRouter } from "next/navigation";

type Errors = {
  nombre_producto?: string;
  imagen_producto?: string;
  descripcion?: string;
  enTemporada?: boolean;
  categoria?: string;
} | null;

interface IFormData {
  nombre_producto: string;
  imagen_producto: string;
  file: string;
  descripcion: string;
  enTemporada: boolean;
  categoria: string;
}

interface Props {
  product: IProduct | undefined;
  useDisclosure: { isOpen: boolean; onClose: () => void };
  loading: boolean;
}

export const EditProductAdminModal = ({
  product,
  useDisclosure: { isOpen, onClose },
  loading,
}: Props) => {
  const methods = useForm<IFormData>();
  const { handleSubmit, register } = methods;
  const router = useRouter();

  const [isSelected, setIsSelected] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Errors>(null);
  const [file, setFile] = useState<File | undefined>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setFile(e.target.files?.[0]);
  };

  const onSubmit = async (data: IFormData) => {
    try {
      data = {
        ...product,
        ...data,
      };
      data.categoria = product?.categoria || data.categoria;
      data.descripcion = product?.descripcion || data.descripcion;
      data.enTemporada = isSelected;
      data.nombre_producto = product?.nombre_producto || data.nombre_producto;

      if (!data.nombre_producto) {
        setErrors({
          nombre_producto: "El nombre del producto es requerido",
        });
        return;
      }
      if (!data.descripcion) {
        setErrors({
          descripcion: "La descripción del producto es requerida",
        });
        return;
      }
      if (!data.categoria) {
        setErrors({
          categoria: "La categoría del producto es requerida",
        });
        return;
      }
      if (!data.imagen_producto && !file) {
        setErrors({
          imagen_producto: "La imagen del producto es requerida",
        });
        return;
      }

      const res = await hrApi.put(`/admin/product`, {
        id: product?.id_producto,
        ...product,
        ...data,
      });
      if (res.status === 200) {
        toast("Producto editado correctamente", SUCCESS_TOAST);
        window.location.reload();
        router.refresh();
        onClose();
      }
    } catch (error) {
      console.log("Error al editar producto", error);
      toast("Ocurrió un error al editar el producto", DANGER_TOAST);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            {loading ? (
              <CircularProgress size="lg" aria-label="Loading..." />
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col">
                  Editar {product?.nombre_producto}
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
                  <div className="flex flex-col gap-4">
                    <Input
                      type="text"
                      {...register("nombre_producto")}
                      label="Nombre del producto"
                      isDisabled={!isEditing}
                      errorMessage={errors?.nombre_producto}
                      defaultValue={product?.nombre_producto}
                    />
                    <div>
                      <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="file_input"
                      >
                        Imagen del producto
                      </label>
                      <input
                        type="file"
                        accept="image/png, image/jpg, image/jpeg, image/webp"
                        className="bg-zinc-900 text-zinc-100 p-2 rounded block mb-2"
                        disabled={!isEditing}
                        onChange={handleFileChange}
                      />
                      {errors?.imagen_producto && (
                        <p className="text-red-500 dark:text-red-400 text-sm">
                          {errors?.imagen_producto}
                        </p>
                      )}
                      <p
                        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                        id="file_input_help"
                      >
                        PNG, JPG.
                      </p>
                    </div>
                    <Input
                      type="text"
                      {...register("descripcion")}
                      label="Descripción"
                      isDisabled={!isEditing}
                      errorMessage={errors?.descripcion}
                      defaultValue={product?.descripcion}
                    />
                    <div className="flex flex-col gap-2">
                      <p className="text-default-500">
                        En temporada {product?.enTemporada}
                      </p>
                      <Checkbox
                        isSelected={isSelected}
                        isDisabled={!isEditing}
                        onValueChange={setIsSelected}
                      >
                        {isSelected ? "Si" : "No"}
                      </Checkbox>
                      {errors?.enTemporada && (
                        <p className="text-red-500 dark:text-red-400 text-sm">
                          {errors?.enTemporada}
                        </p>
                      )}
                    </div>
                    <Select
                      isDisabled={!isEditing}
                      {...register("categoria")}
                      label="Categoria"
                      errorMessage={errors?.categoria}
                      defaultSelectedKeys={[product?.categoria || "VERDURA"]}
                    >
                      <SelectItem key="VERDURA" value="VERDURA">
                        Verdura
                      </SelectItem>
                      <SelectItem key="FRUTA" value="FRUTA">
                        Fruta
                      </SelectItem>
                    </Select>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" type="submit">
                    Editar
                  </Button>
                </ModalFooter>
              </form>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
