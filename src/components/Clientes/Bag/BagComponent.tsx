"use client";

import { BagList } from "@/components";
import { useRouter } from "next/navigation";
import React, { useEffect, useContext } from "react";
import { BagContext } from "@/context/order";
import { CircularProgress } from "@nextui-org/react";

export const BagPageComponent = () => {
  const { isLoaded, bag } = useContext(BagContext);
  const router = useRouter();

  useEffect(() => {
    if (
      (isLoaded && bag.map((item) => item.productos.length === 0)) ||
      bag.length === 1
    )
      router.push("/bag/empty");
  }, [bag, isLoaded, router]);

  if (!isLoaded && bag.map((item) => item.productos.length === 0) || bag.length === 1)
    return (
      <>
        <div className="flex items-center justify-center m-auto">
          <CircularProgress size="lg" />
        </div>
      </>
    );

  return (
    <>
      <section className="flex flex-col relative overflow-hidden min-h-screen">
        <BagList editable />
      </section>
    </>
  );
};
