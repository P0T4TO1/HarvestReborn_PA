"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Select,
  SelectItem,
  Link,
} from "@nextui-org/react";
import { IOrden, ILote } from "@/interfaces";
import { FaRegCheckCircle } from "react-icons/fa";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

interface ReportsSectionProps {
  orders: IOrden[];
  lotes: ILote[];
}

export const ReportsSection = ({ orders, lotes }: ReportsSectionProps) => {
  console.log(lotes);
  return (
    <div className="pt-8 container mx-auto p-4">
      <div>
        <h1 className="text-2xl font-black flex flex-col leading-none dark:text-green-600 text-green-900">
          Reportes
        </h1>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <div className="md:col-span-2">
          <h2 className="text-xl font-medium">Pedidos</h2>
          <div className="flex flex-wrap gap-4 mt-5">
            <Card
              className="p-4"
              shadow="sm"
              classNames={{
                base: "border border-green-500",
              }}
            >
              <CardBody>
                <p className="text-green-600 font-semibold text-2xl text-center">
                  {
                    orders.filter(
                      (order) => order.estado_orden === "FINALIZADO"
                    ).length
                  }
                </p>
              </CardBody>
              <CardFooter>
                <FaRegCheckCircle size={21} />
                <span>Finalizados</span>
              </CardFooter>
            </Card>
            <Card
              className="p-4"
              shadow="sm"
              classNames={{
                base: "border border-blue-500",
              }}
            >
              <CardBody>
                <p className="text-blue-600 font-semibold text-2xl text-center">
                  {
                    orders.filter(
                      (order) => order.estado_orden === "EN_PROCESO"
                    ).length
                  }
                </p>
              </CardBody>
              <CardFooter>
                <FaRegCheckCircle size={21} />
                <span>En proceso</span>
              </CardFooter>
            </Card>
            <Card
              className="p-4"
              shadow="sm"
              classNames={{
                base: "border border-yellow-500",
              }}
            >
              <CardBody>
                <p className="text-yellow-600 font-semibold text-2xl text-center">
                  {
                    orders.filter((order) => order.estado_orden === "PENDIENTE")
                      .length
                  }
                </p>
              </CardBody>
              <CardFooter>
                <FaRegCheckCircle size={21} />
                <span>Pendientes</span>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-medium">Lotes</h2>
          <div className="flex flex-col gap-4 mt-5">
            <Card
              shadow="sm"
              classNames={{
                base: "border border-gray-400",
              }}
            >
              <CardBody>
                <div className="flex justify-between">
                  <p className="text-default-500 text-lg text-center">
                    Total de lotes
                  </p>
                  <p className="text-default-600 font-semibold text-lg text-center">
                    {lotes.length}
                  </p>
                </div>
              </CardBody>
            </Card>
            <Card
              shadow="sm"
              classNames={{
                base: "border border-gray-400",
              }}
            >
              <CardBody>
                <div className="flex justify-between">
                  <p className="text-default-500 text-lg text-center">
                    Lotes en buen estado
                  </p>
                  <p className="text-default-600 font-semibold text-lg text-center">
                    {
                      lotes.filter((lote) => lote.estado_lote === "ACTIVO")
                        .length
                    }
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card
            shadow="sm"
            classNames={{
              base: "border border-gray-300",
            }}
          >
            <CardHeader>
              <p className="text-lg font-semibold">Productos</p>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between">
                    <p className="text-default-500 text-lg text-center">
                      Total de lotes
                    </p>
                    <p className="text-default-600 font-semibold text-lg text-center">
                      {lotes.length}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-default-500 text-lg text-center">
                      Lotes en buen estado
                    </p>
                    <p className="text-default-600 font-semibold text-lg text-center">
                      {
                        lotes.filter((lote) => lote.estado_lote === "ACTIVO")
                          .length
                      }
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-yellow-500 text-lg text-center">
                      Lotes apunto de vencer
                    </p>
                    <p className="text-yellow-600 font-semibold text-lg text-center">
                      {
                        lotes.filter((lote) => {
                          new Date(lote.fecha_vencimiento) <
                            new Date(
                              new Date().setDate(new Date().getDate() + 7)
                            );
                        }).length
                      }
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-red-500 text-lg text-center">
                      Lotes vencidos
                    </p>
                    <p className="text-red-600 font-semibold text-lg text-center">
                      {
                        lotes.filter((lote) => lote.estado_lote === "VENCIDO")
                          .length
                      }
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-lg font-semibold">Lotes en buen estado</p>
                  <Gauge
                    width={100}
                    height={100}
                    innerRadius="65%"
                    value={
                      lotes.filter((lote) => lote.estado_lote === "ACTIVO")
                        .length
                    }
                    valueMax={lotes.length}
                    text={({ value, valueMax }) => `${value} / ${valueMax}`}
                    sx={() => ({
                      [`& .${gaugeClasses.valueArc}`]: {
                        fill: "#16A34A",
                      },
                    })}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
          <Card
            shadow="sm"
            classNames={{
              base: "border border-gray-300",
            }}
          >
            <CardHeader>
              <div className="w-full flex justify-between">
                <p className="text-lg font-semibold">Prodcutos más pedidos</p>
                <div>
                  <Select
                    placeholder="Seleccionar"
                    size="sm"
                    className="w-40"
                    selectedKeys={"3"}
                  >
                    <SelectItem key="1" value="1">
                      Hoy
                    </SelectItem>
                    <SelectItem key="2" value="2">
                      Esta semana
                    </SelectItem>
                    <SelectItem key="3" value="3">
                      Este mes
                    </SelectItem>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="flex gap-2">
                
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
