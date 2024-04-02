import { IPreguntasFaq } from "@/interfaces";

export interface IRespuestasFaq {
  id_faqRespuesta: number;
  id_prefrec: number;
  respuesta: string;

  pregunta: IPreguntasFaq;
}
