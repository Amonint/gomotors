"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { motion } from "framer-motion";

// Brand logos data - using logo.png as a placeholder for all brands
const brandLogos = [
  { name: "Haval", img: "/images/brands/haval-logo-freelogovectors.net_.png" },
  { name: "Great Wall", img: "/images/brands/Great-Wall-Logo.png" },
  { name: "Hyundai", img: "/images/brands/logo-Hyundai.png" },
  { name: "Soueast", img: "/images/brands/Soueast_logo.png" },
  { name: "SWM", img: "/images/brands/SWM_red_RGB.png" },
  { name: "DFSK", img: "/images/brands/DFSK.png" },
  { name: "GWM", img: "/images/brands/gwm-Logo.png" },
  { name: "Kyc", img: "/images/brands/kyc-Logo.png" },
];

const benefits = [
  {
    title: "El Showroom más grande del Sur del país",
    desc: "Somos el mayor showroom automotriz de Loja y Zamora Chinchipe, con más de 10 marcas a tu elección y decenas de modelos disponibles para diferentes necesidades y presupuestos.Somos una empresa sólida y rentable, comprometida con ofrecer variedad, confianza y el mejor respaldo automotriz de la región.",
  },
  {
    title: "Atención Personalizada",
    desc: "Tu satisfacción es nuestra prioridad.Contamos con asesores calificados y certificados por cada marca, preparadospara guiarte con profesionalismo y conocimiento.Porque elegir tu próximo vehículo debe ser una decisión informada, segura y sin presiones.",
  },
  {
    title: "Garantía y Respaldo Total",
    desc: "Respaldas tu compra con tranquilidad.Disponemos de talleres autorizados por nuestras marcas, con técnicos capacitados internacionalmente y equipos de diagnóstico de última tecnología.Además, nuestro amplio stock de repuestos genuinos nos permite darte soluciones inmediatas ante cualquier inconveniente.En GOmotors, el respaldo va más allá de la venta.",
  },
];

const categories = [
  {
    title: "Pick Ups",
    desc: "Pick Ups versátiles y robustos para cualquier tarea.",
    img: "/images/NAZ_be17eae85be84cf5bc04927889924346.jpg",
    link: "/showroom",
  },
  {
    title: "SUVs & Crossovers",
    desc: "Vehículos espaciosos con mayor altura y tracción mejorada.",
    img: "/images/about-us/about-us2.avif",
    link: "/showroom",
  },
  {
    title: "Sedanes",
    desc: "Confort y elegancia para el uso diario con gran eficiencia.",
    img: "/images/about-us/Soueast-A5-Yiwu-2019.jpg",
    link: "/showroom",
  },
];

const Showroom = () => {
  const logoTrackRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const animationPausedRef = useRef<boolean>(false);

  useEffect(() => {
    // Asegurarse de que estamos en el cliente
    if (typeof window === "undefined") return;

    // Inicializar la animación de logos
    const initLogoAnimation = () => {
      if (!logoTrackRef.current) return;

      // Limpiar cualquier animación previa
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      // Crear una nueva timeline con opciones optimizadas
      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "none" },
        onRepeat: () => {
          // Reiniciar suavemente en cada repetición
          gsap.set(logoTrackRef.current, { x: 0 });
        },
      });

      // Obtener el ancho del contenedor de logos
      const logoTrackWidth = logoTrackRef.current.offsetWidth;
      const halfWidth = logoTrackWidth / 2;

      // Animación inicial para el inicio suave
      gsap.set(logoTrackRef.current, { x: 0 });

      // Animar el desplazamiento horizontal con mejor rendimiento
      tl.to(logoTrackRef.current, {
        x: `-${halfWidth}px`,
        duration: 20, // Velocidad moderada para movimiento suave
        ease: "linear",
        force3D: true, // Mejorar rendimiento con aceleración 3D
      });

      // Guardar la referencia a la timeline
      timelineRef.current = tl;
    };

    // Inicializar la animación
    initLogoAnimation();

    // Configurar los efectos de hover para los logos con mejor rendimiento
    const logoItems = document.querySelectorAll(".logo-item");

    const handleMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      gsap.to(target, {
        scale: 1.15,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
      });

      // Ralentizar la animación en lugar de pausarla
      if (timelineRef.current) {
        timelineRef.current.timeScale(0.3);
        animationPausedRef.current = true;

        // Añadir efecto de desenfoque a los otros logos
        logoItems.forEach((item) => {
          if (item !== target) {
            gsap.to(item, {
              opacity: 0.6,
              scale: 0.95,
              duration: 0.3,
            });
          }
        });
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      gsap.to(target, {
        scale: 1,
        opacity: 0.9,
        duration: 0.3,
        ease: "power2.in",
        overwrite: true,
      });

      // Volver a la velocidad normal
      if (timelineRef.current) {
        timelineRef.current.timeScale(1);
        animationPausedRef.current = false;

        // Restaurar todos los logos
        logoItems.forEach((item) => {
          if (item !== target) {
            gsap.to(item, {
              opacity: 0.9,
              scale: 1,
              duration: 0.3,
            });
          }
        });
      }
    };

    logoItems.forEach((item) => {
      item.addEventListener("mouseenter", handleMouseEnter);
      item.addEventListener("mouseleave", handleMouseLeave);
    });

    // Manejar cambios de tamaño de ventana
    const handleResize = () => {
      gsap.delayedCall(0.2, initLogoAnimation);
    };

    window.addEventListener("resize", handleResize);

    // Limpieza al desmontar
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      logoItems.forEach((item) => {
        item.removeEventListener("mouseenter", handleMouseEnter);
        item.removeEventListener("mouseleave", handleMouseLeave);
      });

      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="w-full bg-[#0A0A0A] text-white py-16 font-tt-hoves">
      {/* Brand Logo Carousel */}
      <div className="py-10 overflow-hidden bg-gradient-to-r from-[#0000F] via-[#0f0f0f] to-[#0A0A0A] mb-14 ">
        <div className="relative overflow-hidden max-w-[100%]">
          {/* GSAP Marquee - optimizado */}
          <div className="overflow-hidden relative max-w-[100%]">
            <div
              ref={logoTrackRef}
              className="flex whitespace-nowrap max-w-[100%]"
            >
              {/* First set of logos */}
              <div className="flex items-center justify-around min-w-full">
                {brandLogos.map((logo, index) => (
                  <div
                    key={`logo-1-${index}`}
                    className="logo-item mx-3 md:mx-5 cursor-pointer transition-transform"
                  >
                    <div className="w-20 h-20 bg-gradient-to-b rounded-md flex items-center justify-center p-3 hover:border-gray-600 transition-all shadow-md">
                      <Image
                        src={logo.img}
                        alt={logo.name}
                        width={60}
                        height={60}
                        className="object-contain opacity-90 hover:opacity-100 transition-all duration-300 invert brightness-0 filter"
                        loading="eager"
                        style={{
                          willChange: "transform, opacity",
                          transform: "translateZ(0)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Duplicate set for seamless scrolling */}
              <div className="flex items-center justify-around min-w-full">
                {brandLogos.map((logo, index) => (
                  <div
                    key={`logo-2-${index}`}
                    className="logo-item mx-3 md:mx-5 cursor-pointer transition-transform"
                  >
                    <div className="w-20 h-20 bg-gradient-to-b rounded-md flex items-center justify-center p-3 hover:border-gray-600 transition-all shadow-md">
                      <Image
                        src={logo.img}
                        alt={logo.name}
                        width={60}
                        height={60}
                        className="object-contain opacity-90 hover:opacity-100 transition-all duration-300 invert brightness-0 filter"
                        loading="eager"
                        style={{
                          willChange: "transform, opacity",
                          transform: "translateZ(0)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 md:px-12 lg:px-16">
        {/* Swiss Design Header Section */}
        <div className="grid grid-cols-12 gap-6 mb-32">
          {/* Typography Column - Left Side */}
          <div className="col-span-12 md:col-span-4 lg:col-span-5 flex flex-col justify-center">
            <div className="mb-8">
              <div className="w-12 h-[1px] bg-white/40 mb-4"></div>
              <span className="text-xs uppercase tracking-widest text-white/60 font-light">
                Descubre nuestros vehículos
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-12">
              Bienvenido a nuestro{" "}
              <span className="text-white font-normal">Showroom</span>
            </h2>
            <p className="text-lg text-white/70 max-w-md font-light leading-relaxed pr-6">
              En GOmotors encontrarás todo lo que necesitas en un solo lugar.
              Contamos con el portafolio más completo del sur del país: pick-ups
              , autos eficientes, SUVs familiares y camiones de trabajo, todos
              con el respaldo de marcas reconocidas a nivel nacional e
              internacional.
            </p>
            <p className="text-lg text-white/70 max-w-md font-light leading-relaxed pr-6">
              Aquí no solo eliges un vehículo, vives una experiencia de compra
              con asesoramiento experto, transparencia y acompañamiento en cada
              paso. ¡Descubre el modelo perfecto para ti y tu familia!.
            </p>
          </div>

          {/* Benefits Grid - Right Side */}
          <div className="col-span-12 md:col-span-8 lg:col-span-7 mt-12 md:mt-0">
            {/* Swiss Design horizontal line */}
            <motion.div 
              className="w-full h-[1px] bg-white/20 mb-12"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ 
                scaleX: 1,
                transition: { 
                  duration: 1.2, 
                  ease: [0.22, 1, 0.36, 1]
                }
              }}
              viewport={{ once: true }}
            ></motion.div>
            
            {/* Benefits in clean vertical layout */}
            <div className="space-y-16">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index} 
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.8, 
                      ease: [0.22, 1, 0.36, 1],
                      delay: index * 0.15 
                    }
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  {/* Benefit header with thin accent line */}
                  <div className="flex items-center mb-6">
                    <motion.div 
                      className="w-8 h-[1px] bg-white/40 mr-4"
                      initial={{ width: 0 }}
                      whileInView={{ 
                        width: "2rem",
                        transition: { 
                          duration: 0.6, 
                          delay: 0.3 + index * 0.15,
                          ease: "easeOut" 
                        }
                      }}
                      viewport={{ once: true }}
                    ></motion.div>
                    <h3 className="text-xl text-white tracking-tight font-medium uppercase">
                      {benefit.title}
                    </h3>
                  </div>
                  
                  {/* Description with generous left margin and clean type */}
                  <motion.p 
                    className="text-base font-light text-white/70 leading-relaxed ml-12 max-w-xl border-l-[1px] border-white/10 pl-8 group-hover:border-white/30 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { 
                        duration: 0.5, 
                        delay: 0.4 + index * 0.15 
                      }
                    }}
                    viewport={{ once: true }}
                  >
                    {benefit.desc}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showroom;
