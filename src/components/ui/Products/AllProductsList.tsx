import { FC, useContext, useEffect, useState } from "react";

import { Product } from "@/interfaces";
import { hrApi } from "@/api";

export const AllProductsList = () => {
  return (
    <div className="container pt-16 px-16">
      <h1 className="font-bebas-neue uppercase text-4xl font-black flex flex-col leading-none text-green-900">
        Todos los productos registrados
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        Sustituir por el código de la lista de productos
      </div>
    </div>
  );
};
