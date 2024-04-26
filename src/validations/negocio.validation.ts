import { z } from "zod";

export const negocioGeneralDataSchema = z.object({
  nombre_negocio: z
    .string({
      required_error: "El nombre del negocio es requerido",
    })
    .min(3, {
      message: "El nombre del negocio debe tener al menos 3 caracteres",
    })
    .max(255, {
      message: "El nombre del negocio debe tener menos de 255 caracteres",
    }),
  direccion_negocio: z
    .string({
      required_error: "La dirección del negocio es requerida",
    })
    .min(3, {
      message: "La dirección del negocio debe tener al menos 3 caracteres",
    })
    .max(255, {
      message: "La dirección del negocio debe tener menos de 255 caracteres",
    }),
  calle: z
    .string({
      required_error: "La calle es requerida",
    })
    .min(3, {
      message: "La calle debe tener al menos 3 caracteres",
    })
    .max(255, {
      message: "La calle debe tener menos de 255 caracteres",
    }),
  colonia: z
    .string({
      required_error: "La colonia es requerida",
    })
    .min(3, {
      message: "La colonia debe tener al menos 3 caracteres",
    })
    .max(255, {
      message: "La colonia debe tener menos de 255 caracteres",
    }),
  alcaldia: z
    .string({
      required_error: "La alcaldía es requerida",
    })
    .min(3, {
      message: "La alcaldía debe tener al menos 3 caracteres",
    })
    .max(255, {
      message: "La alcaldía debe tener menos de 255 caracteres",
    }),
  cp: z
    .string({
      required_error: "El código postal es requerido",
    })
    .min(3, {
      message: "El código postal debe tener al menos 3 caracteres",
    })
    .max(255, {
      message: "El código postal debe tener menos de 255 caracteres",
    }),
  telefono_negocio: z
    .string({
      required_error: "El teléfono del negocio es requerido",
    })
    .min(3, {
      message: "El teléfono del negocio debe tener al menos 3 caracteres",
    })
    .max(255, {
      message: "El teléfono del negocio debe tener menos de 255 caracteres",
    }),
  email_negocio: z.string().optional(),
});

export const negocioDescriptionSchema = z.object({
  descripcion_negocio: z
    .string({
      required_error: "La descripción del negocio es requerida",
    })
    .min(3, {
      message: "La descripción del negocio debe tener al menos 3 caracteres",
    })
    .max(255, {
      message: "La descripción del negocio debe tener menos de 255 caracteres",
    }),
});

export const negocioImagesSchema = z.object({
  images_negocio: z.array(z.string()).optional(),
});

export const postValidationSchema = z.object({
  images_publicacion: z.array(z.string()),
  titulo_publicacion: z.string(),
  descripcion_publicacion: z.string(),
  price: z.number().optional(),
  disponibilidad: z.string(),
});
