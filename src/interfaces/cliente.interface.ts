import { IUser } from "@/interfaces";

export interface ICliente {
  id_cliente?: string;
  nombre_cliente: string;
  apellidos_cliente: string;
  telefono_cliente: string;
  fecha_nacimiento: string;
  nombre_negocio?: string;
  direccion_negocio?: string;

  id_user: string;
}
