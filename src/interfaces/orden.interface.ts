import { ICliente, INegocio, IProduct } from "@/interfaces";

export interface IOrden {
  id_orden?: number;
  fecha_orden: string;
  hora_orden: string;
  monto_total: number;
  estado_orden: EstadoOrden;

  id_cliente?: number;
  id_historial?: number;

  cliente?: ICliente;
  productoOrden?: IProductoOrden[];
}

export interface IProductoOrden {
  id_productoOrden?: number;
  cantidad_orden: number;
  monto: number;

  id_orden?: number;
  id_producto: number;
  id_negocio: number;

  producto?: IProduct;
  orden?: IOrden;
  negocio?: INegocio;
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
