import { NegocioProducts } from "@/components";

const NegocioInfoPage = async () => {
  return (
    <>
      <section className="flex flex-col relative overflow-hidden min-h-screen">
        <NegocioProducts />
      </section>
    </>
  );
};

export default NegocioInfoPage;