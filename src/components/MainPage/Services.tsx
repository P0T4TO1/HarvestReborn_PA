"use client";

import { FC } from "react";

export const ServicesComponent: FC = () => {
  return (
    <>
      <section
        className="px-4 py-36 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-36"
        id="servicios"
      >
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div>
            <p className="inline-block px-3 py-px mb-4 text-xs font-bold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
              Harvest Reborn
            </p>
          </div>
          <h3 className="max-w-lg mb-6 font-sans text-4xl font-bold leading-none tracking-tight text-gray-900 md:mx-auto">
            La mejor forma de darle una segunda vida a tus productos
          </h3>
        </div>
        <div className="grid gap-8 row-gap-10 lg:grid-cols-2">
          <div className="max-w-md sm:mx-auto sm:text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto">
              <span className="material-symbols-outlined">handshake</span>
            </div>
            <h6 className="mb-3 text-xl font-bold leading-5">
              Intermediación entre Recauderías y Clientes
            </h6>
            <p className="mb-3 text-sm text-gray-900">
              Facilitamos la conexión entre recauderías locales con clientes,
              restaurantes, fondas o comedores para asegurar que los alimentos
              excedentes lleguen a quienes más los necesitan.
            </p>
          </div>
          <div className="max-w-md sm:mx-auto sm:text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto">
              <span className="material-symbols-outlined">box_add</span>
            </div>
            <h6 className="mb-3 text-xl font-bold leading-5">
              Publicación de Productos para donación
            </h6>
            <p className="mb-3 text-sm text-gray-900">
              Las recauderías pueden publicar los productos disponibles para
              donación, para que los clientes puedan solicitarlos, ponerse en
              contacto y acordar la entrega.
            </p>
          </div>
          <div className="max-w-md sm:mx-auto sm:text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto">
              <span className="material-symbols-outlined">move_to_inbox</span>
            </div>
            <h6 className="mb-3 text-xl font-bold leading-5">
              Pedidos a recauderías
            </h6>
            <p className="mb-3 text-sm text-gray-900">
              Los clientes pueden realizar pedidos a las recauderías locales
              como si se tratara de un mercado en línea, ponerse en contacto y
              acordar la entrega, lo que facilita la adquisición de productos de
              calidad.
            </p>
          </div>
          <div className="max-w-md sm:mx-auto sm:text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto">
              <span className="material-symbols-outlined">quick_reorder</span>
            </div>
            <h6 className="mb-3 text-xl font-bold leading-5">
              Gestión de Inventarios
            </h6>
            <p className="mb-3 text-sm text-gray-900">
              Las recauderías pueden llevar un seguimiento de su inventario y
              donaciones a través de nuestra plataforma, asi ayudamos a
              facilitar la organización y el control de sus productos.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
