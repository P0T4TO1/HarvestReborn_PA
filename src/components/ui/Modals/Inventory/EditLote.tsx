"use client";

import {
  Button,
  CircularProgress,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import { hrApi } from "@/api";
import { toast } from "sonner";
import { DANGER_TOAST, SUCCESS_TOAST } from "@/components";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILote } from "@/interfaces";
import { useRouter } from "next/navigation";
import { productSchema } from "@/validations/products.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEdit } from "react-icons/fa";

interface IFormData {
  cantidad_producto: number;
  fecha_entrada: string;
  fecha_vencimiento: string;
  precio_kg: number;
  monto_total: number;
}

interface Props {
  lote: ILote | undefined;
  useDisclosure: { isOpen: boolean; onClose: () => void };
  loading: boolean;
}

export const EditLoteModal = ({
  lote,
  useDisclosure: { isOpen, onClose },
  loading,
}: Props) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      cantidad_producto: lote?.cantidad_producto ?? 0,
      precio_kg: lote?.precio_kg ?? 0,
      fecha_entrada: lote?.fecha_entrada ?? "",
      fecha_vencimiento: lote?.fecha_vencimiento ?? "",
      monto_total: 0,
    },
  });
  const [isEditing, setIsEditing] = useState(false);

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    try {
      await hrApi
        .put(`/negocio/inventory/lote/${lote?.id_lote}`, data)
        .then((res) => {
          if (res.status === 200) {
            toast("Producto actualizado", SUCCESS_TOAST);
            window.location.reload();
            router.refresh();
            onClose();
          } else {
            toast("Hubo un error al actualizar el producto", DANGER_TOAST);
            console.log("Error al actualizar producto", res.data);
          }
        });
    } catch (error) {
      console.log("Error al actualizar producto", error);
      toast("Hubo un error al actualizar el producto", DANGER_TOAST);
    }
  };

  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            {loading ? (
              <ModalBody>
                <div className="flex justify-center items-center">
                  <CircularProgress />
                </div>
              </ModalBody>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col">
                  Editar {lote?.producto?.nombre_producto}
                  <Button
                    type="button"
                    className="mt-2"
                    onClick={() => setIsEditing(!isEditing)}
                    startContent={<FaEdit size={20} />}
                  >
                    Editar
                  </Button>
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-2">
                    <Input
                      label="Cantidad en kg"
                      type="number"
                      {...register("cantidad_producto", { valueAsNumber: true })}
                      defaultValue={lote?.cantidad_producto?.toString()}
                      isDisabled={!isEditing}
                    />
                    {errors?.cantidad_producto && (
                      <span className="text-red-500">
                        {errors?.cantidad_producto?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Input
                      label="Precio por kg"
                      type="number"
                      {...register("precio_kg", { valueAsNumber: true })}
                      defaultValue={lote?.precio_kg?.toString()}
                      isDisabled={!isEditing}
                    />
                    {errors?.precio_kg && (
                      <span className="text-red-500">
                        {errors?.precio_kg?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Input
                      label="Fecha de llegada"
                      type="date"
                      {...register("fecha_entrada")}
                      defaultValue={
                        new Date(lote?.fecha_entrada || "")
                          .toISOString()
                          .split("T")[0]
                      }
                      isDisabled={!isEditing}
                    />
                    {errors?.fecha_entrada && (
                      <span className="text-red-500">
                        {errors?.fecha_entrada?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Input
                      label="Fecha de duración aproximada en estado fresco"
                      type="date"
                      {...register("fecha_vencimiento")}
                      defaultValue={
                        new Date(lote?.fecha_vencimiento || "")
                          .toISOString()
                          .split("T")[0]
                      }
                      isDisabled={!isEditing}
                    />
                    {errors?.fecha_vencimiento && (
                      <span className="text-red-500">
                        {errors?.fecha_vencimiento?.message}
                      </span>
                    )}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button type="submit" className="bg-green-600" isDisabled={!isEditing}>
                    Actualizar
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
