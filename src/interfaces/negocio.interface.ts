import { IInventario } from "@/interfaces";

export interface INegocio {
  id_negocio?: number;
  nombre_negocio: string;
  direccion_negocio: string;
  telefono_negocio: string;
  email_negocio?: string;

  id_dueneg: number;
  inventario?: IInventario;
}
