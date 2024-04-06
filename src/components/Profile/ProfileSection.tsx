"use client";

import { AsideAccount } from "@/components";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/auth";
import { IUser } from "@/interfaces";
import { hrApi } from "@/api";
import { ProfileForm } from "@/components";
import { CircularProgress, Button } from "@nextui-org/react";
import { FaEdit } from "react-icons/fa";

export const ProfileSection = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<IUser>();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

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
  }, [user?.id]);

  return (
    <div className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
      <div className="p-2 md:p-4">
        <div className="w-full pb-8 mt-8 sm:max-w-5xl sm:rounded-lg">
          <h2 className="text-2xl font-bold sm:text-xl dark:text-gray-300">
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
          <Button
            type="button"
            color="success"
            className="mt-4"
            size="md"
            onClick={() => setIsEditing(!isEditing)}
            startContent={<FaEdit size={20} />}
          >
            {isEditing ? "Cancelar" : "Editar"}
          </Button>
          {loading ? (
            <CircularProgress
              size="lg"
              aria-label="Loading..."
              className="mt-4"
            />
          ) : error ? (
            <p>Hubo un error</p>
          ) : (
            <ProfileForm profile={profile as IUser} isEditing={isEditing} />
          )}
        </div>
      </div>
    </div>
  );
};
