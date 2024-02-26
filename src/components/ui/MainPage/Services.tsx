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
              Intermediación entre Recauderías y Organizaciones Benéficas
            </h6>
            <p className="mb-3 text-sm text-gray-900">
              Facilitamos la conexión entre recauderías locales y organizaciones
              benéficas para asegurar que los alimentos excedentes lleguen a
              quienes más los necesitan.
            </p>
            <a
              href="/"
              aria-label=""
              className="inline-flex items-center font-semibold transition-colors duration-200 text-gray-800 hover:text-green-600"
            >
              Learn more
            </a>
          </div>
          <div className="max-w-md sm:mx-auto sm:text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto">
              <span className="material-symbols-outlined">box_add</span>
            </div>
            <h6 className="mb-3 text-xl font-bold leading-5">
              Publicación de Donaciones Disponibles
            </h6>
            <p className="mb-3 text-sm text-gray-900">
              Las recauderías pueden publicar los productos disponibles para
              donación, lo que permite a las organizaciones benéficas ver y
              solicitar los alimentos que necesitan.
            </p>
            <a
              href="/"
              aria-label=""
              className="inline-flex items-center font-semibold transition-colors duration-200 text-gray-800 hover:text-green-600"
            >
              Learn more
            </a>
          </div>
          <div className="max-w-md sm:mx-auto sm:text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto">
              <span className="material-symbols-outlined">move_to_inbox</span>
            </div>
            <h6 className="mb-3 text-xl font-bold leading-5">
              Solicitud de Donaciones
            </h6>
            <p className="mb-3 text-sm text-gray-900">
              Las organizaciones benéficas pueden solicitar donaciones
              específicas de productos frescos a las recauderías, ayudando a
              satisfacer las necesidades de sus comunidades.
            </p>
            <a
              href="/"
              aria-label=""
              className="inline-flex items-center font-semibold transition-colors duration-200 text-gray-800 hover:text-green-600"
            >
              Learn more
            </a>
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
              donaciones a través de nuestra plataforma, lo que facilita la
              organización y el control de los productos disponibles.
            </p>
            <a
              href="/"
              aria-label=""
              className="inline-flex items-center font-semibold transition-colors duration-200 text-gray-800 hover:text-green-600"
            >
              Learn more
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
