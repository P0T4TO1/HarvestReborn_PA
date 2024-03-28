import { Estado, IDuenoNegocio, IInventario } from "@/interfaces";

export interface INegocio {
  id_negocio?: number;
  nombre_negocio: string;
  direccion_negocio: string;
  telefono_negocio: string;
  email_negocio?: string;
  images_negocio: string[];
  descripcion_negocio?: string;

  estado_negocio: Estado;

  id_dueneg: number;
  dueneg: IDuenoNegocio;
  inventario?: IInventario;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
