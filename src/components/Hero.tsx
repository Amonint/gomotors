"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    "/images/luxury-car.jpg",
    "/images/imagen1.jpg",
    "/images/imagen2.jpg",
    "/images/imagen3.jpg",
  ];

  // Slide text content
  const slideContent = [
    {
      heading: "GOmotors, tu puerta al mundo\nde los vehículos de prestigio",
    },
    {
      heading: "Te ofrecemos más que autos,\nuna experiencia única.",
    },
    {
      heading: "¡Sueña, conduce, emociónate!\n¡Estás en el lugar correcto!",
    },
    {
      heading:
        "Con talleres autorizados y\n el centro de colisiones\nmás grandes del sur del país.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image Carousel with Overlay */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={`Luxury Car ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

     

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col pt-32 pb-24 px-8 md:px-10 text-white">
        {/* Upper Content */}
        <div className="max-w-3xl">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-sm font-light tracking-widest">
                LOJA, ECUADOR
              </span>
              <div className="w-12 h-px bg-white/30 mx-4"></div>
            </div>
          </div>
        </div>

        {/* Spacer to push content down */}
        <div className="flex-grow"></div>

        {/* Text Content - Positioned closer to buttons */}
        <div className="mb-8">
          <div className="transition-opacity duration-500">
            <span className="text-xl font-light text-[#ffe600] mb-2 block">
              0{currentSlide + 1}
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              {slideContent[currentSlide].heading.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg">
          <Link
            href="/showroom"
            className="bg-white/10 hover:bg-[#ffe600]/20 backdrop-blur-sm border border-white/20 px-6 py-4 transition-all group"
          >
            <div className="flex justify-between items-center">
              <span className="text-lg">Ver catálogo</span>
              <span className="text-lg transform group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          </Link>
          <Link
            href="/contacto"
            className="bg-white/10 hover:bg-[#ffe600]/20 backdrop-blur-sm border border-white/20 px-6 py-4 transition-all group"
          >
            <div className="flex justify-between items-center">
              <span className="text-lg">Contáctanos</span>
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
