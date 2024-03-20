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
import { SUCCESS_TOAST } from "@/components";

type Errors = {
  nombre_producto?: string;
  imagen_producto?: string;
  descripcion?: string;
  enTemporada?: boolean;
  categoria?: string;
} | null;

interface IFormData {
  nombre_producto: string;
  imagen_producto: FileList;
  file: string;
  descripcion: string;
  enTemporada: boolean;
  categoria: string;
}

export const AddProd = () => {
  const methods = useForm<IFormData>();
  const { handleSubmit, register } = methods;
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [isSelected, setIsSelected] = useState(false);
  const [errors, setErrors] = useState<Errors>(null);
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [file, setFile] = useState<File>();

  const onChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ?? [];
    if (!files.length) return;

    const file = files[0];
    const maxSizeInBytes = 2 * 1024 * 1024;
    if (!file) return;

    if (file.size > maxSizeInBytes) return toast(`Maximum Size Image 2MB`);
    setFileList(files as FileList);
    setFile(file);
  };

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    try {
      data.enTemporada = isSelected;
      data.imagen_producto = fileList!;
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
      data.file = "/images/products/brocoli.png";
      console.log(data);

      const res = await hrApi
        .post("/admin/product", data)
        .then(() => {
          toast("Producto agregado con éxito", SUCCESS_TOAST);
          onClose();
          window.location.reload();
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
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-100 text-black-100 disabled:text-gray-300 placeholder:text-black-200"
                        onChange={onChangeImage}
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
                        SVG, PNG, JPG.
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
                        isRequired
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
