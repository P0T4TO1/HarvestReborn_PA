"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { registerContactDataSchema } from "@/validations/auth.validation";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";
import axios from "axios";
import { DANGER_TOAST, SUCCESS_TOAST } from "@/components/toast";

type Errors = {
  nombreNegocio?: string;
  telefono?: string;
  calle?: string;
  colonia?: string;
  alcaldia?: string;
  cp?: string;
} | null;

interface IFormData {
  nombreNegocio: string;
  telefono: string;
  calle: string;
  colonia: string;
  alcaldia: string;
  cp: string;
}

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

export const ContactDataForm = () => {
  const {
    setContactData,
    userData,
    personalData,
    setIndexActive,
    registerContext,
  } = useContext(AuthContext);
  const { register, handleSubmit } = useForm<IFormData>();
  const [errors, setErrors] = useState<Errors>(null);
  const [postalCode, setPostalCode] = useState("");
  const [alcaldia, setAlcaldia] = useState("");
  const [colonia, setColonia] = useState("");

  const router = useRouter();
  const navigateTo = (path: string) => router.push(path);

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
      data.alcaldia = alcaldia;
      data.colonia = colonia;
      const validations = registerContactDataSchema.safeParse(data);
      if (!validations.success) {
        let newErrors: Errors = {};

        validations.error.issues.forEach((issue) => {
          newErrors = { ...newErrors, [issue.path[0]]: issue.message };
        });
        setErrors(newErrors);
        return null;
      } else {
        setErrors(null);
      }

      setContactData(data);

      const res = await registerContext(
        userData.email,
        userData.password,
        personalData.tipo,
        personalData.nombre,
        personalData.apellidos,
        personalData.fecha_nacimiento,
        data.nombreNegocio,
        data.telefono,
        data.calle,
        data.colonia,
        data.alcaldia,
        data.cp
      );
      if (res.hasError) {
        toast(res.message);
        return;
      } else {
        console.log("[REGISTER_BUSINESS]", res, "Registro exitoso");
        toast("¡Registro exitoso!", SUCCESS_TOAST);
        navigateTo("/auth/login");
        setIndexActive(1);
      }
    } catch (error) {
      toast.error("Error al registrar usuario", DANGER_TOAST);
    }
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 grid-flow-row gap-6">
          <div className="relative">
            <Input
              type="text"
              id="nombreNegocio"
              placeholder={`${
                personalData.tipo === "negocio"
                  ? "Nombre del negocio"
                  : "Nombre del negocio(si aplica)"
              }`}
              {...register("nombreNegocio")}
            />
            {errors?.nombreNegocio && (
              <p className="text-red-700 text-xs">{errors?.nombreNegocio}</p>
            )}
          </div>

          <div className="relative">
            <Input
              type="text"
              id="telefono"
              placeholder="Número de teléfono"
              {...register("telefono")}
            />
            {errors?.telefono && (
              <p className="text-red-700 text-xs">{errors?.telefono}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 grid-flow-row gap-6">
          <div className="relative">
            <Input
              type="text"
              id="cp"
              placeholder="Código postal"
              {...register("cp")}
              onChange={(e) => {
                setPostalCode(e.target.value);
              }}
            />
            {errors?.cp && <p className="text-red-700 text-xs">{errors?.cp}</p>}
          </div>
          <div className="relative">
            <Input
              type="text"
              id="colonia"
              placeholder="Colonia"
              isDisabled
              defaultValue={colonia}
              value={colonia}
              {...register("colonia")}
            />
            {errors?.colonia && (
              <p className="text-red-700 text-xs">{errors?.colonia}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 grid-flow-row gap-6">
          <div className="relative">
            <Input
              type="text"
              id="calle"
              placeholder="Calle y número"
              {...register("calle")}
            />
            {errors?.calle && (
              <p className="text-red-700 text-xs">{errors?.calle}</p>
            )}
          </div>
          <div className="relative">
            <Input
              type="text"
              id="alcaldia"
              placeholder="Alcaldía"
              isDisabled
              defaultValue={alcaldia}
              value={alcaldia}
              {...register("alcaldia")}
            />
            {errors?.alcaldia && (
              <p className="text-red-700 text-xs">{errors?.alcaldia}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center bg-green-800 hover:bg-green-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
        >
          Registrarse
        </button>
        <button
          type="button"
          onClick={() => setIndexActive(2)}
          className="w-full flex justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
        >
          Atrás
        </button>
      </form>
    </>
  );
};
