"use client";

import { FC, useContext, useEffect, useState } from "react";
import { profileSchema } from "@/validations/profile.validation";
import { IUser } from "@/interfaces";
import { AuthContext } from "@/context/auth";
import { hrApi } from "@/api";
import { NextResponse } from "next/server";

type Errors = {
  user_email?: string;
  user_pass?: string;

  business_name?: string;
  business_tel?: string;
  owner_name?: string;
  owner_surnames?: string;

  org_name?: string;
  org_acro?: string;
  org_cluni?: string;
  org_rfc?: string;
} | null;

export const ProfileForm: FC = () => {
  const { user } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Errors>(null);
  const [isMutation, setIsMutation] = useState<boolean>(false);

  const [profile, setProfile] = useState<IUser>({
    id: "",
    role_id: 0,
    user_email: "",
    user_password: "",
  });

  useEffect(() => {
    const getUserProfile = async () => {
      const res = await hrApi.get(`/user/profile?id=${user?.id}`);
      if (res) {
        return setProfile(res.data);
      }
    };
    getUserProfile().then();
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
          <a
            href="#"
            className="flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full"
          >
            Pubic Profile
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full"
          >
            Account Settings
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full  "
          >
            Notifications
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full  "
          >
            PRO Account
          </a>
        </div>
      </aside>
      <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
            <h2 className="text-2xl font-bold sm:text-xl">
              Perfil de Usuario
              {user?.role_id === 2 && (
                <span className="text-sm font-normal text-gray-500">
                  {" "}
                  (Negocio)
                </span>
              )}
              {user?.role_id === 3 && (
                <span className="text-sm font-normal text-gray-500">
                  {" "}
                  (Organización)
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

            <div className="grid max-w-2xl mx-auto">
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
                    value={profile?.user_email}
                    defaultValue={profile?.user_email}
                    disabled={!isEditing}
                  />
                </div>

                {user?.role_id === 2 && (
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
                          value={profile?.business?.businessOwnerName}
                          defaultValue={profile?.business?.businessOwnerName}
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
                          value={profile?.business?.businessOwnerSurname}
                          defaultValue={profile?.business?.businessOwnerSurname}
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
                          value={profile?.business?.business_name}
                          defaultValue={profile?.business?.business_name}
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
                          value={profile?.business?.business_tel}
                          defaultValue={profile?.business?.business_tel}
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
                        value={profile?.business?.business_direction}
                        defaultValue={profile?.business?.business_direction}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-indigo-900"
                      >
                        Descripción
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 "
                        placeholder="Escribe una descripción..."
                        value={profile?.business?.business_description}
                        defaultValue={profile?.business?.business_description}
                        disabled={!isEditing}
                      ></textarea>
                    </div>
                  </>
                )}

                {user?.role_id === 3 && (
                  <>
                    <div className="w-full">
                      <label
                        htmlFor="cluni"
                        className="block mb-2 text-sm font-medium text-indigo-900"
                      >
                        CLUNI
                      </label>
                      <input
                        type="text"
                        id="cluni"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                        placeholder="CLUNI"
                        value={profile?.organization?.organization_cluni}
                        defaultValue={profile?.organization?.organization_cluni}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="grid grid-cols-2 grid-flow-row gap-6 mt-6">
                      <div className="w-full">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-indigo-900"
                        >
                          Nombre de la Organización
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                          placeholder="Nombre de la Organización"
                          value={profile?.organization?.organization_name}
                          defaultValue={
                            profile?.organization?.organization_name
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="w-full">
                        <label
                          htmlFor="acro"
                          className="block mb-2 text-sm font-medium text-indigo-900"
                        >
                          Siglas de la Organización
                        </label>
                        <input
                          type="text"
                          id="acro"
                          className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                          placeholder="Siglas de la Organización"
                          value={profile?.organization?.organization_acronym}
                          defaultValue={
                            profile?.organization?.organization_acronym
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="mb-2 sm:mb-6">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-indigo-900"
                        >
                          Nombre de la Organización
                        </label>
                        <input
                          type="text"
                          id="rfc"
                          className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                          placeholder="RFC"
                          value={profile?.organization?.organization_rfc}
                          defaultValue={profile?.organization?.organization_rfc}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="w-full">
                        <label
                          htmlFor="tel"
                          className="block mb-2 text-sm font-medium text-indigo-900"
                        >
                          Siglas de la Organización
                        </label>
                        <input
                          type="text"
                          id="tel"
                          className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                          placeholder="Siglas de la Organización"
                          value={profile?.organization?.organization_tel}
                          defaultValue={profile?.organization?.organization_tel}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="mb-2 sm:mb-6">
                      <label
                        htmlFor="direction"
                        className="block mb-2 text-sm font-medium text-indigo-900"
                      >
                        Dirección de la Organización
                      </label>
                      <input
                        type="text"
                        id="direction"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                        placeholder="Dirección del Negocio"
                        value={profile?.organization?.organization_direction}
                        defaultValue={
                          profile?.organization?.organization_direction
                        }
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-indigo-900"
                      >
                        Descripción
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 "
                        placeholder="Escribe una descripción..."
                        value={profile?.organization?.organization_description}
                        defaultValue={
                          profile?.organization?.organization_description
                        }
                        disabled={!isEditing}
                      ></textarea>
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
          </div>
        </div>
      </main>
    </section>
  );
};
