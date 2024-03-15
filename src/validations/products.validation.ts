import * as zo from "zod";

export const productSchema = zo.object({
  cantidad_producto: zo.string({ required_error: "La cantidad es requerida" }),
  precio_kg: zo.string({ required_error: "El precio es requerido" }),
  fecha_entrada: zo.string({
    required_error: "La fecha de entrada es requerida",
  }),
  fecha_vencimiento: zo.string({
    required_error: "La fecha de vencimiento es requerida",
  }),
});
