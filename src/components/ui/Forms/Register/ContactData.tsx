"use client";

import { useContext, useState } from "react";
import { AuthContext } from "@/context/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { registerContactDataSchema } from "@/validations/auth.validation";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";

type Errors = {
  nombreNegocio?: string;
  telefono?: string;
  calle?: string;
  colonia?: string;
  cp?: string;
} | null;

interface IFormData {
  nombreNegocio: string;
  telefono: string;
  calle: string;
  colonia: string;
  cp: string;
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

  const router = useRouter();
  const navigateTo = (path: string) => router.push(path);

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    try {
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
      console.log(personalData.fecha_nacimiento, "fecha_nacimiento");
      console.log(
        new Date(personalData.fecha_nacimiento)
          .toISOString()
          .slice(0, -5)
          .replace("T", " "),
        "fecha_nacimiento"
      );

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
        data.cp
      );
      if (res.hasError) {
        toast(res.message);
        return;
      } else {
        console.log("[REGISTER_BUSINESS]", res, "Registro exitoso");
        toast("¡Registro exitoso!");
        navigateTo("/auth/login");
        setIndexActive(1);
      }
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
              id="nombreNegocio"
              placeholder={`${personalData.tipo === "negocio" ? "Nombre del negocio" : "Nombre del negocio(si aplica)"}`}
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
        <div className="grid grid-cols-2 grid-flow-row gap-6">
          <div className="relative">
            <Input
              type="text"
              id="colonia"
              placeholder="Colonia"
              {...register("colonia")}
            />
            {errors?.colonia && (
              <p className="text-red-700 text-xs">{errors?.colonia}</p>
            )}
          </div>
          <div className="relative">
            <Input
              type="text"
              id="cp"
              placeholder="Código postal"
              {...register("cp")}
            />
            {errors?.cp && <p className="text-red-700 text-xs">{errors?.cp}</p>}
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
