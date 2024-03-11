import { IDuenoNegocio, ICliente, INegocio } from "@/interfaces";

export interface IUser {
  id: string;
  email: string;
  password: string;
  id_rol: number;

  estado: Estado;

  negocio?: INegocio;
  dueneg?: IDuenoNegocio;
  cliente?: ICliente;
}

export enum Estado {
  Activo = "Activo",
  Inactivo = "Inactivo",
}
