"use client";

import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Mantenimiento Preventivo",
    description: "Mantén tu vehículo en óptimas condiciones con nuestros planes de mantenimiento personalizados.",
    image: "/images/mantenimiento/1.jpg",
    link: "/postventa/mantenimiento"
  },
  {
    title: "Reparaciones",
    description: "Servicio técnico especializado con la más alta tecnología y técnicos certificados.",
    image: "/images/mantenimiento/6.jpeg",
    link: "/postventa/reparaciones"
  },
  {
    title: "Repuestos Originales",
    description: "Garantizamos la autenticidad y calidad de todas nuestras piezas y repuestos.",
    image: "/images/mantenimiento/5.avif",
    link: "/postventa/repuestos"
  },
  {
    title: "Centro de Colisiones",
    description: "El centro de colisiones más grande y moderno del sur del país.",
    image: "/images/mantenimiento/7.jpg",
    link: "/postventa/colisiones"
  }
];

const Postventa = () => {
  const container = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".card");

      // Primer scroll trigger para el primer card
      ScrollTrigger.create({
        trigger: cards[0],
        start: "center 60%",
        endTrigger: cards[cards.length - 1],
        end: "bottom 70%",
        pin: ".intro",
        pinSpacing: false,
      });

      // Scroll triggers para cada card
      cards.forEach((card, index) => {
        const isLastCard = index === cards.length - 1;
        const cardInner = card.querySelector(".card-inner");

        if (!isLastCard) {
          ScrollTrigger.create({
            trigger: card,
            start: "center 60%",
            endTrigger: ".outro",
            end: "top 80%",
            pin: true,
            pinSpacing: false,
          });

          gsap.to(cardInner, {
            y: `-${(cards.length - index) * 16}vh`,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "center 60%",
              endTrigger: ".outro",
              end: "top 80%",
              scrub: 0.5,
            },
          });
        }
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={container} className="relative bg-black text-white">
      {/* Intro Section - Simplified and Centered */}
      <div className="intro relative h-[50vh] flex items-center justify-center bg-black">
        <div className="text-center max-w-4xl mx-auto px-6">
          <h2 className="text-[3.5rem] md:text-[5rem] font-medium tracking-tight mb-6">
            Servicio <span className="text-[#ffe600]">Postventa</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Descubre nuestros servicios especializados y mantén tu vehículo en las mejores condiciones con nuestro equipo de expertos.
          </p>
        </div>
      </div>

      {/* Cards Container */}
      <div className="cards-container">
        {services.map((service, index) => (
          <div key={index} className="card">
            <div className="card-inner relative min-h-screen flex items-center bg-black/90">
              <div className="absolute inset-0">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover opacity-40"
                  sizes="100vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/80"></div>
              </div>

              {/* Contenido */}
              <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="card-text space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-[#ffe600] flex items-center justify-center">
                        <span className="text-black text-xl font-bold">0{index + 1}</span>
                      </div>
                      <div className="h-px flex-1 bg-[#ffe600]/20"></div>
                    </div>

                    <div>
                      <h3 className="text-4xl lg:text-5xl font-bold mb-6">{service.title}</h3>
                      <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
                        {service.description}
                      </p>
                      <Link 
                        href={service.link}
                        className="inline-flex items-center gap-2 bg-[#ffe600] text-black font-semibold px-8 py-4 rounded-full hover:bg-[#fff200] transition-all group"
                      >
                        Conoce más
                        <svg 
                          className="w-5 h-5 transform transition-transform group-hover:translate-x-1" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>

                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Outro Section */}
      <div className="outro relative min-h-screen">
        <div className="absolute inset-0 bg-[#ffe600]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-3xl w-full text-center px-6">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-black">¿Listo para agendar?</h2>
            <p className="text-xl text-black/80 mb-10 max-w-2xl mx-auto">
              Programa tu cita en cualquiera de nuestros talleres autorizados y déjanos cuidar de tu vehículo.
            </p>
            <Link 
              href="/contacto"
              className="inline-flex items-center gap-3 bg-black text-white font-semibold px-10 py-5 rounded-full hover:bg-gray-900 transition-all transform hover:scale-105"
            >
              Agenda tu cita
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Postventa; 