import { IDuenoNegocio, ICliente, INegocio } from "@/interfaces";

export interface IUser {
  id: string;
  email: string;
  password: string;
  id_rol: number;
  nombre?: string;
  apellidos?: string;
  oAuthId?: string;

  emailVerified: boolean;
  estado: Estado;

  negocio?: INegocio;
  duenonegocio?: IDuenoNegocio;
  cliente?: ICliente;
}

export enum Estado {
  Activo = "ACTIVO",
  Inactivo = "INACTIVO",
  Pendiente = "PENDIENTE",
}
