import * as zod from "zod";

export const profileSchema = zod.object({
  user_email: zod
    .string({ required_error: "El correo es obligatorio" })
    .email({ message: "Correo invalido" })
    .max(100, { message: "El correo debe tener menos de 100 caracteres" }),
  user_password: zod
    .string({ required_error: "La contraseña es obligatoria" })
    .min(3, { message: "La contraseña debe tener mínimo 3 caracteres" })
    .max(100, { message: "La contraseña debe tener menos de 100 caracteres" }),
  business_name: zod
    .string({ required_error: "El nombre del negocio es obligatorio" })
    .min(3, { message: "El nombre del negocio debe tener mínimo 3 caracteres" })
    .max(100, {
      message: "El nombre del negocio debe tener menos de 100 caracteres",
    }),
  business_tel: zod
    .string({ required_error: "El telefono del negocio es obligatorio" })
    .min(3, {
      message: "El telefono del negocio debe tener mínimo 3 caracteres",
    })
    .max(100, {
      message: "El telefono del negocio debe tener menos de 100 caracteres",
    }),
  owner_name: zod
    .string({ required_error: "El nombre del propietario es obligatorio" })
    .min(3, {
      message: "El nombre del propietario debe tener mínimo 3 caracteres",
    })
    .max(100, {
      message: "El nombre del propietario debe tener menos de 100 caracteres",
    }),
  owner_surnames: zod
    .string({
      required_error: "Los apellidos del propietario son obligatorios",
    })
    .min(3, {
      message: "Los apellidos del propietario deben tener mínimo 3 caracteres",
    })
    .max(100, {
      message:
        "Los apellidos del propietario deben tener menos de 100 caracteres",
    }),
  org_name: zod
    .string({ required_error: "El nombre de la organizacion es obligatorio" })
    .min(3, {
      message: "El nombre de la organizacion debe tener mínimo 3 caracteres",
    })
    .max(100, {
      message:
        "El nombre de la organizacion debe tener menos de 100 caracteres",
    }),
  org_acro: zod
    .string({ required_error: "El acronimo de la organizacion es obligatorio" })
    .min(3, {
      message: "El acronimo de la organizacion debe tener mínimo 3 caracteres",
    })
    .max(100, {
      message:
        "El acronimo de la organizacion debe tener menos de 100 caracteres",
    }),
  org_cluni: zod
    .string({ required_error: "El cluni de la organizacion es obligatorio" })
    .min(3, {
      message: "El cluni de la organizacion debe tener mínimo 3 caracteres",
    })
    .max(100, {
      message: "El cluni de la organizacion debe tener menos de 100 caracteres",
    }),
  org_rfc: zod
    .string({ required_error: "El rfc de la organizacion es obligatorio" })
    .min(3, {
      message: "El rfc de la organizacion debe tener mínimo 3 caracteres",
    })
    .max(100, {
      message: "El rfc de la organizacion debe tener menos de 100 caracteres",
    }),
  // .refine((value) => /^[a-zA-Z]{3,4}(\d{6})((\D|\d){2,3})?$/.test(value)),
});
