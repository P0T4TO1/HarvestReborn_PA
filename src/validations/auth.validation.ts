import * as z from "zod";

export const registerBusinessSchema = z.object({
  owner_name: z
    .string({ required_error: "El nombre es obligatorio" })
    .min(3, { message: "El nombre debe tener mínimo 3 caracteres" })
    .max(100, { message: "El nombre debe tener menos de 100 caracteres" })
    .refine(
      (value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value),
      "Ingrese solo caracteres del alfabeto"
    ),
  owner_surnames: z
    .string({ required_error: "Este campo es obligatorio" })
    .min(3, { message: "Este dato debe tener mínimo 3 caracteres" })
    .max(100, { message: "Este dato debe tener menos de 100 caracteres" }),
  business_name: z
    .string({ required_error: "Este campo es obligatorio" })
    .min(3, { message: "Este dato debe tener mínimo 3 caracteres" })
    .max(100, { message: "Este dato debe tener menos de 100 caracteres" }),
  business_tel: z
    .string({ required_error: "El teléfono es obligatorio" })
    .min(10, { message: "El numero telefónico tener mínimo 10 números" })
    .max(10, { message: "El numero telefónico debe tener máximo 10 números" }),
  business_email: z
    .string({ required_error: "El correo es obligatorio" })
    .email({ message: "Correo invalido" })
    .max(100, { message: "El correo debe tener menos de 100 caracteres" }),
  business_pass: z
    .string({ required_error: "La contraseña es obligatoria" })
    .min(3, { message: "La contraseña debe tener mínimo 3 caracteres" })
    .max(100, { message: "La contraseña debe tener menos de 100 caracteres" }),
});

export const registerOrganizationSchema = z.object({
  org_name: z
    .string({ required_error: "El nombre es requerido" })
    .min(3, { message: "El nombre debe tener mínimo 3 caracteres" })
    .max(100, { message: "El nombre debe tener menos de 100 caracteres" })
    .refine(
      (value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value),
      "Ingrese solo caracteres del alfabeto"
    ),
  org_acro: z
    .string({ required_error: "Este campo es obligatorio" })
    .min(3, { message: "Este dato debe tener mínimo 3 caracteres" })
    .max(10, { message: "Este dato debe tener máximo 10 caracteres" }),
  org_cluni: z
    .string({ required_error: "Este campo es obligatorio" })
    .min(3, { message: "Este dato debe tener mínimo 3 caracteres" })
    .max(20, { message: "Este dato debe tener máximo 20 caracteres" }),
  org_rfc: z
    .string({ required_error: "Este campo es obligatorio" })
    .min(13, { message: "Este dato debe tener mínimo 13 caracteres" })
    .max(13, { message: "Este dato debe tener máximo 13 caracteres" }),
  // .refine((value) => /^[a-zA-Z]{3,4}(\d{6})((\D|\d){2,3})?$/.test(value)),
  org_tel: z
    .string({ required_error: "El teléfono es obligatorio" })
    .min(10, { message: "El numero telefónico tener mínimo 10 números" })
    .max(10, { message: "El numero telefónico debe tener máximo 10 números" }),
  org_email: z
    .string({ required_error: "El correo es obligatorio" })
    .email({ message: "Correo invalido" })
    .max(100, { message: "El correo debe tener menos de 100 caracteres" }),
  org_pass: z
    .string({ required_error: "La contraseña es obligatoria" })
    .min(3, { message: "La contraseña debe tener mínimo 3 caracteres" })
    .max(100, { message: "La contraseña debe tener menos de 100 caracteres" }),
});

export const loginSchema = z.object({
  user_email: z
    .string({ required_error: "El correo es obligatorio" })
    .email({ message: "Correo invalido" })
    .max(100, { message: "El correo debe tener menos de 100 caracteres" }),
  user_password: z
    .string({ required_error: "La contraseña es obligatoria" })
    .min(3, { message: "La contraseña debe tener mínimo 3 caracteres" })
    .max(100, { message: "La contraseña debe tener menos de 100 caracteres" }),
});
