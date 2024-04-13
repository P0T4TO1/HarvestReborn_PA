"use client";

import { Button, Card, CardBody } from "@nextui-org/react";
import React from "react";
import { useRouter } from "next/navigation";

export const EmailVerified = () => {
  const router = useRouter();
  const navigateToLogin = () => {
    router.push("/auth/login");
  };
  return (
    <section className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent">
      <div className="flex justify-center self-center z-10 shadow-xl">
        <Card className="w-full max-w-md p-6">
          <CardBody className="mb-7">
            <h3 className="font-semibold text-2xl text-gray-800">
              Tú cuenta ha sido verificada{" "}
            </h3>
            <p className="text-gray-500 text-sm mt-4">
              Gracias por verificar tu cuenta. Ahora puedes disfrutar de todos
              los beneficios de nuestra aplicación.
            </p>
            <Button
              color="primary"
              className="w-full mt-6"
              onClick={navigateToLogin}
            >
              Iniciar sesión
            </Button>
          </CardBody>
        </Card>
      </div>
    </section>
  );
};
