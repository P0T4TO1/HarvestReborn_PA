import { INegocio, Estado, ILote } from "@/interfaces";

export interface IPublicacion {
  id_publicacion?: number;

  id_negocio: number;
  negocio: INegocio;

  titulo_publicacion: string;
  descripcion_publicacion: string;
  images_publicacion: string[];

  disponibilidad: Disponibilidad;
  estado_publicacion: Estado;

  lotes?: ILote[];

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

enum Disponibilidad {
  En_venta = "EN_VENTA",
  Donacion = "DONACION",
  Vendido = "VENDIDO",
  Donado = "DONADO",
}
