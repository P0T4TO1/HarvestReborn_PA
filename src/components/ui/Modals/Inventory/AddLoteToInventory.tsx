"use client";

import {
  Button,
  Input,
  Select,
  SelectItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { productSchema } from "@/validations/products.validation";
import { hrApi } from "@/api";
import { toast } from "sonner";
import { SUCCESS_TOAST } from "@/components";
import { useContext } from "react";
import { AuthContext } from "@/context/auth";
import { IProduct, TipoAlmacenaje } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";

interface IFormData {
  cantidad_producto: number;
  fecha_entrada: Date;
  fecha_vencimiento: Date;
  precio_kg: number;
  tipo_almacenaje: TipoAlmacenaje;
}

interface Props {
  id: number;
  product: IProduct | undefined;
  useDisclosure: { isOpen: boolean; onClose: () => void };
}

export const AddLoteToInventory = ({
  id,
  product,
  useDisclosure: { isOpen, onClose },
}: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: zodResolver(productSchema),
  });
  const { user } = useContext(AuthContext);

  const addProduct: SubmitHandler<IFormData> = async (data) => {
    try {
      const res = await hrApi
        .post(`/negocio/inventory/${id}`, {
          id: id,
          inventory_id: user?.duenonegocio?.negocio.inventario?.id_inventario!,
          ...data,
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
                {...register("cantidad_producto", { valueAsNumber: true })}
                errorMessage={errors?.cantidad_producto?.message}
              />
              <Input
                label="Precio por kg"
                type="number"
                {...register("precio_kg", { valueAsNumber: true })}
                errorMessage={errors?.precio_kg?.message}
              />
              <Input
                label="Fecha de llegada"
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]}
                {...register("fecha_entrada")}
                errorMessage={errors?.fecha_entrada?.message}
              />
              <Input
                label="Fecha de duración aproximada en estado fresco"
                type="date"
                {...register("fecha_vencimiento")}
                errorMessage={errors?.fecha_vencimiento?.message}
              />
              <Select
                label="Tipo de almacenaje"
                {...register("tipo_almacenaje")}
                errorMessage={errors?.tipo_almacenaje?.message}
              >
                <SelectItem
                  key={TipoAlmacenaje.Huacal}
                  value={TipoAlmacenaje.Huacal}
                >
                  Huacal
                </SelectItem>
                <SelectItem
                  key={TipoAlmacenaje.Bolsa}
                  value={TipoAlmacenaje.Bolsa}
                >
                  Bolsa
                </SelectItem>
                <SelectItem
                  key={TipoAlmacenaje.Canasta}
                  value={TipoAlmacenaje.Canasta}
                >
                  Canasta
                </SelectItem>
                <SelectItem
                  key={TipoAlmacenaje.Caja}
                  value={TipoAlmacenaje.Caja}
                >
                  Caja
                </SelectItem>
                <SelectItem
                  key={TipoAlmacenaje.Otro}
                  value={TipoAlmacenaje.Otro}
                >
                  Otro
                </SelectItem>
              </Select>
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
  );
};
