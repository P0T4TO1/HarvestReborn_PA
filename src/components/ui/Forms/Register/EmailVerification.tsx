"use client";

import React from "react";
import { Image, Card, CardBody } from "@nextui-org/react";

export const EmailVerificationForm = () => {
  return (
    <section className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent">
      <div className="flex justify-center self-center z-10">
        <Card className="w-full max-w-md p-6">
          <CardBody className="mb-7">
            <Image
              src={"/images/buzon_email.png"}
              alt="Email Verification"
              className="w-20 h-20 mx-auto"
            />
            <h3 className="font-semibold text-2xl text-gray-800">
              Revise su correo electrónico{" "}
            </h3>
            <p className="text-gray-500 text-sm mt-4">
              Hemos enviado un correo electrónico a su dirección de correo
              electrónico. Haga clic en el enlace de verificación para verificar
              su cuenta.
            </p>
          </CardBody>
        </Card>
      </div>
    </section>
  );
};
