import { NegocioInfo } from "@/components";

const NegocioInfoPage = async () => {
  return (
    <>
      <section className="flex flex-col relative overflow-hidden min-h-screen">
        <NegocioInfo />
      </section>
    </>
  );
};

export default NegocioInfoPage;