"use client";

import {
  Button,
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
import React, { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { adminAddUserValidation } from "@/validations/admin.validation";
import { hrApi } from "@/api";
import { toast } from "sonner";
import { DANGER_TOAST, SUCCESS_TOAST } from "@/components";
import axios from "axios";

type Errors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  nombre?: string;
  apellidos?: string;
  fecha_nacimiento?: string;
  dia_nacimiento?: string;
  mes_nacimiento?: string;
  year_nacimiento?: string;
  tipo?: string;
  nombre_negocio?: string;
  telefono?: string;
  calle?: string;
  colonia?: string;
  alcaldia?: string;
  cp?: string;
} | null;

interface IResponse {
  c_cve_ciudad: string;
  d_codigo: string;
  d_asenta: string;
  d_tipo_asenta: string;
  D_mnpio: string;
  d_estado: string;
  d_ciudad: string;
  d_CP: string;
  c_estado: string;
  c_oficina: string;
  c_CP: string;
  c_tipo_asenta: string;
  c_mnpio: string;
  id_asenta_cpcons: string;
  d_zona: string;
}

interface IFormData {
  email: string;
  password: string;
  confirmPassword: string;
  nombre: string;
  apellidos: string;
  fecha_nacimiento: string;
  dia_nacimiento: string;
  mes_nacimiento: string;
  year_nacimiento: string;
  tipo: string;
  nombre_negocio: string;
  telefono: string;
  calle: string;
  colonia: string;
  alcaldia: string;
  cp: string;
}

const months = {
  "01": "Enero",
  "02": "Febrero",
  "03": "Marzo",
  "04": "Abril",
  "05": "Mayo",
  "06": "Junio",
  "07": "Julio",
  "08": "Agosto",
  "09": "Septiembre",
  "10": "Octubre",
  "11": "Noviembre",
  "12": "Diciembre",
};

export const AddUser = () => {
  const methods = useForm<IFormData>();
  const { handleSubmit, register } = methods;
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>(null);
  const [indexActive, setIndexActive] = useState(0);
  const [fecNac, setFecNac] = useState<{
    day: string;
    month: string;
    year: string;
  }>({
    day: "",
    month: "",
    year: "",
  });
  const [postalCode, setPostalCode] = useState("");
  const [alcaldia, setAlcaldia] = useState("");
  const [colonia, setColonia] = useState("");
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleConfirm, setVisibleConfirm] = useState<boolean>(false);

  useEffect(() => {
    if (postalCode.length === 5) {
      axios.get("/CP_CDMX.json").then((direction) => {
        if (direction) {
          if (
            direction.data.some(
              (item: IResponse) => item.d_codigo === postalCode
            )
          ) {
            setErrors({ cp: " " });
          } else {
            setErrors({ cp: "Código postal no encontrado" });
            return;
          }
          direction.data.map((item: IResponse) => {
            if (item.d_codigo !== postalCode) {
              return;
            } else {
              const coloniaString = item.d_asenta;
              const municipioString = item.D_mnpio;
              setErrors({ cp: " " });
              setColonia(coloniaString);
              setAlcaldia(municipioString);
            }
          });
        } else {
          return;
        }
      });
    }
  }, [postalCode]);

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    try {
      const validations = adminAddUserValidation.safeParse(data);
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
        .post("/admin/users", data)
        .then(() => {
          toast("Producto agregado con éxito", SUCCESS_TOAST);
          onClose();
          window.location.reload();
          return true;
        })
        .catch((err) => {
          toast("Hubo un error", DANGER_TOAST);
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
          <span className="material-symbols-outlined">person_add</span>
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col gap-1">
                  Agregar usuario
                </ModalHeader>
                <ModalBody>
                  {loading ? (
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                  ) : indexActive === 0 ? (
                    <>
                      <Input
                        label="Email"
                        variant="bordered"
                        errorMessage={errors?.email}
                        {...register("email")}
                        defaultValue={""}
                      />
                      <Input
                        label="Contraseña"
                        type={`${visible ? "text" : "password"}`}
                        variant="bordered"
                        errorMessage={errors?.password}
                        {...register("password")}
                        defaultValue={""}
                        endContent={
                          <button
                            onClick={() => setVisible(!visible)}
                            type="button"
                            className="flex items-center absolute inset-y-0 right-0 mr-3 cursor-pointer text-sm leading-5 text-green-700"
                          >
                            {visible ? (
                              <span className="material-symbols-outlined">
                                visibility_off
                              </span>
                            ) : (
                              <span className="material-symbols-outlined">
                                visibility
                              </span>
                            )}
                          </button>
                        }
                      />
                      <Input
                        label="Confirmar contraseña"
                        type={`${visibleConfirm ? "text" : "password"}`}
                        variant="bordered"
                        errorMessage={errors?.confirmPassword}
                        {...register("confirmPassword")}
                        defaultValue={""}
                        endContent={
                          <button
                            onClick={() => setVisibleConfirm(!visibleConfirm)}
                            type="button"
                            className="flex items-center absolute inset-y-0 right-0 mr-3 cursor-pointer text-sm leading-5 text-green-700"
                          >
                            {visibleConfirm ? (
                              <span className="material-symbols-outlined">
                                visibility_off
                              </span>
                            ) : (
                              <span className="material-symbols-outlined">
                                visibility
                              </span>
                            )}
                          </button>
                        }
                      />
                    </>
                  ) : indexActive === 1 ? (
                    <>
                      <Input
                        label="Nombre(s)"
                        variant="bordered"
                        errorMessage={errors?.nombre}
                        {...register("nombre")}
                        defaultValue={" "}
                      />
                      <Input
                        label="Apellidos"
                        variant="bordered"
                        errorMessage={errors?.apellidos}
                        {...register("apellidos")}
                        defaultValue={" "}
                      />
                      <Input
                        radius="sm"
                        id="dia_nacimiento"
                        variant="bordered"
                        type="text"
                        label="Día"
                        defaultValue={" "}
                        onChange={(e) => {
                          setFecNac({ ...fecNac, day: e.target.value });
                        }}
                        errorMessage={errors?.dia_nacimiento}
                      />
                      <Select
                        isRequired
                        radius="sm"
                        id="mes_nacimiento"
                        label="Mes"
                        variant="bordered"
                        onChange={(e) => {
                          setFecNac({ ...fecNac, month: e.target.value });
                        }}
                        errorMessage={errors?.mes_nacimiento}
                      >
                        {Object.entries(months).map(([key, value]) => (
                          <SelectItem value={key} key={key}>
                            {value}
                          </SelectItem>
                        ))}
                      </Select>
                      <Input
                        radius="sm"
                        id="año_nacimiento"
                        type="text"
                        label="Año"
                        variant="bordered"
                        defaultValue={""}
                        onChange={(e) => {
                          setFecNac({ ...fecNac, year: e.target.value });
                        }}
                        errorMessage={errors?.year_nacimiento}
                      />
                      <Select
                        isRequired
                        radius="sm"
                        label="Tipo de usuario"
                        id="tipo"
                        variant="bordered"
                        {...register("tipo")}
                        errorMessage={errors?.tipo}
                      >
                        <SelectItem value="negocio" key="negocio">
                          Negocio local
                        </SelectItem>
                        <SelectItem value="cliente" key="cliente">
                          Cliente
                        </SelectItem>
                      </Select>
                    </>
                  ) : (
                    <>
                      <Input
                        type="text"
                        id="nombreNegocio"
                        label="Nombre del negocio"
                        variant="bordered"
                        defaultValue={""}
                        {...register("nombre_negocio")}
                        errorMessage={errors?.nombre_negocio}
                      />
                      <Input
                        type="text"
                        id="telefono"
                        label="Número de teléfono"
                        variant="bordered"
                        defaultValue={""}
                        {...register("telefono")}
                      />
                      <Input
                        type="text"
                        id="cp"
                        label="Código postal"
                        variant="bordered"
                        defaultValue={""}
                        {...register("cp")}
                        onChange={(e) => {
                          setPostalCode(e.target.value);
                        }}
                      />
                      <Input
                        type="text"
                        id="colonia"
                        label="Colonia"
                        variant="bordered"
                        isDisabled
                        defaultValue={colonia}
                        value={colonia}
                        {...register("colonia")}
                      />
                      <Input
                        type="text"
                        id="calle"
                        variant="bordered"
                        label="Calle y número"
                        {...register("calle")}
                      />
                      <Input
                        type="text"
                        id="alcaldia"
                        label="Alcaldía"
                        variant="bordered"
                        isDisabled
                        defaultValue={alcaldia}
                        value={alcaldia}
                        {...register("alcaldia")}
                      />
                    </>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Cerrar
                  </Button>
                  <Button
                    color="warning"
                    type="button"
                    onPress={() => setIndexActive(indexActive - 1)}
                    className={`${indexActive === 0 ? "hidden" : ""}`}
                  >
                    Regresar
                  </Button>
                  <Button
                    color="primary"
                    type={`${indexActive === 2 ? "submit" : "button"}`}
                    onPress={() => setIndexActive(indexActive + 1)}
                  >
                    {indexActive === 2 ? "Agregar" : "Siguiente"}
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
