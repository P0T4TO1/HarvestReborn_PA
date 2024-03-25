"use client";

import { FC, useContext, useEffect, useState } from "react";
import { profileSchema } from "@/validations/profile.validation";
import { Estado, IUser } from "@/interfaces";
import { AuthContext } from "@/context/auth";
import { hrApi } from "@/api";
import { CircularProgress, Select, SelectItem } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { AsideProfile, SUCCESS_TOAST } from "@/components";
import { toast } from "sonner";
import { getSession } from "next-auth/react";

type Errors = {
  email?: string;

  nombre_cliente?: string;
  apellidos_cliente?: string;
  telefono_cliente?: string;
  fecha_nacimiento_c?: string;
  dia_nacimiento_c?: string;
  mes_nacimiento_c?: string;
  year_nacimiento_c?: string;
  nombre_negocio_c?: string;
  direccion_negocio_c?: string;
  calle_c?: string;
  colonia_c?: string;
  cp_c?: string;

  nombre_dueneg?: string;
  apellidos_dueneg?: string;
  fecha_nacimiento_d?: string;
  dia_nacimiento_d?: string;
  mes_nacimiento_d?: string;
  year_nacimiento_d?: string;
  nombre_negocio_d?: string;
  direccion_negocio_d?: string;
  calle_d?: string;
  colonia_d?: string;
  cp_d?: string;
  telefono_negocio_d?: string;
  email_negocio?: string;
} | null;

interface IFormData {
  email: string;

  dueneg: {
    nombre_dueneg: string;
    apellidos_dueneg: string;
    fecha_nacimiento: string;
    negocio: {
      nombre_negocio: string;
      direccion_negocio: string;
      telefono_negocio: string;
      email_negocio?: string;
    };
  };

  cliente: {
    nombre_cliente: string;
    apellidos_cliente: string;
    telefono_cliente: string;
    fecha_nacimiento: string;
    nombre_negocio?: string;
    direccion_negocio?: string;
  };
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

export const ProfileForm: FC = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm<IFormData>();

  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Errors>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fecNac, setFecNac] = useState<{
    day: string;
    month: string;
    year: string;
  }>({
    day: "",
    month: "",
    year: "",
  });

  const [fecNacC, setFecNacC] = useState<{
    day: string;
    month: string;
    year: string;
  }>({
    day: "",
    month: "",
    year: "",
  });

  const [profile, setProfile] = useState<IUser>({
    id: "",
    id_rol: 0,
    email: "",
    password: "",
    estado: Estado.Activo,
  });

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    hrApi.get(`/user/profile/${user?.id}`).then((res) => {
      if (res.status === 200) {
        setProfile(res.data);
      } else {
        setError(true);
      }
      setLoading(false);
    });
  }, [user?.id, profile]);

  const onUpdateProfile: SubmitHandler<IFormData> = async (data) => {
    try {
      data = {
        ...profile,
        ...data,
      };
      data.dueneg = {
        ...profile.duenonegocio,
        ...data.dueneg,
      };
      data.dueneg.negocio = {
        ...profile.duenonegocio?.negocio,
        ...data.dueneg.negocio,
      };
      data.cliente = {
        ...profile.cliente,
        ...data.cliente,
      };
      const validations = profileSchema.safeParse(data);
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

      const res = await hrApi
        .put("/user/profile", { data })
        .then(() => {
          setIsEditing(false);
          toast("Perfil actualizado", SUCCESS_TOAST);
        })
        .catch((err) => {
          setErrors(err);
          return null;
        });
      if (res) {
        return res;
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931] min-h-screen">
      <AsideProfile />
      <div className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <div className="w-full pb-8 mt-8 sm:max-w-3xl sm:rounded-lg">
            <h2 className="text-2xl font-bold sm:text-xl">
              Perfil de Usuario
              {user?.id_rol === 2 ? (
                <span className="text-sm font-normal text-gray-500">
                  {" "}
                  (Negocio)
                </span>
              ) : user?.id_rol === 3 ? (
                <span className="text-sm font-normal text-gray-500">
                  {" "}
                  (Cliente)
                </span>
              ) : (
                <span className="text-sm font-normal text-gray-500">
                  {" "}
                  (Administrador)
                </span>
              )}
            </h2>
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="mt-6 flex justify-center bg-green-800 hover:bg-green-700 text-gray-100 p-3 text-xs rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
            >
              {isEditing ? "Cancelar" : "Editar"}
            </button>

            {loading ? (
              <CircularProgress
                size="lg"
                aria-label="Loading..."
                className="mt-4"
              />
            ) : error ? (
              <p>Hubo un error</p>
            ) : (
              <div className="grid max-w-3xl mx-auto">
                <form
                  onSubmit={handleSubmit(onUpdateProfile)}
                  className="items-center mt-8 sm:mt-14 text-[#202142]"
                >
                  {/*<div className="mb-2 sm:mb-6">*/}
                  {/*  <Input*/}
                  {/*    isDisabled={!isEditing}*/}
                  {/*    type="email"*/}
                  {/*    label="Correo electrónico"*/}
                  {/*    className="w-full"*/}
                  {/*    defaultValue={profile?.email}*/}
                  {/*    disabled={!isEditing}*/}
                  {/*    {...register("email")}*/}
                  {/*  />*/}
                  {/*  {errors?.email && (*/}
                  {/*    <p className="text-red-500 text-xs">{errors?.email}</p>*/}
                  {/*  )}*/}
                  {/*</div>*/}

                  {user?.id_rol === 2 && (
                    <>
                      <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                        <div className="w-full pt-4">
                          <Input
                            type="text"
                            className="w-full"
                            label="Nombre(s)"
                            defaultValue={profile?.duenonegocio?.nombre_dueneg}
                            isDisabled={!isEditing}
                            {...register("dueneg.nombre_dueneg")}
                            aria-label={"Nombre del dueño"}
                          />
                          {errors?.nombre_dueneg && (
                            <p className="text-red-500 text-xs">
                              {errors?.nombre_dueneg}
                            </p>
                          )}
                        </div>

                        <div className="w-full pt-4">
                          <Input
                            type="text"
                            className="w-full"
                            label="Apellidos"
                            defaultValue={
                              profile?.duenonegocio?.apellidos_dueneg
                            }
                            isDisabled={!isEditing}
                            {...register("dueneg.apellidos_dueneg")}
                            aria-label={"Apellidos del dueño"}
                          />
                          {errors?.apellidos_dueneg && (
                            <p className="text-red-500 text-xs">
                              {errors?.apellidos_dueneg}
                            </p>
                          )}
                        </div>
                        <div className="w-full">
                          <div className="relative">
                            <p className="ml-2 mb-2 text-sm text-gray-400 font-medium">
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
                                defaultValue={
                                  profile?.duenonegocio?.fecha_nacimiento
                                    ?.toString()
                                    .split("-")[2]
                                    .split("T")[0]
                                }
                                isDisabled={!isEditing}
                                aria-label={"Día de nacimiento"}
                              />
                              {errors?.dia_nacimiento_d && (
                                <p className="text-red-500 text-xs">
                                  {errors?.dia_nacimiento_d}
                                </p>
                              )}
                            </div>
                            <div className="relative">
                              <Select
                                radius="sm"
                                id="mes_nacimiento"
                                placeholder="Mes"
                                onChange={(e) => {
                                  setFecNac({
                                    ...fecNac,
                                    month: e.target.value,
                                  });
                                }}
                                isDisabled={!isEditing}
                              >
                                {Object.entries(months).map(([key, value]) => (
                                  <SelectItem value={key} key={key}>
                                    {value}
                                  </SelectItem>
                                ))}
                              </Select>
                              {errors?.mes_nacimiento_d && (
                                <p className="text-red-500 text-xs">
                                  {errors?.mes_nacimiento_d}
                                </p>
                              )}
                            </div>
                            <div className="relative">
                              <Input
                                radius="sm"
                                id="año_nacimiento"
                                type="text"
                                placeholder="Año"
                                onChange={(e) => {
                                  setFecNac({
                                    ...fecNac,
                                    year: e.target.value,
                                  });
                                }}
                                defaultValue={
                                  profile?.duenonegocio?.fecha_nacimiento
                                    ?.toString()
                                    .split("-")[0]
                                }
                                isDisabled={!isEditing}
                                aria-label={"Año de nacimiento"}
                              />
                              {errors?.year_nacimiento_d && (
                                <p className="text-red-500 text-xs">
                                  {errors?.year_nacimiento_d}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                        <div className="w-full">
                          <Input
                            type="text"
                            className="w-full"
                            label="Nombre del Negocio"
                            defaultValue={
                              profile?.duenonegocio?.negocio?.nombre_negocio
                            }
                            isDisabled={!isEditing}
                            {...register("dueneg.negocio.nombre_negocio")}
                            aria-label={"Nombre del negocio"}
                          />
                          {errors?.nombre_negocio_d && (
                            <p className="text-red-500 text-xs">
                              {errors?.nombre_negocio_d}
                            </p>
                          )}
                        </div>

                        <div className="w-full">
                          <Input
                            type="text"
                            className="w-full"
                            label="Número de teléfono"
                            defaultValue={
                              profile?.duenonegocio?.negocio?.telefono_negocio
                            }
                            isDisabled={!isEditing}
                            {...register("dueneg.negocio.telefono_negocio")}
                            aria-label={"Teléfono del negocio"}
                          />
                          {errors?.telefono_negocio_d && (
                            <p className="text-red-500 text-xs">
                              {errors?.telefono_negocio_d}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="mb-2 sm:mb-6">
                        <Input
                          type="text"
                          className="w-full"
                          label="Dirección del Negocio"
                          defaultValue={
                            profile?.duenonegocio?.negocio?.direccion_negocio
                          }
                          isDisabled
                          aria-label={"Dirección del negocio"}
                        />
                        {errors?.direccion_negocio_d && (
                          <p className="text-red-500 text-xs">
                            {errors?.direccion_negocio_d}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                        <div>
                          <Input
                            type="text"
                            className="w-full"
                            label="Calle y número"
                            defaultValue={
                              profile?.duenonegocio?.negocio?.direccion_negocio?.split(
                                ","
                              )[0]
                            }
                            isDisabled={!isEditing}
                            aria-label={"Calle y número"}
                          />
                          {errors?.calle_d && (
                            <p className="text-red-500 text-xs">
                              {errors?.calle_d}
                            </p>
                          )}
                        </div>
                        <div className="mb-2 sm:mb-6">
                          <Input
                            type="text"
                            className="w-full"
                            label="Colonia"
                            defaultValue={
                              profile?.duenonegocio?.negocio?.direccion_negocio?.split(
                                ","
                              )[1]
                            }
                            isDisabled={!isEditing}
                            aria-label={"Colonia"}
                          />
                          {errors?.colonia_d && (
                            <p className="text-red-500 text-xs">
                              {errors?.colonia_d}
                            </p>
                          )}
                        </div>
                        <div className="mb-2 sm:mb-6">
                          <Input
                            type="text"
                            className="w-full"
                            label="Alcaldía"
                            defaultValue={
                              profile?.duenonegocio?.negocio?.direccion_negocio?.split(
                                ","
                              )[2]
                            }
                            isDisabled={!isEditing}
                            aria-label={"Alcaldía"}
                          />
                          {errors?.cp_d && (
                            <p className="text-red-500 text-xs">
                              {errors?.cp_d}
                            </p>
                          )}
                        </div>
                        <div className="mb-2 sm:mb-6">
                          <Input
                            type="text"
                            className="w-full"
                            label="Código Postal"
                            defaultValue={
                              profile?.duenonegocio?.negocio?.direccion_negocio?.split(
                                ","
                              )[3]
                            }
                            isDisabled={!isEditing}
                            aria-label={"Código postal"}
                          />
                          {errors?.cp_d && (
                            <p className="text-red-500 text-xs">
                              {errors?.cp_d}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mb-6">
                        <Input
                          type="email"
                          className="w-full"
                          label="Email del Negocio"
                          defaultValue={
                            profile?.duenonegocio?.negocio?.email_negocio
                          }
                          isDisabled={!isEditing}
                          {...register("dueneg.negocio.email_negocio")}
                          aria-label={"Email del negocio"}
                        />
                        {errors?.email_negocio && (
                          <p className="text-red-500 text-xs">
                            {errors?.email_negocio}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {user?.id_rol === 3 && (
                    <>
                      <div className="grid grid-cols-2 grid-flow-row gap-6 mt-6">
                        <div className="w-full">
                          <Input
                            type="text"
                            id="nombre"
                            className="w-full"
                            label="Nombre(s)"
                            defaultValue={profile?.cliente?.nombre_cliente}
                            isDisabled={!isEditing}
                            {...register("cliente.nombre_cliente")}
                          />
                          {errors?.nombre_cliente && (
                            <p className="text-red-500 text-xs">
                              {errors?.nombre_cliente}
                            </p>
                          )}
                        </div>
                        <div className="w-full">
                          <Input
                            type="text"
                            id="apellidos"
                            className="w-full"
                            label="Apellidos"
                            defaultValue={profile?.cliente?.apellidos_cliente}
                            isDisabled={!isEditing}
                            {...register("cliente.apellidos_cliente")}
                          />
                          {errors?.apellidos_cliente && (
                            <p className="text-red-500 text-xs">
                              {errors?.apellidos_cliente}
                            </p>
                          )}
                        </div>
                        <div className="w-full">
                          <Input
                            type="text"
                            id="tel_c"
                            className="w-full"
                            label="Número de teléfono"
                            defaultValue={profile?.cliente?.telefono_cliente}
                            isDisabled={!isEditing}
                            {...register("cliente.telefono_cliente")}
                          />
                          {errors?.telefono_cliente && (
                            <p className="text-red-500 text-xs">
                              {errors?.telefono_cliente}
                            </p>
                          )}
                        </div>
                        <div>
                          <div className="relative">
                            <p className="ml-2 mb-2 text-sm text-indigo-900 font-medium">
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
                                  setFecNac({
                                    ...fecNacC,
                                    day: e.target.value,
                                  });
                                }}
                                defaultValue={
                                  profile?.cliente?.fecha_nacimiento
                                    ?.toString()
                                    .split("-")[2]
                                    .split("T")[0]
                                }
                                disabled={!isEditing}
                                required={false}
                              />
                              {errors?.dia_nacimiento_c && (
                                <p className="text-red-500 text-xs">
                                  {errors?.dia_nacimiento_c}
                                </p>
                              )}
                            </div>
                            <div className="relative">
                              <Select
                                radius="sm"
                                id="mes_nacimiento"
                                placeholder="Mes"
                                onChange={(e) => {
                                  setFecNacC({
                                    ...fecNacC,
                                    month: e.target.value,
                                  });
                                }}
                                disabled={!isEditing}
                                required={false}
                              >
                                {Object.entries(months).map(([key, value]) => (
                                  <SelectItem value={key} key={key}>
                                    {value}
                                  </SelectItem>
                                ))}
                              </Select>
                              {errors?.mes_nacimiento_c && (
                                <p className="text-red-500 text-xs">
                                  {errors?.mes_nacimiento_c}
                                </p>
                              )}
                            </div>
                            <div className="relative">
                              <Input
                                radius="sm"
                                id="año_nacimiento"
                                type="text"
                                placeholder="Año"
                                onChange={(e) => {
                                  setFecNacC({
                                    ...fecNacC,
                                    year: e.target.value,
                                  });
                                }}
                                defaultValue={
                                  profile?.cliente?.fecha_nacimiento
                                    ?.toString()
                                    .split("-")[0]
                                }
                                required={false}
                                disabled={!isEditing}
                              />
                              {errors?.year_nacimiento_c && (
                                <p className="text-red-500 text-xs">
                                  {errors?.year_nacimiento_c}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="my-2 sm:my-6 w-full">
                        <Input
                          type="text"
                          id="nombre_negocio_c"
                          className="w-full"
                          label="Nombre del negocio"
                          defaultValue={profile?.cliente?.nombre_negocio}
                          isDisabled={!isEditing}
                          {...register("cliente.nombre_negocio")}
                        />
                        {errors?.nombre_negocio_c && (
                          <p className="text-red-500 text-xs">
                            {errors?.nombre_negocio_c}
                          </p>
                        )}
                      </div>
                      <div className="my-2 sm:my-6 w-full">
                        <Input
                          type="text"
                          id="direction"
                          className="w-full"
                          label="Dirección del Negocio"
                          defaultValue={profile?.cliente?.direccion_negocio}
                          isDisabled
                          {...register("cliente.direccion_negocio")}
                        />
                        {errors?.direccion_negocio_c && (
                          <p className="text-red-500 text-xs">
                            {errors?.direccion_negocio_c}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="flex justify-center bg-green-800 hover:bg-green-700 text-gray-100 p-3 text-sm rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
