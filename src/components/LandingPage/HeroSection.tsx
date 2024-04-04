"use client";

import { FC } from "react";
import { Image, Button, Link } from "@nextui-org/react";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components";

export const DescriptionComponent: FC = () => {
  return (
    <HeroHighlight>
      <div className="text-center lg:text-start space-y-6">
        <div className="text-5xl md:text-6xl font-bold">
          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug flex flex-col"
          >
            UNIDOS
            <Highlight className="text-black dark:text-white max-w-fit">
              DESPERDICIAMOS MENOS
            </Highlight>
          </motion.h1>
          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="text-sm sm:text-base lg:text-lg font-semibold text-gray-700 mt-4 sm:mt-6 w-1/2 px-4"
          >
            El lugar donde tú y tu negocio ayuda a reducir el desperdicio de
            frutas y verduras en la Ciudad de México
          </motion.p>
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="space-y-4 md:space-y-0 md:space-x-4 px-4"
          >
            <Button className="w-full md:w-1/3">Get Started</Button>
            <Button className="w-full md:w-1/3">Get Started</Button>
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="z-10"
      >
        <Image
          src="/images/hero-1.png"
          alt="Hero Highlight"
          width={500}
          height={500}
        />
      </motion.div>
    </HeroHighlight>
  );
};
