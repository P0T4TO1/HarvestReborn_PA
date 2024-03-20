"use client";

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { adminAddUserValidation } from "@/validations/admin.validation";
import { hrApi } from "@/api";
import { toast } from "sonner";
import { DANGER_TOAST, SUCCESS_TOAST } from "@/components";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { searchUserByEmail } from "@/hooks";

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

export const AddUserForm = () => {
  const methods = useForm<IFormData>();
  const { handleSubmit, register } = methods;

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>(null);
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
  const [tipo, setTipo] = useState<string>("");

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
      data.tipo = tipo;
      data.fecha_nacimiento = `${fecNac.year}-${fecNac.month}-${fecNac.day}`;
      data.dia_nacimiento = fecNac.day;
      data.mes_nacimiento = fecNac.month;
      data.year_nacimiento = fecNac.year;
      data.alcaldia = alcaldia;
      data.colonia = colonia;
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

      const userExists = await searchUserByEmail(data.email);

      if (userExists.message === "Este correo ya esta registrado") {
        setErrors({ email: "El correo ya esta registrado" });
        return null;
      }

      console.log(data);
      const res = await hrApi
        .post("/admin/users", data)
        .then(() => {
          toast("Usuario agregado con éxito", SUCCESS_TOAST);
          router.push("/admin/dashboard/users");
          return true;
        })
        .catch((err) => {
          toast("Hubo un error", DANGER_TOAST);
          console.log(err);
          return null;
        });
      if (res) {
        console.log("Usuario agregado");
      } else {
        console.log("Hubo un error data");
      }
    } catch (error) {
      console.log(error);
      console.log("Hubo un error");
    }
  };

  return (
    <div className="my-10 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex">
        <li className="flex gap-2">
          <span className="material-symbols-outlined">home</span>
          <Link href={"/admin/dashboard"}>
            <span>Home</span>
          </Link>
          <span> / </span>{" "}
        </li>

        <li className="flex gap-2">
          <span className="material-symbols-outlined">group</span>
          <Link href={"/admin/dashboard/users"}>
            <span>Usuarios</span>
          </Link>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span className="material-symbols-outlined">person_add</span>
          <span>Agregar</span>
          <span> / </span>{" "}
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Agregar usuario nuevo</h3>
      <div className="max-w-[95rem] mx-auto w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-3 gap-4"
        >
          <div>
            <Input label="Email" variant="bordered" {...register("email")} />
            {errors?.email && (
              <p className="text-red-700 text-xs">{errors?.email}</p>
            )}
          </div>
          <div className="relative">
            <Input
              label="Contraseña"
              type={`${visible ? "text" : "password"}`}
              variant="bordered"
              {...register("password")}
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
            {errors?.password && (
              <p className="text-red-700 text-xs">{errors?.password}</p>
            )}
          </div>
          <div className="relative">
            <Input
              label="Confirmar contraseña"
              type={`${visibleConfirm ? "text" : "password"}`}
              variant="bordered"
              {...register("confirmPassword")}
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
            {errors?.confirmPassword && (
              <p className="text-red-700 text-xs">{errors?.confirmPassword}</p>
            )}
          </div>
          <div>
            <Input
              label="Nombre(s)"
              variant="bordered"
              {...register("nombre")}
            />
            {errors?.nombre && (
              <p className="text-red-700 text-xs">{errors?.nombre}</p>
            )}
          </div>
          <div>
            <Input
              label="Apellidos"
              variant="bordered"
              {...register("apellidos")}
            />
            {errors?.apellidos && (
              <p className="text-red-700 text-xs">{errors?.apellidos}</p>
            )}
          </div>
          <div>
            <Input
              radius="sm"
              id="dia_nacimiento"
              variant="bordered"
              type="text"
              label="Día"
              onChange={(e) => {
                setFecNac({ ...fecNac, day: e.target.value });
              }}
            />
            {errors?.dia_nacimiento && (
              <p className="text-red-700 text-xs">{errors?.dia_nacimiento}</p>
            )}
          </div>
          <div>
            <Select
              isRequired
              radius="sm"
              id="mes_nacimiento"
              label="Mes"
              variant="bordered"
              onChange={(e) => {
                setFecNac({ ...fecNac, month: e.target.value });
              }}
            >
              {Object.entries(months).map(([key, value]) => (
                <SelectItem value={key} key={key}>
                  {value}
                </SelectItem>
              ))}
            </Select>
            {errors?.mes_nacimiento && (
              <p className="text-red-700 text-xs">{errors?.mes_nacimiento}</p>
            )}
          </div>
          <div>
            <Input
              radius="sm"
              id="año_nacimiento"
              type="text"
              label="Año"
              variant="bordered"
              onChange={(e) => {
                setFecNac({ ...fecNac, year: e.target.value });
              }}
            />
            {errors?.year_nacimiento && (
              <p className="text-red-700 text-xs">{errors?.year_nacimiento}</p>
            )}
          </div>
          <div>
            <Select
              isRequired
              radius="sm"
              label="Tipo de usuario"
              id="tipo"
              variant="bordered"
              onChange={(e) => {
                setTipo(e.target.value);
              }}
            >
              <SelectItem value="admin" key="admin">
                Administrador
              </SelectItem>
              <SelectItem value="negocio" key="negocio">
                Negocio local
              </SelectItem>
              <SelectItem value="cliente" key="cliente">
                Cliente
              </SelectItem>
            </Select>
            {errors?.tipo && (
              <p className="text-red-700 text-xs">{errors?.tipo}</p>
            )}
          </div>
          <div>
            <Input
              type="text"
              id="nombreNegocio"
              label="Nombre del negocio"
              variant="bordered"
              isRequired={tipo === "negocio"}
              {...register("nombre_negocio")}
            />
            {errors?.nombre_negocio && (
              <p className="text-red-700 text-xs">{errors?.nombre_negocio}</p>
            )}
          </div>
          <div>
            <Input
              type="text"
              id="telefono"
              label="Número de teléfono"
              variant="bordered"
              {...register("telefono")}
            />
            {errors?.telefono && (
              <p className="text-red-700 text-xs">{errors?.telefono}</p>
            )}
          </div>
          <div>
            <Input
              type="text"
              id="cp"
              label="Código postal"
              variant="bordered"
              {...register("cp")}
              onChange={(e) => {
                setPostalCode(e.target.value);
              }}
            />
            {errors?.cp && <p className="text-red-700 text-xs">{errors?.cp}</p>}
          </div>
          <div>
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
            {errors?.colonia && (
              <p className="text-red-700 text-xs">{errors?.colonia}</p>
            )}
          </div>
          <div>
            <Input
              type="text"
              id="calle"
              variant="bordered"
              label="Calle y número"
              {...register("calle")}
            />
            {errors?.calle && (
              <p className="text-red-700 text-xs">{errors?.calle}</p>
            )}
          </div>
          <div>
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
            {errors?.alcaldia && (
              <p className="text-red-700 text-xs">{errors?.alcaldia}</p>
            )}
          </div>
          <div>
            <Button color="primary" type="submit">
              Agregar usuario
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
