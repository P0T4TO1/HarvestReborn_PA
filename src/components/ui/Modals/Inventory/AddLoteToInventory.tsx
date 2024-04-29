"use client";

import { useContext, useState } from "react";
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
  DatePicker,
} from "@nextui-org/react";
import {
  today,
  getLocalTimeZone,
} from "@internationalized/date";
import { useDateFormatter, I18nProvider } from "@react-aria/i18n";

import { SubmitHandler, useForm } from "react-hook-form";
import { productSchema } from "@/validations/products.validation";
import { zodResolver } from "@hookform/resolvers/zod";

import { hrApi } from "@/api";

import { toast } from "sonner";
import { SUCCESS_TOAST } from "@/components";

import { AuthContext } from "@/context/auth";
import { IProduct, TipoAlmacenaje } from "@/interfaces";

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
    watch,
    setValue,
    reset,
  } = useForm<IFormData>({
    resolver: zodResolver(productSchema),
  });
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [valueFechaEntrada, setValueFechaEntrada] = useState(
    today(getLocalTimeZone())
  );
  const [valueFechaVencimiento, setValueFechaVencimiento] = useState(
    today(getLocalTimeZone())
  );

  let formatter = useDateFormatter({ dateStyle: "full" });
  console.log(today(getLocalTimeZone()));

  const addProduct: SubmitHandler<IFormData> = async (data) => {
    setIsLoading(true);
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
          setIsLoading(false);
          reset();
          return true;
        })
        .catch((err) => {
          setIsLoading(false);
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
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
    >
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
              <div>
                <I18nProvider locale="es-MX">
                  <DatePicker
                    label="Fecha de llegada"
                    showMonthAndYearPickers
                    minValue={today(getLocalTimeZone())}
                    defaultValue={today(getLocalTimeZone())}
                    value={valueFechaEntrada}
                    onChange={(date) => {
                      setValueFechaEntrada(date);
                      setValue(
                        "fecha_entrada",
                        date.toDate(getLocalTimeZone())
                      );
                    }}
                  />
                </I18nProvider>
                {errors?.fecha_entrada && (
                  <span className="text-red-500 text-sm">
                    {errors?.fecha_entrada?.message}
                  </span>
                )}
              </div>
              <div>
                <I18nProvider locale="es-MX">
                  <DatePicker
                    label="Fecha de duración aproximada en estado fresco"
                    showMonthAndYearPickers
                    minValue={today(getLocalTimeZone())}
                    value={valueFechaVencimiento}
                    onChange={(date) => {
                      setValueFechaVencimiento(date);
                      setValue(
                        "fecha_vencimiento",
                        date.toDate(getLocalTimeZone())
                      );
                    }}
                  />
                </I18nProvider>
                {errors?.fecha_vencimiento && (
                  <span className="text-red-500 text-sm">
                    {errors?.fecha_vencimiento?.message}
                  </span>
                )}
              </div>
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
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  onClose();
                  reset();
                }}
                isLoading={isLoading}
              >
                Cerrar
              </Button>
              <Button
                type="submit"
                onPress={() => {
                  setValue(
                    "fecha_entrada",
                    new Date(
                      formatter.format(
                        valueFechaEntrada.toDate(getLocalTimeZone())
                      )
                    )
                  );
                  setValue(
                    "fecha_vencimiento",
                    new Date(
                      formatter.format(
                        valueFechaVencimiento.toDate(getLocalTimeZone())
                      )
                    )
                  );
                }}
                className="bg-green-600"
                isLoading={isLoading}
              >
                Agregar
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};
