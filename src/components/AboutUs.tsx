"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";
import { RxChevronRight } from "react-icons/rx";

type ValueSectionProps = {
  icon: string;
  heading: string;
  description: string;
};

type SlideProps = {
  title: string;
  description: string;
  icon: string;
};

const AboutUs = () => {
  // Imágenes para el carrusel automático
  const images = [
    "/images/about-us/about-us1.jpg",
    "/images/about-us/about-us2.avif",
    "/images/about-us/about-us5.png",
    "/images/about-us/about-us6.jpg",
  ];

  // Estado para controlar qué conjunto de imágenes mostrar
  const [activeImageSet, setActiveImageSet] = useState(0);
  const [activeMissionTab, setActiveMissionTab] = useState(true);

  // Cambio automático de imágenes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageSet((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Animaciones para el título
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  // Animación para el grid de imágenes
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  // Animación para cada celda del grid
  const cellVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  // Animación para secciones
  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Slides
  const slides: SlideProps[] = [
    {
      title: "Tecnología e Innovación",
      description: "Vehículos con tecnología inteligente.\nConduce modelos con asistencia al manejo, conectividad y seguridad avanzada.",
      icon: "💡"
    },
    {
      title: "Para cada estilo de vida",
      description: "El modelo ideal para ti.\nSUV, sedán o pick-up: tenemos el vehículo que se adapta a tu ritmo.",
      icon: "🚗"
    },
    {
      title: "Financiamiento fácil",
      description: "Estrena sin complicaciones.\nCrédito aprobado en minutos y planes que se ajustan a ti.",
      icon: "💰"
    },
    {
      title: "Respaldo y Garantía",
      description: "Compra con confianza.\nGarantía oficial, repuestos genuinos y talleres autorizados en Loja y Zamora.",
      icon: "✅"
    }
  ];

  // Valores
  const valueSections: ValueSectionProps[] = [
    { 
      icon: "🤝", 
      heading: "Respeto", 
      description: "Personal y profesional, dentro y fuera de la organización."
    },
    { 
      icon: "✓", 
      heading: "Responsabilidad", 
      description: "Comprometidos con el trabajo colaborativo y el logro de objetivos."
    },
    { 
      icon: "⭐", 
      heading: "Calidad", 
      description: "Estándares altos en venta y posventa."
    },
    { 
      icon: "🔍", 
      heading: "Honestidad", 
      description: "En cada acción, propuesta y resultado."
    },
    { 
      icon: "📈", 
      heading: "Rentabilidad", 
      description: "Procesos eficientes para seguir creciendo."
    },
    { 
      icon: "🔒", 
      heading: "Lealtad", 
      description: "A nuestros clientes, equipo y estrategia empresarial."
    }
  ];

  return (
    <section id="about-us" className="py-24 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Estilos para las fuentes */}
      <style jsx global>{`
        @font-face {
          font-family: 'Montserrat-Medium';
          src: url('/fonts/Montserrat-Arabic Medium 500.otf') format('opentype');
          font-weight: 500;
          font-style: normal;
          font-display: swap;
        }
        
        @font-face {
          font-family: 'Montserrat-Light';
          src: url('/fonts/Montserrat-Arabic Light 300.otf') format('opentype');
          font-weight: 300;
          font-style: normal;
          font-display: swap;
        }
        
        .font-montserrat-medium {
          font-family: 'Montserrat-Medium', sans-serif;
        }
        
        .font-montserrat-light {
          font-family: 'Montserrat-Light', sans-serif;
        }

        .description-text {
          white-space: pre-line;
        }
      `}</style>

      {/* HEADER SECTION */}
      <div className="container mx-auto px-6 mb-20">
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <h2 className="text-5xl md:text-6xl font-montserrat-medium text-gray-900 mb-4">¿Quiénes Somos?</h2>
          <div className="h-1 w-24 bg-gray-900 rounded mb-12"></div>
        </motion.div>

        {/* INTRO SECTION CON GRID DE IMÁGENES */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Grid animado de imágenes - Lado izquierdo */}
          <motion.div 
            className="w-full lg:w-3/5 h-[650px] overflow-hidden rounded-2xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="h-full w-full grid grid-cols-12 grid-rows-6 gap-2 p-2 bg-black"
              variants={gridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Imagen Grande */}
              <motion.div 
                className="col-span-8 row-span-6 rounded-xl overflow-hidden"
                variants={cellVariants}
              >
                <img
                  src={images[(activeImageSet + 0) % images.length]}
                  alt="GOmotors vehículo premium"
                  className="w-full h-full object-cover hover:scale-105"
                  style={{ transition: "transform 1.2s ease-in-out" }}
                />
              </motion.div>
              
              {/* Imagen Pequeña 1 */}
              <motion.div 
                className="col-span-4 row-span-3 rounded-xl overflow-hidden"
                variants={cellVariants}
              >
                <img
                  src={images[(activeImageSet + 1) % images.length]}
                  alt="GOmotors vehículos"
                  className="w-full h-full object-cover hover:scale-105"
                  style={{ transition: "transform 1.2s ease-in-out" }}
                />
              </motion.div>
              
              {/* Imagen Pequeña 2 */}
              <motion.div 
                className="col-span-4 row-span-3 rounded-xl overflow-hidden"
                variants={cellVariants}
              >
                <img
                  src={images[(activeImageSet + 2) % images.length]}
                  alt="Detalle de vehículo GOmotors"
                  className="w-full h-full object-cover hover:scale-105"
                  style={{ transition: "transform 1.2s ease-in-out" }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Texto descriptivo - Lado derecho */}
          <motion.div
            className="w-full lg:w-2/5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-xl">
              <motion.p 
                className="text-xl md:text-2xl leading-relaxed text-gray-800 mb-6 font-montserrat-light"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Somos distribuidores de las marcas Hyundai, Great Wall, Haval, Soueast, Shineray, SWM y más en la provincia de Loja y Zamora Chinchipe, con más de 16 años de experiencia.
              </motion.p>
              
              <motion.p 
                className="text-xl md:text-2xl leading-relaxed text-gray-800 font-montserrat-light"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Ofrecemos talleres autorizados y repuestos genuinos para garantizar el respaldo total a tu vehículo.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* SLIDES SECTION */}
      <div className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {slides.map((slide, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-gray-800 p-5 flex items-center">
                  <span className="text-3xl mr-3">{slide.icon}</span>
                  <h3 className="text-xl text-white font-montserrat-medium">{slide.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-800 font-montserrat-light text-base description-text leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* MISIÓN Y VISIÓN SECTION */}
      <motion.div 
        className="py-16 bg-gray-100"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Misión */}
            <motion.div 
              className="w-full lg:w-1/2 bg-white rounded-xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="h-20 bg-gray-800 flex items-center px-8">
                <h3 className="text-2xl font-montserrat-medium text-white flex items-center">
                  <span className="mr-3">🎯</span> Misión
                </h3>
              </div>
              <div className="p-8">
                <p className="text-lg leading-relaxed text-gray-800 font-montserrat-light">
                  Ser un concesionario de marcas líderes en el mercado, especializado en ofrecer soluciones de movilidad, a través de servicios de venta y posventa de vehículos livianos y pesados, con responsabilidad social y altos estándares de calidad para nuestros clientes internos y externos.
                </p>
              </div>
            </motion.div>

            {/* Visión */}
            <motion.div 
              className="w-full lg:w-1/2 bg-white rounded-xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="h-20 bg-gray-800 flex items-center px-8">
                <h3 className="text-2xl font-montserrat-medium text-white flex items-center">
                  <span className="mr-3">👁️</span> Visión
                </h3>
              </div>
              <div className="p-8">
                <p className="text-lg leading-relaxed text-gray-800 font-montserrat-light">
                  Convertirnos en el concesionario líder del sur del país en innovación, procesos y tecnología, respaldados por principios y valores sólidos que fortalezcan nuestro talento humano y generen rentabilidad sostenible.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* VALORES SECTION - Con estructura Layout242 */}
      <section id="valores" className="px-[5%] py-16 md:py-24 lg:py-28 bg-gradient-to-b from-gray-100 to-white">
        <div className="container mx-auto">
          <div className="flex flex-col items-start">
            <div className="mb-12 w-full max-w-lg md:mb-16 lg:mb-20">
              <h3 className="text-4xl font-montserrat-medium leading-[1.2] text-gray-900 md:text-5xl lg:text-6xl">
                <span className="text-3xl mr-3">🧭</span> Nuestros Valores
              </h3>
            </div>
            
            <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
              {valueSections.map((section, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="mb-5 md:mb-6">
                    <div className="flex items-center justify-center w-14 h-14 text-3xl bg-gray-900 text-white rounded-xl">
                      {section.icon}
                    </div>
                  </div>
                  <h3 className="mb-5 text-xl font-montserrat-medium md:mb-6 md:text-2xl text-gray-900 group-hover:text-black transition-colors">
                    {section.heading}
                  </h3>
                  <p className="mb-5 md:mb-6 text-gray-700 font-montserrat-light text-sm md:text-base group-hover:text-gray-900 transition-colors">
                    {section.description}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center">
                    <button className="flex items-center text-gray-900 hover:text-black font-montserrat-medium group-hover:underline transition-all">
                      <span>Saber más</span>
                      <RxChevronRight className="ml-1" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default AboutUs; 