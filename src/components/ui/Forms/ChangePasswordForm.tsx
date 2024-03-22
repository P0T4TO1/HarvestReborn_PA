"use client";

import React, { useState } from "react";
import { hrApi } from "@/api";
import { Input, Button } from "@nextui-org/react";
import { toast } from "sonner";
import { SUCCESS_TOAST } from "@/components";
import { useRouter } from "next/navigation";

interface ChangePasswordFormProps {
  resetPasswordToken: string;
}

export const ChangePasswordForm = ({
  resetPasswordToken,
}: ChangePasswordFormProps) => {
  const router = useRouter();

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    const response = await hrApi.post("user/change-password", {
      resetToken: resetPasswordToken,
      password,
    });
    if (response.status !== 200) {
      setMessage("Error al cambiar la contraseña");
      return;
    } else {
      setMessage(response.data.message);
      toast("Contraseña cambiada correctamente", SUCCESS_TOAST);
      router.push("/auth/login");
    }
  };

  return (
    <section className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent">
      <div className="flex justify-center self-center z-10 shadow-xl">
        <div className="p-12 bg-white mx-auto rounded-3xl w-[386px]">
          <div className="mb-7">
            <h3 className="font-semibold text-2xl text-gray-800">
              Cambiar contraseña{" "}
            </h3>
          </div>
          <div>
            <div className="space-y-6">
              <div className="relative">
                <Input
                  type="password"
                  label="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="relative">
                <Input
                  type="password"
                  label="Confirmar contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              <Button
                color="secondary"
                variant="bordered"
                onClick={handleSubmit}
              >
                Cambiar contraseña
              </Button>
              <p>{message}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
