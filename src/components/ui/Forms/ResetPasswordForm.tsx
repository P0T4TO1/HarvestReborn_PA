"use client";

import React, { useState } from "react";
import { hrApi } from "@/api";
import { Input, Button } from "@nextui-org/react";

export const ResetPasswordForm = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async () => {
    if (!email) {
      setError("El correo electrónico es requerido");
      return;
    } else {
      setError("");
    }
    const response = await hrApi.post("user/reset-password", { email });
    setTimeout(() => {
      setMessage(response.data.message);
    }, 2000);
    setMessage("Enviando correo electrónico..")
  };

  return (
    <section className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent">
      <div className="flex justify-center self-center z-10 shadow-xl">
        <div className="p-12 bg-white mx-auto rounded-3xl w-[386px]">
          <div className="mb-7">
            <h3 className="font-semibold text-2xl text-gray-800">
              Restablecer contraseña{" "}
            </h3>
            <p className="text-gray-500 text-sm mt-4">
              Ingrese su dirección de correo electrónico y le enviaremos un
              enlace para restablecer su contraseña.
            </p>
          </div>
          <div>
            <div className="space-y-6">
              <div className="relative">
                <Input
                  type="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              <Button
                color="secondary"
                variant="bordered"
                onClick={handleSubmit}
              >
                Restablecer contraseña
              </Button>
              <p>{message}</p>
              <p className="text-gray-500 text-sm mt-4">
                Si no encuentra el correo es posible que este en la sección de
                spam(correo no deseado)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
