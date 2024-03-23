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
  useDisclosure,
} from "@nextui-org/react";
import React, { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { adminAddProductValidation } from "@/validations/admin.validation";
import { hrApi } from "@/api";
import { toast } from "sonner";
import { DANGER_TOAST, SUCCESS_TOAST } from "@/components";
import { useRouter } from "next/navigation";
import { searchProductByName } from "@/hooks";

type Errors = {
  nombre_producto?: string;
  imagen_producto?: string;
  descripcion?: string;
  enTemporada?: boolean;
  categoria?: string;
} | null;

interface IFormData {
  nombre_producto: string;
  imagen_producto: File;
  file: string;
  descripcion: string;
  enTemporada: boolean;
  categoria: string;
}

export const AddProductAdminModal = () => {
  const router = useRouter();
  const methods = useForm<IFormData>();
  const { handleSubmit, register } = methods;
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [isSelected, setIsSelected] = useState(false);
  const [errors, setErrors] = useState<Errors>(null);
  const [file, setFile] = useState<File | undefined>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setFile(e.target.files?.[0]);
  };

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    try {
      if (!data.nombre_producto) {
        setErrors({
          ...errors,
          nombre_producto: "El nombre del producto es obligatorio",
        });
        return;
      }

      const productExists = await searchProductByName(data.nombre_producto);
      if (productExists.message === "Este producto ya esta registrado") {
        setErrors({
          ...errors,
          nombre_producto: "Este producto ya esta registrado",
        });
        return null;
      }

      if (!file) {
        setErrors({
          ...errors,
          imagen_producto: "La imagen del producto es obligatoria",
        });
        return;
      }
      const dataImage = new FormData();
      dataImage.set("file", file);

      await hrApi.post("/admin/upload", dataImage).then((res) => {
        if (res.status === 200) {
          console.log("File uploaded successfully");
          data.imagen_producto = file;
          data.file = res.data.secure_url;
        } else {
          console.log("Hubo un error al subir la imagen");
          return null;
        }
      });

      data.enTemporada = isSelected;

      const validations = adminAddProductValidation.safeParse(data);
      if (!validations.success) {
        let newErrors: Errors = {};
        validations.error.errors.forEach((error) => {
          newErrors = { ...newErrors, [error.path[0]]: error.message };
        });
        setErrors(newErrors);
        console.log(errors);
        return;
      }

      const res = await hrApi
        .post("/admin/product", data)
        .then(() => {
          toast("Producto agregado con éxito", SUCCESS_TOAST);
          onClose();
          window.location.reload();
          router.refresh();
          return true;
        })
        .catch((err) => {
          toast("Hubo un error al agregar el producto", DANGER_TOAST);
          console.log(err);
          return null;
        });
      if (res) {
        console.log("Producto agregado");
      } else {
        console.log("Hubo un error data");
      }
    } catch (error) {
      console.log(error);
      console.log("Hubo un error");
    }
  };

  return (
    <div>
      <>
        <Button onPress={onOpen} color="primary" isIconOnly variant="faded">
          <span className="material-symbols-outlined">add</span>
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col gap-1">
                  Agregar producto
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-4">
                    <Input
                      type="text"
                      {...register("nombre_producto")}
                      label="Nombre del producto"
                      errorMessage={errors?.nombre_producto}
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
                      errorMessage={errors?.descripcion}
                    />
                    <div className="flex flex-col gap-2">
                      <p className="text-default-500">En temporada</p>
                      <Checkbox
                        isSelected={isSelected}
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
                      {...register("categoria")}
                      label="Categoria"
                      errorMessage={errors?.categoria}
                    >
                      <SelectItem key="verdura" value="VERDURA">
                        Verdura
                      </SelectItem>
                      <SelectItem key="fruta" value="FRUTA">
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
                    Agregar
                  </Button>
                </ModalFooter>
              </form>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
