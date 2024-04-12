import { ICliente, INegocio, IProduct } from "@/interfaces";

export interface IOrden {
  id_orden?: number;
  fecha_orden: string;
  hora_orden: string;
  monto_total: number;
  estado_orden: EstadoOrden;

  id_cliente?: number;
  cliente?: ICliente;

  id_historial?: number;

  productoOrden?: IProductoOrden[];

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface IProductoOrden {
  id_productoOrden?: number;
  cantidad_orden: number;
  monto: number;

  id_orden?: number;
  orden?: IOrden;
  
  id_producto: number;
  producto?: IProduct;

  id_negocio: number;
  negocio?: INegocio;

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export enum EstadoOrden {
  PENDIENTE = "PENDIENTE",
  EN_PROCESO = "EN_PROCESO",
  FINALIZADO = "FINALIZADO",
  CANCELADO = "CANCELADO",
}

export interface IMergedOrder {
  id_orden: number;
  orden: IOrden;
  productos: IProductoOrden[];
}
