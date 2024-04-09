import { IProduct } from "@/interfaces/product.interface";

export interface ILote {
  id_lote: number;
  cantidad_producto: number;
  fecha_entrada: string;
  fecha_vencimiento: string;
  precio_kg: number;
  monto_total: number;

  id_inventario: number;
  id_producto: number;
  id_proveedor?: number;

  producto: IProduct;
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
