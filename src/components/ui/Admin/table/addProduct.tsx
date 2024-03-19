"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
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
  imagen_producto: string;
  descripcion: string;
  enTemporada: boolean;
  categoria: string;
}

export const AddProd = () => {
  const methods = useForm<IFormData>();
  const { handleSubmit, register } = methods;
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [errors, setErrors] = useState<Errors>(null);

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    try {
      const validations = adminAddProductValidation.safeParse(data);
      if (!validations.success) {
        let newErrors: Errors = {};
        validations.error.errors.forEach((error) => {
          newErrors = { ...newErrors, [error.path[0]]: error.message };
        });
        setErrors(newErrors);
        return;
      }
      const res = await hrApi
        .post("/inventory/products", {
          ...data,
        })
        .then(() => {
          toast("Producto agregado con exito", SUCCESS_TOAST);
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
    } catch (error) {
      console.log(error);
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
                      {...register("nombre_producto")}
                      label="Nombre del producto"
                      errorMessage={errors?.nombre_producto}
                    />
                    <Input
                      {...register("imagen_producto")}
                      label="Imagen del producto"
                      errorMessage={errors?.imagen_producto}
                    />
                    <Input
                      {...register("descripcion")}
                      label="Descripción"
                      errorMessage={errors?.descripcion}
                    />
                    <Input
                      {...register("enTemporada")}
                      label="En temporada"
                      errorMessage={errors?.enTemporada}
                    />
                    <Input
                      {...register("categoria")}
                      label="Categoria"
                      errorMessage={errors?.categoria}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" onPress={onClose}>
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
