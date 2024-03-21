import { z } from "zod";

export const profileSchema = z.object({
  email: z
    .string()
    .email({ message: "Correo invalido" })
    .max(100, { message: "El correo debe tener menos de 100 caracteres" }),
  password: z
    .string({ required_error: "La contraseña es obligatoria" })
    .min(3, { message: "La contraseña debe tener mínimo 3 caracteres" })
    .max(100, { message: "La contraseña debe tener menos de 100 caracteres" }),
  nombre_dueneg: z
    .string()
    .min(3, { message: "El nombre debe tener mínimo 3 caracteres" })
    .max(100, {
      message: "El nombre debe tener menos de 100 caracteres",
    }),
  apellidos_dueneg: z
    .string()
    .min(3, {
      message: "Los apellidos deben tener mínimo 3 caracteres",
    })
    .max(100, {
      message: "Los apellidos deben tener menos de 100 caracteres",
    }),
  dia_nacimiento_d: z
    .string()
    .min(2, {
      message: "El dia de nacimiento debe tener mínimo 2 caracteres",
    })
    .max(2, {
      message: "El dia de nacimiento debe tener menos de 2 caracteres",
    }),
  mes_nacimiento_d: z
    .string()
    .min(3, {
      message: "El mes de nacimiento debe contener minimo 3 caracteres",
    })
    .max(20, {
      message: "El nombre del propietario debe tener menos de 20 caracteres",
    }),
  year_nacimiento_d: z
    .string()
    .min(4, {
      message: "El año debe tener minimo 4 caracteres",
    })
    .max(4, {
      message: "El nombre del propietario debe tener menos de 4 caracteres",
    }),
  nombre_negocio_d: z
    .string()
    .min(3, {
      message: "El nombre del negocio debe tener mínimo 3 caracteres",
    })
    .max(100, {
      message: "El nombre del negocio debe tener menos de 100 caracteres",
    }),
  calle_d: z
    .string()
    .min(3, {
      message: "La calle debe tener mínimo 3 caracteres",
    })
    .max(100, {
      message: "La calle debe tener menos de 100 caracteres",
    }),
  colonia_d: z
    .string()
    .min(3, {
      message: "La colonia debe tener mínimo 3 caracteres",
    })
    .max(100, {
      message: "La colonia debe tener menos de 100 caracteres",
    }),
  cp_d: z
    .string()
    .min(3, {
      message: "El codigo postal debe tener mínimo 3 caracteres",
    })
    .max(100, {
      message: "El codigo postal debe tener menos de 100 caracteres",
    }),
  telefono_negocio_d: z
    .string()
    .min(10, {
      message: "El telefono debe tener mínimo 10 caracteres",
    })
    .max(10, {
      message: "El telefono debe tener menos de 10 caracteres",
    }),
  email_negocio: z
    .string()
    .email({ message: "Correo invalido" })
    .max(100, { message: "El correo debe tener menos de 100 caracteres" }),

  nombre_cliente: z
    .string()
    .min(3, { message: "El nombre debe tener mínimo 3 caracteres" })
    .max(100, {
      message: "El nombre debe tener menos de 100 caracteres",
    }),
  apellidos_cliente: z
    .string()
    .min(3, {
      message: "Los apellidos deben tener mínimo 3 caracteres",
    })
    .max(100, {
      message: "Los apellidos deben tener menos de 100 caracteres",
    }),
  telefono_cliente: z
    .string()
    .min(10, {
      message: "El telefono debe tener mínimo 10 caracteres",
    })
    .max(10, {
      message: "El telefono debe tener menos de 10 caracteres",
    }),
  dia_nacimiento_c: z
    .string()
    .min(2, {
      message: "El dia de nacimiento debe tener mínimo 2 caracteres",
    })
    .max(2, {
      message: "El dia de nacimiento debe tener menos de 2 caracteres",
    }),
  mes_nacimiento_c: z
    .string()
    .min(3, {
      message: "El mes de nacimiento debe contener minimo 3 caracteres",
    })
    .max(20, {
      message: "El nombre del propietario debe tener menos de 20 caracteres",
    }),
  year_nacimiento_c: z
    .string()
    .min(4, {
      message: "El año debe tener minimo 4 caracteres",
    })
    .max(4, {
      message: "El nombre del propietario debe tener menos de 4 caracteres",
    }),
  nombre_negocio_c: z
    .string()
    .min(3, {
      message: "El nombre del negocio debe tener mínimo 3 caracteres",
    })
    .max(100, {
      message: "El nombre del negocio debe tener menos de 100 caracteres",
    }),
  calle_c: z
    .string()
    .min(3, {
      message: "La calle debe tener mínimo 3 caracteres",
    })
    .max(100, {
      message: "La calle debe tener menos de 100 caracteres",
    }),
  colonia_c: z
    .string()
    .min(3, {
      message: "La colonia debe tener mínimo 3 caracteres",
    })
    .max(100, {
      message: "La colonia debe tener menos de 100 caracteres",
    }),
  cp_c: z
    .string()
    .min(3, {
      message: "El codigo postal debe tener mínimo 3 caracteres",
    })
    .max(100, {
      message: "El codigo postal debe tener menos de 100 caracteres",
    }),
});

export const accountSchema = z
  .object({
    oldPassword: z.string().optional(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
