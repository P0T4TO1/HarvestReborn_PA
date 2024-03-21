"use client";

import { FC, useState, ReactNode } from "react";
import { ILote } from "@/interfaces";
import {
  Card,
  CardBody,
  Image,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";

interface Props {
  children: ReactNode;
  lote?: ILote;
  lotes?: ILote[];
}

export const ProductInventoryCard: FC<Props> = ({ lote, lotes, children }) => {
  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-h-[250px]"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <Image
              alt="Album cover"
              className="object-cover"
              height="100%"
              shadow="md"
              src={lote?.producto.imagen_producto}
              width={200}
            />
          </div>
          <div className="relative">
            <div>{lote?.producto.nombre_producto}</div>
            <div className="mt-4 flex flex-col">
              {lotes?.map(
                (loteMap) =>
                  loteMap.id_producto === lote?.id_producto && (
                    <Accordion key={loteMap.id_lote}>
                      <AccordionItem
                        title={
                          <div className="flex flex-row justify-between">
                            <div>
                              {loteMap?.fecha_entrada
                                .split("T")[0]
                                .split("-")
                                .reverse()
                                .join(" del ")
                                .slice(0, 20)}
                            </div>
                          </div>
                        }
                      >
                        <div className="flex flex-col">
                          <div className="text-sm">Cantidad</div>
                          <div>{loteMap?.cantidad_producto}</div>
                        </div>
                        <div className="flex flex-col">
                          <div className="text-sm">Fecha de vencimiento</div>
                          <div>
                            {loteMap?.fecha_vencimiento
                              .split("T")[0]
                              .split("-")
                              .reverse()
                              .join(" del ")
                              .slice(0, 20)}
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="text-sm">Precio por Kg</div>
                          <div>{loteMap?.precio_kg}</div>
                        </div>
                        <div className="flex flex-col">
                          <div className="text-sm">Precio total</div>
                          <div>{loteMap?.monto_total}</div>
                        </div>
                        <div className="flex flex-col">{children}</div>
                      </AccordionItem>
                    </Accordion>
                  )
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
