import { INegocio } from "@/interfaces";

export interface IDuenoNegocio {
  id_dueneg?: number;
  nombre_dueneg: string;
  apellidos_dueneg: string;
  fecha_nacimiento: string;

  id_user: string;
  negocio: INegocio;
}
