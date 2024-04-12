import { z } from "zod";

export const productSchema = z.object({
  cantidad_producto: z.number({ required_error: "La cantidad es requerida", invalid_type_error: "La cantidad debe ser un número"}),
  precio_kg: z.number({ required_error: "El precio es requerido", invalid_type_error: "El precio debe ser un número"}),
  fecha_entrada: z.string({
    required_error: "La fecha de entrada es requerida",
  }),
  fecha_vencimiento: z.string({
    required_error: "La fecha de vencimiento es requerida",
  }),
});
