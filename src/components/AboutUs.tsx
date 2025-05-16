"use client";

import React, { useState, useEffect } from "react";
import { RxChevronRight } from "react-icons/rx";

const AboutUs = () => {
  // Images for carousel
  const images = [
    "/images/about-us/2.jpg",
    "/images/about-us/3.jpg",
    "/images/about-us/4.jpg",
    "/images/about-us/5.jpg",
    "/images/about-us/6.jpg",
    "/images/about-us/7.jpg",
    "/images/about-us/8.jpg",
  ];

  // State to control image rotation
  const [activeImage, setActiveImage] = useState(0);

  // Auto rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Function to navigate carousel manually
  const navigateCarousel = (direction: "next" | "prev") => {
    if (direction === "next") {
      setActiveImage((prev) => (prev + 1) % images.length);
    } else {
      setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  return (
    <div>
      {/* Custom fonts */}
      <style jsx global>{`
        @font-face {
          font-family: "Montserrat-Medium";
          src: url("/fonts/Montserrat-Arabic Medium 500.otf") format("opentype");
          font-weight: 500;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: "Montserrat-Light";
          src: url("/fonts/Montserrat-Arabic Light 300.otf") format("opentype");
          font-weight: 300;
          font-style: normal;
          font-display: swap;
        }

        .font-montserrat-medium {
          font-family: "Montserrat-Medium", sans-serif;
        }

        .font-montserrat-light {
          font-family: "Montserrat-Light", sans-serif;
        }
      `}</style>

      {/* HEADER SECTION */}
      <div className="relative h-screen flex items-center">
        <div className="absolute inset-0 bg-black/70 z-0">
          <img
            src="/images/about-us/1.jpg"
            alt="Background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="container mx-auto px-6 z-10 flex">
          <div className="flex-1">
            <div className="flex items-center">
              <div className="w-20 h-[1px] bg-white mr-4"></div>
              <h4 className="text-xl text-white font-light mb-2">Nosotros</h4>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-4xl text-white font-normal leading-tight mb-4">
              Somos distribuidores de las marcas Hyundai, Great Wall, Haval,
              Soueast, Shineray, SWM y más en la provincia de Loja y Zamora
              Chinchipe, con más de 16 años de experiencia.
            </h2>
            <p className="text-2xl text-gray-300 font-light">
              Ofrecemos talleres autorizados y repuestos genuinos para
              garantizar el respaldo total a tu vehículo.
            </p>
          </div>
        </div>
      </div>

      {/* PHILOSOPHY SECTION - Swiss Design Inspired */}
      <section className="bg-white text-black py-32">
        <div className="mx-auto px-8 md:px-12 lg:px-16 max-w-[1600px]">
          {/* Editorial-style header with prominent typography */}
          <div className="mb-24">
            <span className="block text-xs font-medium tracking-[0.3em] uppercase text-gray-400 mb-4">
              Nuestra filosofía
            </span>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-8 lg:col-span-6">
                <h2 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-montserrat-medium leading-[1.1] tracking-tight">
                  Construyendo el futuro automotriz del sur
                </h2>
              </div>
            </div>
          </div>

          {/* Main content in asymmetric grid - Two column layout */}
          <div className="grid grid-cols-12 gap-x-4 md:gap-x-8">
            {/* Left side with original stacked layout */}
            <div className="col-span-12 md:col-span-6">
              {/* Mission section */}
              <div className="grid grid-cols-12 gap-x-4 mb-24">
                <div className="col-span-1 flex flex-col items-start">
                  <div className="h-[120px] pt-12 flex items-start">
                    <span className="text-[5rem] font-montserrat-light text-gray-200">
                      1
                    </span>
                  </div>
                  <div className="w-[1px] h-full bg-gray-200 ml-6 mt-4"></div>
                </div>

                <div className="col-span-11">
                  <div className="md:pr-12">
                    <h3 className="text-3xl md:text-4xl mb-12 font-montserrat-medium tracking-tight uppercase">
                      Misión
                    </h3>
                    <p className="text-lg font-montserrat-light leading-relaxed text-gray-700 mb-12">
                      Ser un concesionario de marcas líderes en el mercado,
                      especializado en ofrecer soluciones de movilidad, a través
                      de servicios de venta y posventa de vehículos livianos y
                      pesados, con responsabilidad social y altos estándares de
                      calidad para nuestros clientes internos y externos.
                    </p>
                    <div className="inline-block border-t border-gray-300 pt-4">
                      <span className="text-xs uppercase tracking-wider text-gray-400">
                        Actualizado 2023
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vision section */}
              <div className="grid grid-cols-12 gap-x-4 mt-24 md:mt-40">
                <div className="col-span-1 flex flex-col items-start">
                  <div className="h-[120px] pt-12 flex items-start">
                    <span className="text-[5rem] font-montserrat-light text-gray-200">
                      2
                    </span>
                  </div>
                  <div className="w-[1px] h-[200px] bg-gray-200 ml-6 mt-4"></div>
                </div>

                <div className="col-span-11">
                  <div className="md:pr-12">
                    <h3 className="text-3xl md:text-4xl mb-12 font-montserrat-medium tracking-tight uppercase">
                      Visión
                    </h3>
                    <p className="text-lg font-montserrat-light leading-relaxed text-gray-700 mb-12">
                      Convertirnos en el concesionario líder del sur del país en
                      innovación, procesos y tecnología, respaldados por
                      principios y valores sólidos que fortalezcan nuestro
                      talento humano y generen rentabilidad sostenible.
                    </p>
                    <div className="inline-block border-t border-gray-300 pt-4">
                      <span className="text-xs uppercase tracking-wider text-gray-400">
                        Proyección a 2030
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Vertical Image Strip showing 3 images at once */}
            <div className="hidden md:block md:col-span-6 relative h-[90vh] overflow-hidden">
              <div className="w-full h-full relative">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === activeImage
                        ? "opacity-100 z-10"
                        : "opacity-0 z-0"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Imagen de flota vehicular ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-xs tracking-widest font-medium text-white">
                        {index + 1}/{images.length}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* VALUES SECTION */}
      <div className="bg-gray-200 py-16">
        <div className="container mx-auto px-6">
          <div className="border-t border-gray-400 pt-8">
            <h3 className="text-5xl text-black mb-12">Nuestros Valores</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
            {/* Valor 1 */}
            <div>
              <h2 className="text-9xl font-light text-black mb-4">01</h2>
              <div className="flex items-center mb-6">
                <div className="w-1 h-6 bg-black mr-3"></div>
                <h4 className="text-xl font-medium text-black">Respeto</h4>
              </div>
              <p className="text-base font-light text-black/70">
                Personal y profesional, dentro y fuera de la organización. El
                respeto guía nuestras relaciones internas y externas,
                fortaleciendo la confianza y el ambiente colaborativo.
              </p>
            </div>

            {/* Valor 2 */}
            <div>
              <h2 className="text-9xl font-light text-black mb-4">02</h2>
              <div className="flex items-center mb-6">
                <div className="w-1 h-6 bg-black mr-3"></div>
                <h4 className="text-xl font-medium text-black">
                  Responsabilidad
                </h4>
              </div>
              <p className="text-base font-light text-black/70">
                Comprometidos con el trabajo colaborativo y el logro de
                objetivos. Actuamos con seriedad, cumpliendo con nuestras
                obligaciones y siendo parte activa del éxito colectivo.
              </p>
            </div>

            {/* Valor 3 */}
            <div>
              <h2 className="text-9xl font-light text-black mb-4">03</h2>
              <div className="flex items-center mb-6">
                <div className="w-1 h-6 bg-black mr-3"></div>
                <h4 className="text-xl font-medium text-black">Calidad</h4>
              </div>
              <p className="text-base font-light text-black/70">
                Estándares altos en venta y posventa. Buscamos la mejora
                continua y la excelencia en cada detalle para superar las
                expectativas de nuestros clientes.
              </p>
            </div>

            {/* Valor 4 */}
            <div>
              <h2 className="text-9xl font-light text-black mb-4">04</h2>
              <div className="flex items-center mb-6">
                <div className="w-1 h-6 bg-black mr-3"></div>
                <h4 className="text-xl font-medium text-black">Honestidad</h4>
              </div>
              <p className="text-base font-light text-black/70">
                En cada acción, propuesta y resultado. La transparencia guía
                nuestras decisiones, generando credibilidad y vínculos duraderos
                con nuestros clientes y colaboradores.
              </p>
            </div>

            {/* Valor 5 */}
            <div>
              <h2 className="text-9xl font-light text-black mb-4">05</h2>
              <div className="flex items-center mb-6">
                <div className="w-1 h-6 bg-black mr-3"></div>
                <h4 className="text-xl font-medium text-black">Rentabilidad</h4>
              </div>
              <p className="text-base font-light text-black/70">
                Procesos eficientes para seguir creciendo. Optimizamos recursos
                y decisiones para garantizar sostenibilidad y aportar valor a
                largo plazo.
              </p>
            </div>

            {/* Valor 6 */}
            <div>
              <h2 className="text-9xl font-light text-black mb-4">06</h2>
              <div className="flex items-center mb-6">
                <div className="w-1 h-6 bg-black mr-3"></div>
                <h4 className="text-xl font-medium text-black">Lealtad</h4>
              </div>
              <p className="text-base font-light text-black/70">
                A nuestros clientes, equipo y estrategia empresarial. Valoramos
                las relaciones a largo plazo, basadas en el compromiso, la
                confianza y la coherencia con nuestros principios.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile carousel (visible only on mobile) */}
      <div className="md:hidden w-full h-[400px] relative mt-24 overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Imagen de flota vehicular ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Mobile controls */}
        <div className="absolute bottom-0 left-0 right-0 h-12 flex justify-between items-center px-6 bg-white/10 backdrop-blur-sm">
          <span className="text-xs tracking-widest font-medium text-black/60">
            {activeImage + 1}/{images.length}
          </span>
          <div className="flex space-x-4">
            <button
              onClick={() => navigateCarousel("prev")}
              className="p-2 hover:bg-gray-100 transition-colors"
              aria-label="Imagen anterior"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => navigateCarousel("next")}
              className="p-2 hover:bg-gray-100 transition-colors"
              aria-label="Siguiente imagen"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
