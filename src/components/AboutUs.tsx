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

  return (
    <div>
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
            Somos distribuidores de las marcas Hyundai, Great Wall, Haval, Soueast, Shineray, SWM y más en la provincia de Loja y Zamora Chinchipe, con más de 16 años de experiencia.
            </h2>
            <p className="text-2xl text-gray-300 font-light">
            Ofrecemos talleres autorizados y repuestos genuinos para garantizar el respaldo total a tu vehículo.
            </p>
          </div>
        </div>
      </div>

      {/* PHILOSOPHY SECTION */}
      <div className="bg-black text-white py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16">
            {/* Misión & Visión - Left Side */}
            <div className="w-full md:w-1/2 flex flex-col justify-center space-y-16">
              {/* Misión */}
              <div>
                <h3 className="text-5xl font-light mb-8 border-l-4 border-white pl-6">Misión</h3>
                <p className="text-xl font-light leading-relaxed">
                  Ser un concesionario de marcas líderes en el mercado, especializado en ofrecer soluciones de movilidad, a través de servicios de venta y posventa de vehículos livianos y pesados, con responsabilidad social y altos estándares de calidad para nuestros clientes internos y externos.
                </p>
              </div>
              
              {/* Visión */}
              <div>
                <h3 className="text-5xl font-light mb-8 border-l-4 border-white pl-6">Visión</h3>
                <p className="text-xl font-light leading-relaxed">
                  Convertirnos en el concesionario líder del sur del país en innovación, procesos y tecnología, respaldados por principios y valores sólidos que fortalezcan nuestro talento humano y generen rentabilidad sostenible.
                </p>
              </div>
            </div>
            
            {/* Image Carousel - Right Side */}
            <div className="w-full md:w-1/2 h-[600px] overflow-hidden relative">
              {images.map((image, index) => (
                <div 
                  key={index} 
                  className={`absolute inset-0 transition-opacity duration-1000 ${index === activeImage ? 'opacity-100' : 'opacity-0'}`}
                >
                  <img 
                    src={image} 
                    alt={`Carousel image ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* VALUES SECTION */}
      <div className="bg-gray-200 py-16">
        <div className="container mx-auto px-6">
          <div className="border-t border-gray-400 pt-8">
            <h3 className="text-2xl mb-12">Values</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
            {/* Value 1 */}
            <div>
              <h2 className="text-9xl font-light text-black/80 mb-4">01</h2>
              <h4 className="text-xl font-medium mb-6">Respect</h4>
              <p className="text-base font-light text-black/70">
                Respect is at the centre of who we are and what we do. 
                Respect for the law. Respect for those who place their trust 
                in us. Respect for the unique challenges that each case may 
                bring. We believe our clients' interests are best served when 
                we approach every situation and every problem with humility, 
                intellectual honesty and objectivity. The goal is always to 
                deliver the best solutions and legal representation, without 
                compromising on truth and integrity.
              </p>
            </div>
            
            {/* Value 2 */}
            <div>
              <h2 className="text-9xl font-light text-black/80 mb-4">02</h2>
              <h4 className="text-xl font-medium mb-6">Resilience</h4>
              <p className="text-base font-light text-black/70">
                The power of not giving up. Our clients look to us for the 
                same resilience and staying power that has helped our 
                lawyers adapt and remain at the forefront of legal work in the 
                past decades against an ever-evolving commercial, 
                technological and legal landscape. We strive to apply that grit 
                and resolve in every case we take on. We've been in this 
                game for a long time and we're here to stay.
              </p>
            </div>
            
            {/* Value 3 */}
            <div>
              <h2 className="text-9xl font-light text-black/80 mb-4">03</h2>
              <h4 className="text-xl font-medium mb-6">Reliability</h4>
              <p className="text-base font-light text-black/70">
                Our clients trust us to deliver high quality legal advice and 
                representation, often in time sensitive settings. We are the 
                first ones they call, because they know their matter will be in 
                good hands. We honor their trust with our commitment to 
                provide service consistently, reliably, and when the case calls 
                for it, discreetly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 