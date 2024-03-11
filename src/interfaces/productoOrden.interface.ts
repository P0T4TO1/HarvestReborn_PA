export interface IProductoOrden {
  id_productoOrden?: number;
  cantidad_orden: number;
  monto_subtotal: number;
  monto_total: number;

  id_orden: number;
  id_producto: number;
  id_negocio: number;
}
