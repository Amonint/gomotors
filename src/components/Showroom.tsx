"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

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
    title: "Somos el mayor showroom del sur del país",
    desc: "Más de 500 autos de diferentes marcas y segmentos."
  },
  {
    title: "Atención personalizada",
    desc: "Asesoría experta y acompañamiento en todo el proceso."
  },
  {
    title: "Garantía y respaldo",
    desc: "Solo vehículos certificados y con garantía real."
  }
];

const categories = [
  {
    title: "Pick Ups",
    desc: "Pick Ups versátiles y robustos para cualquier tarea.",
    img: "/images/NAZ_be17eae85be84cf5bc04927889924346.jpg",
    link: "/showroom"
  },
  {
    title: "SUVs & Crossovers",
    desc: "Vehículos espaciosos con mayor altura y tracción mejorada.",
    img: "/images/about-us/about-us2.avif",
    link: "/showroom"
  },
  {
    title: "Sedanes",
    desc: "Confort y elegancia para el uso diario con gran eficiencia.",
    img: "/images/about-us/Soueast-A5-Yiwu-2019.jpg",
    link: "/showroom"
  }
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
        }
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
    const logoItems = document.querySelectorAll('.logo-item');
    
    const handleMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      gsap.to(target, { 
        scale: 1.15, 
        opacity: 1, 
        duration: 0.3,
        ease: "power2.out",
        overwrite: true 
      });
      
      // Ralentizar la animación en lugar de pausarla
      if (timelineRef.current) {
        timelineRef.current.timeScale(0.3);
        animationPausedRef.current = true;
        
        // Añadir efecto de desenfoque a los otros logos
        logoItems.forEach(item => {
          if (item !== target) {
            gsap.to(item, { 
              opacity: 0.6, 
              scale: 0.95,
              duration: 0.3 
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
        overwrite: true 
      });
      
      // Volver a la velocidad normal
      if (timelineRef.current) {
        timelineRef.current.timeScale(1);
        animationPausedRef.current = false;
        
        // Restaurar todos los logos
        logoItems.forEach(item => {
          if (item !== target) {
            gsap.to(item, { 
              opacity: 0.9, 
              scale: 1,
              duration: 0.3 
            });
          }
        });
      }
    };
    
    logoItems.forEach(item => {
      item.addEventListener('mouseenter', handleMouseEnter);
      item.addEventListener('mouseleave', handleMouseLeave);
    });
    
    // Manejar cambios de tamaño de ventana
    const handleResize = () => {
      gsap.delayedCall(0.2, initLogoAnimation);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Limpieza al desmontar
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      
      logoItems.forEach(item => {
        item.removeEventListener('mouseenter', handleMouseEnter);
        item.removeEventListener('mouseleave', handleMouseLeave);
      });
      
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="w-full bg-[#0A0A0A] text-white py-16 font-tt-hoves">
      {/* Brand Logo Carousel */}
      <div className="py-10 overflow-hidden bg-gradient-to-r from-[#0000F] via-[#0f0f0f] to-[#0A0A0A] mb-14 ">
        
        
        <div className="relative overflow-hidden max-w-[100%]">
          {/* GSAP Marquee - optimizado */}
          <div className="overflow-hidden relative max-w-[100%]">
            <div ref={logoTrackRef} className="flex whitespace-nowrap max-w-[100%]">
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
                          willChange: 'transform, opacity',
                          transform: 'translateZ(0)',
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
                          willChange: 'transform, opacity',
                          transform: 'translateZ(0)',
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

      <div className="max-w-7xl mx-auto px-6">
        {/* Main Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Bienvenido a nuestro <span className="text-[#ffe600]">Showroom</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explora la mejor selección de autos premium en un espacio diseñado para ofrecerte una experiencia única.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-[#111111] rounded-2xl p-8 border border-gray-800 hover:border-[#ffe600]/30 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center justify-center w-12 h-12 bg-[#ffe600] text-black rounded-full text-xl font-bold">0{index+1}</span>
                <h3 className="font-semibold text-xl">{benefit.title}</h3>
              </div>
              <p className="text-gray-400 ml-16">{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* Categories */}
        <h3 className="text-3xl font-bold mb-8">Nuestras <span className="text-[#ffe600]">Categorías</span></h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {categories.map((category, index) => (
            <div key={index} className="bg-[#181818] rounded-2xl overflow-hidden shadow-lg flex flex-col transform hover:scale-[1.02] transition-all">
              <div className="relative h-48 w-full">
                <Image
                  src={category.img}
                  alt={category.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent"></div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                  <p className="text-gray-400 mb-4">{category.desc}</p>
                </div>
                <Link href={category.link} className="text-[#ffe600] font-semibold hover:underline flex items-center">
                  Ver más <span className="ml-1">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-[#111111] rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">¿Listo para encontrar tu próximo vehículo?</h3>
            <p className="text-gray-400">Agenda una visita personalizada a nuestro showroom.</p>
          </div>
          <Link href="/showroom" className="inline-block bg-[#ffe600] text-black font-semibold px-7 py-3 rounded-full shadow hover:bg-[#fff200] transition-colors text-lg">
            Visitar Showroom
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Showroom; 