import { ICliente, INegocio, IProduct } from "@/interfaces";

export interface IOrden {
  id_orden?: number;
  fecha_orden: string;
  hora_orden: string;
  monto_subtotal: number;
  monto_total: number;
  estado_orden: string;

  id_cliente?: number;
  id_historial?: number;

  cliente?: ICliente;
  productosOrden?: IProductoOrden[];
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
