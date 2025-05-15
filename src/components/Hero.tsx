"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "./Navbar";

const slideContent = [
  {
    heading: "Tecnología e Innovación",
    description: "Vehículos con tecnología inteligente.\nConduce modelos con asistencia al manejo, conectividad y seguridad avanzada."
  },
  {
    heading: "Para cada estilo de vida",
    description: "El modelo ideal para ti.\nSUV, sedán o pick-up: tenemos el vehículo que se adapta a tu ritmo."
  },
  {
    heading: "Financiamiento fácil",
    description: "Estrena sin complicaciones.\nCrédito aprobado en minutos y planes que se ajustan a ti."
  },
  {
    heading: "Respaldo y Garantía",
    description: "Compra con confianza.\nGarantía oficial, repuestos genuinos y talleres autorizados en Loja y Zamora."
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slideContent.length - 1 ? 0 : prev + 1));
    }, 5000); // cambia cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
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

      {/* Video de fondo */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/0924.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Contenido principal */}
      <div className="relative z-10 h-full flex flex-col pt-32 pb-24 px-8 md:px-10 text-white">
        {/* Ciudad + línea */}
        <div className="max-w-3xl">
          <div className="flex items-center mb-4">
            <span className="text-sm font-montserrat-light tracking-widest">
              LOJA, ECUADOR
            </span>
            <div className="w-12 h-px bg-white/30 mx-4"></div>
          </div>
        </div>

        <div className="flex-grow"></div>

        {/* Texto dinámico */}
        <div className="mb-8">
          <span className="text-xl font-montserrat-light text-[#ffe600] mb-2 block">
            0{currentSlide + 1}
          </span>
          
          {/* Título con Montserrat Medium */}
          <h1 className="text-4xl md:text-6xl font-montserrat-medium mb-4 leading-tight transition-opacity duration-500">
            {slideContent[currentSlide].heading}
          </h1>
          
          {/* Descripción con Montserrat Light */}
          <div className="text-xl md:text-2xl font-montserrat-light text-white/90 description-text leading-relaxed">
            {slideContent[currentSlide].description.split("\n").map((line, i) => (
              <span key={i} className="block text-base md:text-xl">
                {line}
              </span>
            ))}
          </div>
        </div>

        {/* Botones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg">
          <Link
            href="/showroom"
            className="bg-white/10 hover:bg-[#ffe600]/20 backdrop-blur-sm border border-white/20 px-6 py-4 transition-all group"
          >
            <div className="flex justify-between items-center">
              <span className="text-lg font-montserrat-medium">Ver catálogo</span>
              <span className="text-lg transform group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          </Link>
          <Link
            href="https://wa.me/593999454243"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-[#ffe600]/20 backdrop-blur-sm border border-white/20 px-6 py-4 transition-all group"
          >
            <div className="flex justify-between items-center">
              <span className="text-lg font-montserrat-medium">Contáctanos</span>
              <span className="text-lg transform group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
