import * as z from "zod";

export const registerUserDataSchema = z
  .object({
    email: z
      .string({ required_error: "El correo es obligatorio" })
      .email({ message: "Correo invalido" })
      .max(100, { message: "El correo debe tener menos de 100 caracteres" }),
    password: z
      .string({ required_error: "La contraseña es obligatoria" })
      .min(3, { message: "La contraseña debe tener mínimo 3 caracteres" })
      .max(100, {
        message: "La contraseña debe tener menos de 100 caracteres",
      }),
    confirmPassword: z
      .string({
        required_error: "La confirmación de la contraseña es obligatoria",
      })
      .min(3, {
        message:
          "La confirmación de la contraseña debe tener mínimo 3 caracteres",
      })
      .max(100, {
        message:
          "La confirmación de la contraseña debe tener menos de 100 caracteres",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const registerPersonalDataSchema = z.object({
  nombre: z
    .string({ required_error: "El nombre es obligatorio" })
    .min(3, { message: "El nombre debe tener mínimo 3 caracteres" })
    .max(100, { message: "El nombre debe tener menos de 100 caracteres" }),
  apellidos: z
    .string({ required_error: "Los apellidos son obligatorios" })
    .min(3, { message: "Los apellidos deben tener mínimo 3 caracteres" })
    .max(100, { message: "Los apellidos deben tener menos de 100 caracteres" }),
  fecha_nacimiento: z.string({
    required_error: "La fecha de nacimiento es obligatoria",
  }),
  dia_nacimiento: z.string({ required_error: "El día es obligatorio" }),
  mes_nacimiento: z.string({ required_error: "El mes es obligatorio" }),
  year_nacimiento: z.string({ required_error: "El año es obligatorio" }),
  tipo: z.string({ required_error: "El tipo es obligatorio" }),
});

export const registerContactDataSchema = z.object({
  nombreNegocio: z
    .string()
    .min(3, {
      message: "El nombre del negocio debe tener mínimo 3 caracteres",
    })
    .max(100, {
      message: "El nombre del negocio debe tener menos de 100 caracteres",
    }),
  telefono: z
    .string({ required_error: "El telefono es obligatorio" })
    .min(10, { message: "El telefono debe tener mínimo 10 caracteres" })
    .max(10, { message: "El telefono debe tener menos de 10 caracteres" }),
  calle: z
    .string({ required_error: "La calle es obligatoria" })
    .min(3, { message: "La calle debe tener mínimo 3 caracteres" })
    .max(100, { message: "La calle debe tener menos de 100 caracteres" }),
  colonia: z
    .string({ required_error: "La colonia es obligatoria" })
    .min(3, { message: "La colonia debe tener mínimo 3 caracteres" })
    .max(100, { message: "La colonia debe tener menos de 100 caracteres" }),
  alcaldia: z
    .string({ required_error: "La alcaldia es obligatoria" })
    .min(3, { message: "La alcaldia debe tener mínimo 3 caracteres" })
    .max(100, { message: "La alcaldia debe tener menos de 100 caracteres" }),
  cp: z
    .string({ required_error: "El código postal es obligatorio" })
    .min(5, { message: "El código postal debe tener mínimo 5 caracteres" })
    .max(5, { message: "El código postal debe tener menos de 5 caracteres" }),
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
