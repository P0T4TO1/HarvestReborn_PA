import { IProduct, IPublicacion } from "@/interfaces";

export interface ILote {
  id_lote: number;
  cantidad_producto: number;
  last_cantidad: number;
  fecha_entrada: string;
  fecha_vencimiento: string;
  precio_kg: number;
  last_precio_kg: number;
  monto_total: number;
  last_monto_total: number;

  disponibilidad: Disponibilidad;
  estado_lote: EstadoLote;

  id_inventario: number;

  id_producto: number;
  producto: IProduct;

  id_proveedor?: number;

  id_publicacion?: number;
  publicacion?: IPublicacion;
}

export interface IMergedLote {
  id_lote: number;
  cantidad_producto: number;
  fecha_entrada: string;
  fecha_vencimiento: string;
  precio_kg: number;
  monto_total: number;

  producto: IProduct;
}

export enum Disponibilidad {
  en_venta = "FOR_SALE",
  donacion = "FOR_DONATION",
}

export enum EstadoLote {
  Activo = "ACTIVO",
  Vendido = "VENDIDO",
  Vencido = "VENCIDO",
  Terminado = "TERMINADO",
}
