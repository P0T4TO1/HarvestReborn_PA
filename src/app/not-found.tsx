import Image from "next/image";
import NextLink from "next/link";

export default function Custom404() {
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16 min-h-screen">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="absolute">
            <div className="">
              <h1 className="my-2 text-gray-800 font-bold text-2xl">
                Parece que has encontrado la puerta a la gran nada
              </h1>
              <p className="my-2 text-gray-800">
                ¡Lo lamento! Visite nuestra página de inicio para llegar a donde
                necesita ir.
              </p>
              <NextLink href="/">
                <button className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50">
                  ¡Llévame allí!
                </button>
              </NextLink>
            </div>
          </div>
          <div>
            <Image
              src="https://i.ibb.co/G9DC8S0/404-2.png"
              width={540}
              height={540}
              alt={"bg-404"}
            />
          </div>
        </div>
      </div>
      <div>
        <Image
          src="/images/404Image.png"
          alt={"404"}
          width={540}
          height={540}
        />
      </div>
    </div>
  );
}
