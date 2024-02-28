"use client";

import { FC, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { profileSchema } from "@/validations/profile.validation";
import { IBusiness, IOrganization, IUser } from "@/interfaces";
import { AuthContext } from "@/context/auth";
import { hrApi } from "@/api";
import { NextResponse } from "next/server";
import { log } from "console";

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

interface Props {
  userDataBusiness: IBusiness;
  userDataOrg: IOrganization;
  userData: IUser;
}

export const ProfileForm: FC<Props> = ({
  userDataBusiness,
  userDataOrg,
  userData,
}) => {
  const { user } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Errors>(null);
  const [isMutation, setIsMutation] = useState<boolean>(false);

  const [userProfile, setUserProfile] = useState<
    IUser | IOrganization | IBusiness
  >(userData || userDataOrg || userDataBusiness);

  useEffect(() => {
    if (userData || userDataOrg || userDataBusiness) {
      setUserProfile(userData || userDataOrg || userDataBusiness);
    }
  }, [userData, userDataOrg, userDataBusiness]);

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
        .put("/user/profile", {
          ...userProfile,
          data,
        })
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
              className="mt-6 flex justify-center bg-green-800 hover:bg-green-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
            >
              {isEditing ? "Cancelar" : "Editar"}
            </button>

            <div className="grid max-w-2xl mx-auto">
              <form
                action={onUpdateProfile}
                className="items-center mt-8 sm:mt-14 text-[#202142]"
              >
                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <div className="w-full">
                    <div className="relative">
                      <input
                        className=" w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-green-700"
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nombres(s)"
                        disabled={!isEditing}
                        value={!isEditing ? userProfile?.user_email : undefined}
                        defaultValue={!isEditing ? userProfile?.user_email : undefined}
                      />
                      {errors?.owner_name && (
                        <p className="text-red-700 text-xs">
                          {errors?.owner_name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="last_name"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Your last name
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="Your last name"
                      required
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="mb-2 sm:mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="your.email@mail.com"
                    required
                    disabled={!isEditing}
                  />
                </div>

                <div className="mb-2 sm:mb-6">
                  <label
                    htmlFor="profession"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                  >
                    Profession
                  </label>
                  <input
                    type="text"
                    id="profession"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="your profession"
                    required
                    disabled={!isEditing}
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                  >
                    Bio
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 "
                    placeholder="Write your bio here..."
                    disabled={!isEditing}
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                  >
                    Save
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
