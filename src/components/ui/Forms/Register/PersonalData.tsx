"use client";

import { useContext, useState } from "react";
import { AuthContext } from "@/context/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { registerPersonalDataSchema } from "@/validations/auth.validation";
import { Select, SelectItem } from "@nextui-org/react";
import { Input } from "@nextui-org/input";

type Errors = {
  nombre?: string;
  apellidos?: string;
  fecha_nacimiento?: string;
  dia_nacimiento?: string;
  mes_nacimiento?: string;
  year_nacimiento?: string;
  tipo?: string;
} | null;

interface IFormData {
  nombre: string;
  apellidos: string;
  dia_nacimiento?: string;
  mes_nacimiento?: string;
  year_nacimiento?: string;
  fecha_nacimiento: string;
  tipo: string;
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

export const PersonalDataForm = () => {
  const { setPersonalData, setIndexActive } = useContext(AuthContext);
  const { register, handleSubmit } = useForm<IFormData>();
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

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    try {
      data.fecha_nacimiento = `${fecNac.year}-${fecNac.month}-${fecNac.day}`;
      data.dia_nacimiento = fecNac.day;
      data.mes_nacimiento = fecNac.month;
      data.year_nacimiento = fecNac.year;
      const validations = registerPersonalDataSchema.safeParse(data);
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
      setPersonalData(data);
      setIndexActive(3);
    } catch (error) {
      toast.error("Error al registrar usuario");
    }
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 grid-flow-row gap-6">
          <div className="relative">
            <Input
              type="text"
              id="nombre"
              placeholder="Nombre(s)"
              {...register("nombre")}
            />
            {errors?.nombre && (
              <p className="text-red-700 text-xs">{errors?.nombre}</p>
            )}
          </div>

          <div className="relative">
            <Input
              type="text"
              id="apellidos"
              placeholder="Apellidos"
              {...register("apellidos")}
            />
            {errors?.apellidos && (
              <p className="text-red-700 text-xs">{errors?.apellidos}</p>
            )}
          </div>
        </div>

        <div>
          <div className="relative">
            <p className="ml-2 mb-2 text-sm text-gray-600 font-medium">
              Fecha de nacimiento
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="relative">
              <Input
                radius="sm"
                id="dia_nacimiento"
                type="text"
                placeholder="Día"
                onChange={(e) => {
                  setFecNac({ ...fecNac, day: e.target.value });
                }}
              />
              {errors?.dia_nacimiento && (
                <p className="text-red-700 text-xs">{errors?.dia_nacimiento}</p>
              )}
            </div>
            <div className="relative">
              <Select
                radius="sm"
                id="mes_nacimiento"
                placeholder="Mes"
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
            <div className="relative">
              <Input
                radius="sm"
                id="año_nacimiento"
                type="text"
                placeholder="Año"
                onChange={(e) => {
                  setFecNac({ ...fecNac, year: e.target.value });
                }}
              />
              {errors?.year_nacimiento && (
                <p className="text-red-700 text-xs">
                  {errors?.year_nacimiento}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="relative">
          <Select
            isRequired
            radius="sm"
            placeholder="Tipo de usuario"
            id="tipo"
            {...register("tipo")}
          >
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

        <button
          type="submit"
          className="w-full flex justify-center bg-green-800 hover:bg-green-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
        >
          Siguiente
        </button>
        <button
          type="button"
          onClick={() => setIndexActive(1)}
          className="w-full flex justify-center bg-gray-800 hover:bg-gray-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
        >
          Regresar
        </button>
      </form>
    </>
  );
};
