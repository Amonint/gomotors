"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const ReferenteGo = () => {
  const containerRef = useRef(null);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -30]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Line animation
  const lineExpand = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
    },
  };

  // Steps staggered animation
  const stepsContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const stepItem = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-neutral-100 overflow-hidden" ref={containerRef}>
      <div className="w-full bg-[#F5F5F5] border-b border-neutral-300">
        <div className="max-w-[1600px] mx-auto px-6 py-12 md:py-16 lg:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleIn}
            className="flex flex-col items-center md:flex-row md:items-end md:justify-between"
          >
            <div className="relative h-32 w-72 mb-8 md:mb-0">
              <Image
                src="/images/referenteGo/logoreferente.png"
                alt="Referente GO Logo"
                fill
                style={{ objectFit: "contain" }}
                priority
                className="brightness-0 invert-0 contrast-100"
              />
            </div>

            <div className="text-right">
              <h2 className="text-lg md:text-xl font-light text-neutral-600 tracking-wide">
                Programa de Referidos
              </h2>
              <h3 className="text-2xl md:text-3xl font-normal text-neutral-800 mt-2">
                ¡Recomienda, comparte y gana!
              </h3>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[1600px] mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-12 gap-8">
          {/* Left column - Introduction */}
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="mb-12 md:mb-0"
            >
              <motion.div style={{ y: y1 }} className="md:pr-12">
                <span className="inline-block text-xs uppercase tracking-widest text-neutral-500 mb-6">
                  Sobre el programa
                </span>

                <p className="text-xl md:text-2xl text-neutral-800 font-light leading-relaxed mb-8">
                  En GOmotors valoramos la confianza que nuestros clientes y
                  comunidad depositan en nosotros.
                </p>

                <p className="text-lg text-neutral-600 font-light leading-relaxed mb-12">
                  Por eso creamos Referente GO, un programa de referidos donde
                  tú puedes ganar dinero en efectivo por ayudarnos a crecer.
                </p>

                {/* Benefits section - DARK */}
                <div className="bg-[#0A0A0A] p-8 mt-12">
                  <div className="flex items-center mb-6">
                    <span className="block w-16 h-[2px] bg-neutral-700 mr-4"></span>
                    <p className="text-neutral-400 text-sm font-medium uppercase tracking-wide">
                      Beneficios
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mt-8">
                    <div className="border-t-2 border-neutral-700 pt-4">
                      <span className="text-4xl font-light text-white">
                        $150
                      </span>
                      <p className="text-sm text-neutral-400 mt-2">
                        Por cada referido que compre
                      </p>
                    </div>
                    <div className="border-t-2 border-neutral-700 pt-4">
                      <span className="text-4xl font-light text-white">0%</span>
                      <p className="text-sm text-neutral-400 mt-2">
                        Complicaciones para participar
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right column - How it works */}
          <div className="col-span-12 md:col-span-6 lg:col-span-6 lg:col-start-7">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <motion.div style={{ y: y2 }}>
                <div className="flex items-center mb-10">
                  <div className="w-12 h-[2px] bg-neutral-400 mr-4"></div>
                  <h3 className="text-xl text-neutral-800 font-normal uppercase tracking-widest">
                    ¿Cómo funciona?
                  </h3>
                </div>

                {/* Steps with numbers */}
                <motion.div variants={stepsContainer} className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-[35px] top-0 w-[1px] h-full bg-neutral-300"></div>

                  {/* Step 1 */}
                  <motion.div
                    variants={stepItem}
                    className="flex items-start mb-16 relative"
                  >
                    <div className="flex-shrink-0 w-[70px] h-[70px] rounded-full flex items-center justify-center bg-[#0A0A0A] text-white border border-neutral-700 text-2xl font-light z-10">
                      01
                    </div>
                    <div className="ml-8 pt-5">
                      <p className="text-lg text-neutral-700 font-light leading-relaxed">
                        Si conoces a alguien que quiere comprar un vehículo,
                        simplemente refiérelo a nuestro equipo.
                      </p>
                    </div>
                  </motion.div>

                  {/* Step 2 */}
                  <motion.div
                    variants={stepItem}
                    className="flex items-start mb-16 relative"
                  >
                    <div className="flex-shrink-0 w-[70px] h-[70px] rounded-full flex items-center justify-center bg-[#0A0A0A] text-white border border-neutral-700 text-2xl font-light z-10">
                      02
                    </div>
                    <div className="ml-8 pt-5">
                      <p className="text-lg text-neutral-700 font-light leading-relaxed">
                        Si la compra se concreta, tú recibes hasta $150 dólares
                        en efectivo como agradecimiento.
                      </p>
                    </div>
                  </motion.div>

                  {/* Step 3 */}
                  <motion.div
                    variants={stepItem}
                    className="flex items-start relative"
                  >
                    <div className="flex-shrink-0 w-[70px] h-[70px] rounded-full flex items-center justify-center bg-[#0A0A0A] text-white border border-neutral-700 text-2xl font-light z-10">
                      03
                    </div>
                    <div className="ml-8 pt-5">
                      <p className="text-lg text-neutral-700 font-light leading-relaxed">
                        No necesitas ser cliente, cualquier persona puede
                        participar.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Footer message - DARK */}
        <div className="mt-24 pt-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center bg-[#0A0A0A] p-12"
          >
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-neutral-300 font-light"
            >
              Porque en GOmotors creemos que la mejor publicidad es la
              recomendación de quienes confían en nosotros.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl font-normal text-white mt-6"
            >
              Haz correr la voz y gana con nosotros.
            </motion.p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-32 h-[1px] bg-neutral-600 mx-auto mt-10 overflow-hidden"
            >
              <motion.div
                variants={lineExpand}
                className="h-full bg-white"
              ></motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReferenteGo;
