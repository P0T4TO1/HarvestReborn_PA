"use client";

import { FC, useContext, useEffect, useState } from "react";
import { profileSchema } from "@/validations/profile.validation";
import { Estado, IUser } from "@/interfaces";
import { AuthContext } from "@/context/auth";
import { hrApi } from "@/api";
import { NextResponse } from "next/server";
import { CircularProgress, Select, SelectItem } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";

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
  const [isMutation, setIsMutation] = useState<boolean>(false);
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
    console.log(profile);
    try {
      data = {
        ...profile,
        ...data,
      };
      data.dueneg = {
        ...profile.dueneg,
        ...data.dueneg,
      };
      data.dueneg.negocio = {
        ...profile.dueneg?.negocio,
        ...data.dueneg.negocio,
      };
      data.cliente = {
        ...profile.cliente,
        ...data.cliente,
      };
      console.log("data", data);
      const validations = profileSchema.safeParse(data);
      if (!validations.success) {
        console.log("error", validations.error.issues);
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
          return NextResponse.json(
            {
              message: "El usuario se modifico correctamente",
            },
            { status: 200 }
          );
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
      <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
        <div className="flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
          <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>
          <button className="flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full">
            Perfil público
          </button>
          <button className="flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full">
            Cuenta
          </button>
          <button className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full  ">
            Notificaciones
          </button>
        </div>
      </aside>
      <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
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
                  <div className="mb-2 sm:mb-6">
                    <Input
                      isDisabled={!isEditing}
                      type="email"
                      label="Correo electrónico"
                      className="w-full"
                      defaultValue={profile?.email}
                      disabled={!isEditing}
                      {...register("email")}
                    />
                  </div>

                  {user?.id_rol === 2 && (
                    <>
                      <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                        <div className="w-full pt-4">
                          <Input
                            type="text"
                            className="w-full"
                            label="Nombre(s)"
                            defaultValue={profile?.dueneg?.nombre_dueneg}
                            isDisabled={!isEditing}
                            {...register("dueneg.nombre_dueneg")}
                            aria-label={"Nombre del dueño"}
                          />
                        </div>

                        <div className="w-full pt-4">
                          <Input
                            type="text"
                            className="w-full"
                            label="Apellidos"
                            defaultValue={profile?.dueneg?.apellidos_dueneg}
                            isDisabled={!isEditing}
                            {...register("dueneg.apellidos_dueneg")}
                            aria-label={"Apellidos del dueño"}
                          />
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
                                  profile?.dueneg?.fecha_nacimiento
                                    ?.toString()
                                    .split("-")[2]
                                    .split("T")[0]
                                }
                                isDisabled={!isEditing}
                                aria-label={"Día de nacimiento"}
                              />
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
                                  profile?.dueneg?.fecha_nacimiento
                                    ?.toString()
                                    .split("-")[0]
                                }
                                isDisabled={!isEditing}
                                aria-label={"Año de nacimiento"}
                              />
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
                              profile?.dueneg?.negocio?.nombre_negocio
                            }
                            isDisabled={!isEditing}
                            {...register("dueneg.negocio.nombre_negocio")}
                            aria-label={"Nombre del negocio"}
                          />
                        </div>

                        <div className="w-full">
                          <Input
                            type="text"
                            className="w-full"
                            label="Teléfono del Negocio"
                            defaultValue={
                              profile?.dueneg?.negocio?.telefono_negocio
                            }
                            isDisabled={!isEditing}
                            {...register("dueneg.negocio.telefono_negocio")}
                            aria-label={"Teléfono del negocio"}
                          />
                        </div>
                      </div>
                      <div className="mb-2 sm:mb-6">
                        <Input
                          type="text"
                          className="w-full"
                          label="Dirección del Negocio"
                          defaultValue={
                            profile?.dueneg?.negocio?.direccion_negocio
                          }
                          isDisabled
                          aria-label={"Dirección del negocio"}
                        />
                      </div>
                      <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                        <div>
                          <Input
                            type="text"
                            className="w-full"
                            label="Calle y número"
                            defaultValue={
                              profile?.dueneg?.negocio?.direccion_negocio?.split(
                                ","
                              )[0]
                            }
                            isDisabled={!isEditing}
                            aria-label={"Calle y número"}
                          />
                        </div>
                        <div className="mb-2 sm:mb-6">
                          <Input
                            type="text"
                            className="w-full"
                            label="Colonia"
                            defaultValue={
                              profile?.dueneg?.negocio?.direccion_negocio?.split(
                                ","
                              )[1]
                            }
                            isDisabled={!isEditing}
                            aria-label={"Colonia"}
                          />
                        </div>
                        <div className="mb-2 sm:mb-6">
                          <Input
                            type="text"
                            className="w-full"
                            label="Alcaldía"
                            defaultValue={
                              profile?.dueneg?.negocio?.direccion_negocio?.split(
                                ","
                              )[2]
                            }
                            isDisabled={!isEditing}
                            aria-label={"Alcaldía"}
                          />
                        </div>
                        <div className="mb-2 sm:mb-6">
                          <Input
                            type="text"
                            className="w-full"
                            label="Código Postal"
                            defaultValue={
                              profile?.dueneg?.negocio?.direccion_negocio?.split(
                                ","
                              )[3]
                            }
                            isDisabled={!isEditing}
                            aria-label={"Código postal"}
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        <Input
                          type="email"
                          className="w-full"
                          label="Email del Negocio"
                          defaultValue={profile?.dueneg?.negocio?.email_negocio}
                          isDisabled={!isEditing}
                          {...register("dueneg.negocio.email_negocio")}
                          aria-label={"Email del negocio"}
                        />
                      </div>
                    </>
                  )}

                  {user?.id_rol === 3 && (
                    <>
                      <div className="grid grid-cols-2 grid-flow-row gap-6 mt-6">
                        <div className="w-full">
                          <label
                            htmlFor="cluni"
                            className="block mb-2 text-sm font-medium text-indigo-900"
                          >
                            Nombre(s)
                          </label>
                          <input
                            type="text"
                            id="nombre"
                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="Nombre(s)"
                            defaultValue={profile?.cliente?.nombre_cliente}
                            disabled={!isEditing}
                            {...register("cliente.nombre_cliente")}
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="apellidos"
                            className="block mb-2 text-sm font-medium text-indigo-900"
                          >
                            Apellidos
                          </label>
                          <Input
                            type="text"
                            id="apellidos"
                            className="w-full"
                            label="Apellidos"
                            defaultValue={profile?.cliente?.apellidos_cliente}
                            isDisabled={!isEditing}
                            {...register("cliente.apellidos_cliente")}
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="tel_c"
                            className="block mb-2 text-sm font-medium text-indigo-900"
                          >
                            Número de Teléfono
                          </label>
                          <Input
                            type="text"
                            id="tel_c"
                            className="w-full"
                            label="Número de teléfono"
                            defaultValue={profile?.cliente?.telefono_cliente}
                            isDisabled={!isEditing}
                            {...register("cliente.telefono_cliente")}
                          />
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
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="my-2 sm:my-6 w-full">
                        <label
                          htmlFor="nombre_negocio_c"
                          className="block mb-2 text-sm font-medium text-indigo-900"
                        >
                          Nombre del Negocio(si aplica)
                        </label>
                        <Input
                          type="text"
                          id="nombre_negocio_c"
                          className="w-full"
                          label="Siglas de la Organización"
                          defaultValue={profile?.cliente?.nombre_negocio}
                          isDisabled={!isEditing}
                          {...register("cliente.nombre_negocio")}
                        />
                      </div>
                      <div className="my-2 sm:my-6 w-full">
                        <label
                          htmlFor="direction_c"
                          className="block mb-2 text-sm font-medium text-indigo-900"
                        >
                          Dirección del Negocio(si aplica)
                        </label>
                        <Input
                          type="text"
                          id="direction"
                          className="w-full"
                          label="Dirección del Negocio"
                          defaultValue={profile?.cliente?.direccion_negocio}
                          isDisabled
                          {...register("cliente.direccion_negocio")}
                        />
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
      </main>
    </section>
  );
};
