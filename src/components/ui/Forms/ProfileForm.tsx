"use client";

import { FC, useContext, useEffect, useState } from "react";
import { profileSchema } from "@/validations/profile.validation";
import { Estado, IUser } from "@/interfaces";
import { AuthContext } from "@/context/auth";
import { hrApi } from "@/api";
import { NextResponse } from "next/server";
import { Select, SelectItem } from "@nextui-org/react";
import { Input } from "@nextui-org/input";

type Errors = {
  email?: string;
  password?: string;

  nombre_dueneg?: string;
  apellidos_dueneg?: string;
  fecha_nacimiento_d?: string;
  dia_nacimiento_d?: string;
  mes_nacimiento_d?: string;
  year_nacimiento_d?: string;
  nombre_negocio?: string;
  direccion_negocio?: string;
  telefono_negocio?: string;
  email_negocio?: string;

  nombre_cliente?: string;
  apellidos_cliente?: string;
  telefono_cliente?: string;
  fecha_nacimiento_c?: string;
  dia_nacimiento_c?: string;
  mes_nacimiento_c?: string;
  year_nacimiento_c?: string;
  nombre_negocio_c?: string;
  direccion_negocio_c?: string;
} | null;

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

  const [profile, setProfile] = useState<IUser>({
    id: "",
    id_rol: 0,
    email: "",
    password: "",
    estado: Estado.Activo,
  });

  useEffect(() => {
    hrApi.get(`/user/profile/${user?.id}`).then((res) => {
      if (res.status === 200) {
        setProfile(res.data);
      } else {
        setError(true);
      }
      setLoading(false);
    });
  }, [user?.id, profile]);

  const onUpdateProfile = async (formData: FormData) => {
    if (isMutation) return null;
    setIsMutation(true);

    try {
      const data = {
        user_email: formData.get("email") as string,
        user_password: formData.get("password") as string,
        business_name: formData.get("business_name") as string,
        business_tel: formData.get("business_tel") as string,
        owner_name: formData.get("owner_name") as string,
        owner_surnames: formData.get("owner_surnames") as string,
        org_name: formData.get("name") as string,
        org_acro: formData.get("acronym") as string,
        org_cluni: formData.get("cluni") as string,
        org_rfc: formData.get("rfc") as string,
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
    } finally {
      setIsMutation(false);
    }
  };

  return (
    <section className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931] min-h-screen pt-32">
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
              <p>Cargando...</p>
            ) : error ? (
              <p>Hubo un error</p>
            ) : (
              <div className="grid max-w-3xl mx-auto">
                <form
                  action={onUpdateProfile}
                  className="items-center mt-8 sm:mt-14 text-[#202142]"
                >
                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-indigo-900"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="Correo electrónico"
                      value={profile?.email}
                      defaultValue={profile?.email}
                      disabled={!isEditing}
                    />
                  </div>

                  {user?.id_rol === 2 && (
                    <>
                      <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                        <div className="w-full">
                          <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-indigo-900"
                          >
                            Nombres
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="Nombre(s)"
                            value={profile?.dueneg?.nombre_dueneg}
                            defaultValue={profile?.dueneg?.nombre_dueneg}
                            disabled={!isEditing}
                          />
                        </div>

                        <div className="w-full">
                          <label
                            htmlFor="last_name"
                            className="block mb-2 text-sm font-medium text-indigo-900"
                          >
                            Apellidos
                          </label>
                          <input
                            type="text"
                            id="last_name"
                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="Apellidos"
                            value={profile?.dueneg?.apellidos_dueneg}
                            defaultValue={profile?.dueneg?.apellidos_dueneg}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="last_name"
                            className="block mb-2 text-sm font-medium text-indigo-900"
                          >
                            Fecha de Nacimiento
                          </label>
                          <input
                            type="date"
                            id="fecha_nacimiento"
                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="Fecha de Nacimiento"
                            value={profile?.dueneg?.fecha_nacimiento}
                            defaultValue={profile?.dueneg?.fecha_nacimiento}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                        <div className="w-full">
                          <label
                            htmlFor="business_name"
                            className="block mb-2 text-sm font-medium text-indigo-900"
                          >
                            Nombre del Negocio
                          </label>
                          <input
                            type="text"
                            id="business_name"
                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="Nombre del Negocio"
                            value={profile?.dueneg?.negocio?.nombre_negocio}
                            defaultValue={
                              profile?.dueneg?.negocio?.nombre_negocio
                            }
                            disabled={!isEditing}
                          />
                        </div>

                        <div className="w-full">
                          <label
                            htmlFor="tel"
                            className="block mb-2 text-sm font-medium text-indigo-900"
                          >
                            Teléfono del Negocio
                          </label>
                          <input
                            type="text"
                            id="tel"
                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="Teléfono del Negocio"
                            value={profile?.dueneg?.negocio?.telefono_negocio}
                            defaultValue={
                              profile?.dueneg?.negocio?.telefono_negocio
                            }
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      <div className="mb-2 sm:mb-6">
                        <label
                          htmlFor="direction"
                          className="block mb-2 text-sm font-medium text-indigo-900"
                        >
                          Dirección del Negocio
                        </label>
                        <input
                          type="text"
                          id="direction"
                          className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                          placeholder="Dirección del Negocio"
                          value={profile?.dueneg?.negocio?.direccion_negocio}
                          defaultValue={
                            profile?.dueneg?.negocio?.direccion_negocio
                          }
                          disabled
                        />
                      </div>
                      <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                        <div>
                          <label
                            htmlFor="Calle_numero"
                            className="block mb-2 text-sm font-medium text-indigo-900"
                          >
                            Calle y número
                          </label>
                          <input
                            type="text"
                            id="calle_numero"
                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="Calle y número"
                            value={
                              profile?.dueneg?.negocio?.direccion_negocio?.split(
                                ","
                              )[0]
                            }
                            defaultValue={
                              profile?.dueneg?.negocio?.direccion_negocio?.split(
                                ","
                              )[0]
                            }
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="mb-2 sm:mb-6">
                          <label
                            htmlFor="colonia"
                            className="block mb-2 text-sm font-medium text-indigo-900"
                          >
                            Colonia
                          </label>
                          <input
                            type="text"
                            id="colonia"
                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="Colonia"
                            value={
                              profile?.dueneg?.negocio?.direccion_negocio?.split(
                                ","
                              )[1]
                            }
                            defaultValue={
                              profile?.dueneg?.negocio?.direccion_negocio?.split(
                                ","
                              )[1]
                            }
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="mb-2 sm:mb-6">
                          <label
                            htmlFor="cp"
                            className="block mb-2 text-sm font-medium text-indigo-900"
                          >
                            Código Postal
                          </label>
                          <input
                            type="text"
                            id="cp"
                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="Código Postal"
                            value={
                              profile?.dueneg?.negocio?.direccion_negocio?.split(
                                ","
                              )[2]
                            }
                            defaultValue={
                              profile?.dueneg?.negocio?.direccion_negocio?.split(
                                ","
                              )[2]
                            }
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        <label
                          htmlFor="email-negocio"
                          className="block mb-2 text-sm font-medium text-indigo-900"
                        >
                          Email del Negocio
                        </label>
                        <input
                          type="text"
                          id="direction"
                          className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                          placeholder="Email del Negocio"
                          value={profile?.dueneg?.negocio?.email_negocio}
                          defaultValue={profile?.dueneg?.negocio?.email_negocio}
                          disabled={!isEditing}
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
                            value={profile?.cliente?.nombre_cliente}
                            defaultValue={profile?.cliente?.nombre_cliente}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="apellidos"
                            className="block mb-2 text-sm font-medium text-indigo-900"
                          >
                            Apellidos
                          </label>
                          <input
                            type="text"
                            id="apellidos"
                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="Apellidos"
                            value={profile?.cliente?.apellidos_cliente}
                            defaultValue={profile?.cliente?.apellidos_cliente}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="tel_c"
                            className="block mb-2 text-sm font-medium text-indigo-900"
                          >
                            Número de Teléfono
                          </label>
                          <input
                            type="text"
                            id="tel_c"
                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="Número de teléfono"
                            value={profile?.cliente?.telefono_cliente}
                            defaultValue={profile?.cliente?.telefono_cliente}
                            disabled={!isEditing}
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
                                  setFecNac({ ...fecNac, day: e.target.value });
                                }}
                                defaultValue={(profile?.cliente?.fecha_nacimiento)?.toString().split("-")[2].split("T")[0]}
                                value={(profile?.cliente?.fecha_nacimiento)?.toString().split("-")[2].split("T")[0]}
                                disabled={!isEditing}
                              />
                              {errors?.dia_nacimiento_c && (
                                <p className="text-red-700 text-xs">
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
                                  setFecNac({
                                    ...fecNac,
                                    month: e.target.value,
                                  });
                                }}
                                disabled={!isEditing}
                              >
                                {Object.entries(months).map(([key, value]) => (
                                  <SelectItem value={key} key={key}>
                                    {value}
                                  </SelectItem>
                                ))}
                              </Select>
                              {errors?.mes_nacimiento_c && (
                                <p className="text-red-700 text-xs">
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
                                  setFecNac({
                                    ...fecNac,
                                    year: e.target.value,
                                  });
                                }}
                                defaultValue={(profile?.cliente?.fecha_nacimiento)?.toString().split("-")[0]}
                                value={(profile?.cliente?.fecha_nacimiento)?.toString().split("-")[0]}
                                disabled={!isEditing}
                              />
                              {errors?.year_nacimiento_c && (
                                <p className="text-red-700 text-xs">
                                  {errors?.year_nacimiento_c}
                                </p>
                              )}
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
                        <input
                          type="text"
                          id="nombre_negocio_c"
                          className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                          placeholder="Siglas de la Organización"
                          value={profile?.cliente?.nombre_negocio}
                          defaultValue={profile?.cliente?.nombre_negocio}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="my-2 sm:my-6 w-full">
                        <label
                          htmlFor="direction_c"
                          className="block mb-2 text-sm font-medium text-indigo-900"
                        >
                          Dirección del Negocio(si aplica)
                        </label>
                        <input
                          type="text"
                          id="direction"
                          className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                          placeholder="Dirección del Negocio"
                          value={profile?.cliente?.direccion_negocio}
                          defaultValue={profile?.cliente?.direccion_negocio}
                          disabled={!isEditing}
                        />
                      </div>
                    </>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isMutation}
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
