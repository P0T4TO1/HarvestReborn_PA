import { NegocioProducts } from "@/components";

interface NegocioInfoPageProps {
  params: {
    id: number;
    name: string;
  };
}
const NegocioInfoPage = async ({ params }: NegocioInfoPageProps) => {
  const { id, name } = params;
  return (
    <>
      <section className="flex flex-col relative overflow-hidden min-h-screen">
        <NegocioProducts id_negocio={id} nombre_negocio={name} />
      </section>
    </>
  );
};

export default NegocioInfoPage;
