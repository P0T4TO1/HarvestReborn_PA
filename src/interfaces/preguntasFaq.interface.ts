export interface IPreguntasFaq {
  id_prefrec: number;
  pregunta: string;
  respuestas: string[];
  tipo: TipoPregunta;
}

export enum TipoPregunta {
  General = "GENERAL",
  Cuenta = "CUENTA",
  Negocio = "NEGOCIO",
  Cliente = "CLIENTE",
  Duenonegocio = "DUENONEGOCIO",
  Orden = "ORDEN",
  Productos = "PRODUCTOS",
  Inventario = "INVENTARIO",
  Chat = "CHAT",
}
