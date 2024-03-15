"use client";

import { useContext, useState } from "react";
import { AuthContext } from "@/context/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { registerUserDataSchema } from "@/validations/auth.validation";
import { searchUserByEmail } from "@/hooks";
import { Input } from "@nextui-org/input";

type Errors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
} | null;

interface IFormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

export const UserDataForm = () => {
  const { setUserData, setIndexActive, indexActive } = useContext(AuthContext);
  const { register, handleSubmit } = useForm<IFormData>();
  const [errors, setErrors] = useState<Errors>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleConfirm, setVisibleConfirm] = useState<boolean>(false);

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    try {
      const validations = registerUserDataSchema.safeParse(data);
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

      const res = await searchUserByEmail(data.email);

      if (res.message === "Este correo ya esta registrado") {
        setErrors({ email: "El correo ya esta registrado" });
        return null;
      }

      setUserData(data);
      setIndexActive(2);
    } catch (error) {
      toast.error("Error al registrar usuario");
    }
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 grid-flow-row gap-6">
          <div className="relative">
            <Input
              type="email"
              id="email"
              placeholder="Correo electrónico"
              {...register("email")}
            />
            {errors?.email && (
              <p className="text-red-700 text-xs">{errors?.email}</p>
            )}
          </div>

          <div className="relative">
            <Input
              type={`${visible ? "text" : "password"}`}
              id="contraseña"
              placeholder="Contraseña"
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
              type={`${visibleConfirm ? "text" : "password"}`}
              id="confirmar-contraseña"
              placeholder="Confirmar contraseña"
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
        </div>
        <button
          type="submit"
          className="w-full flex justify-center bg-green-800 hover:bg-green-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
        >
          Siguiente
        </button>
      </form>
    </>
  );
};
