"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const PostventaGO = () => {
  // State for gallery controls
  const [currentImage, setCurrentImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Gallery images
  const galleryImages = [
    "/images/postventa/postventa1.png",
    "/images/postventa/postventa2.png",
    "/images/postventa/postventa3.png",
    "/images/postventa/postventa4.png",
    "/images/postventa/postventa5.png",
    "/images/postventa/postventa6.png",
    "/images/postventa/postventa7.png",
    "/images/postventa/postventa8.png",
  ];

  // Function to navigate through gallery
  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  }, [galleryImages.length]);

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  // Toggle autoplay
  const toggleAutoplay = () => {
    setIsPlaying(prev => !prev);
  };

  // Autoplay functionality
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    
    if (isPlaying) {
      interval = setInterval(() => {
        nextImage();
      }, 4000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, nextImage]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  // Animation for growing line elements
  const lineExpand = {
    hidden: { width: 0 },
    visible: { 
      width: "100%",
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }
    }
  };

  // Animation for image reveal
  const imageReveal = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  // Animation for list items with staggered entries
  const listContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const listItem = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Service features
  const serviceFeatures = [
    "Talleres autorizados equipados con tecnología de punta",
    "Personal técnico certificado por las marcas",
    "Amplio stock de repuestos genuinos",
    "Atención rápida y personalizada",
    "Soluciones inmediatas para tu vehículo"
  ];

  return (
    <section className="w-full bg-gradient-to-b from-[#0A0A0A] to-[#111111] text-white py-20 overflow-hidden">
      {/* Title Bar Section - Top Accent */}
      <div className="w-full border-b border-white/10 mb-16">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="flex flex-col items-start py-6"
          >
            <span className="text-xs uppercase tracking-widest text-white/60 font-light mb-3">
              Servicio especializado
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight mb-8 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
              Posventa <span className="font-normal text-white/90">GOmotors</span>
            </h2>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Left Column - Gallery */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mb-8"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black rounded-sm">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={imageReveal}
                    className="absolute inset-0"
                  >
                    <Image
                      src={galleryImages[currentImage]}
                      alt={`Servicio postventa GOmotors ${currentImage + 1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      priority
                      className="brightness-[0.95]"
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Caption overlay for main image */}
                <div className="absolute left-0 bottom-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-8 px-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm font-light text-white/80 mb-1">GOmotors Taller</p>
                      <p className="text-lg font-light">Servicio oficial autorizado</p>
                    </div>
                    <div className="flex space-x-3 items-center">
                      <button 
                        onClick={prevImage}
                        aria-label="Imagen anterior"
                        className="w-8 h-8 flex items-center justify-center border border-white/30 rounded-full hover:bg-white/10 transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M15 18l-6-6 6-6" />
                        </svg>
                      </button>
                      
                      
                      
                      <button 
                        onClick={nextImage}
                        aria-label="Siguiente imagen"
                        className="w-8 h-8 flex items-center justify-center border border-white/30 rounded-full hover:bg-white/10 transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </button>
                      
                      <span className="text-sm font-light ml-2 text-white/80">
                        {currentImage + 1}/{galleryImages.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Thumbnail Strip */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="mb-6 md:mb-0"
            >
              <div className="grid grid-cols-8 gap-2">
                {galleryImages.map((image, index) => (
                  <div 
                    key={index}
                    className={`relative aspect-square cursor-pointer overflow-hidden rounded-sm ${
                      currentImage === index ? 'ring-1 ring-white brightness-100' : 'opacity-60 hover:opacity-90 brightness-75 transition-all'
                    }`}
                    onClick={() => setCurrentImage(index)}
                  >
                    <Image
                      src={image}
                      alt={`Miniatura ${index + 1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Right Column - Content */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInRight}
              className="mb-12"
            >
              <div className="flex items-center mb-6">
                <div className="w-8 h-[1px] bg-white/30 mr-4"></div>
                <span className="text-sm uppercase tracking-widest text-white/60 font-light">Servicio posventa</span>
              </div>
              
              <p className="text-xl text-white/90 font-light leading-relaxed mb-8">
                En GOmotors contamos con el servicio posventa más grande del sur del país, respaldado oficialmente por todas las marcas que distribuimos.
              </p>
              <p className="text-lg text-white/70 font-light leading-relaxed mb-10">
                Nuestros talleres autorizados están equipados con tecnología de punta y personal técnico certificado, preparado para cuidar tu vehículo como el primer día.
              </p>
              
              <div className="w-full h-[1px] bg-white/10 my-8">
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={lineExpand} 
                  className="h-full bg-white/30"
                ></motion.div>
              </div>
            </motion.div>
            
            {/* Service Features List */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={listContainer}
              className="mb-12"
            >
              <h3 className="text-lg font-normal mb-6">Nuestros servicios incluyen:</h3>
              <div className="space-y-5">
                {serviceFeatures.map((feature, index) => (
                  <motion.div key={index} variants={listItem} className="flex items-start">
                    <div className="mr-4 mt-1">
                      <div className="w-6 h-[1px] bg-white/40"></div>
                    </div>
                    <p className="text-base text-white/80 font-light">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Quote Box */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="mt-auto"
            >
              <div className="bg-white/5 p-8 border-t border-l border-white/10 rounded-sm">
                <p className="text-lg text-white/80 font-light italic mb-6">
                  "Porque la verdadera confianza comienza después de la compra."
                </p>
                <div className="w-12 h-[1px] bg-white/30 my-6"></div>
                <p className="text-base text-white/70 font-light mb-4">
                  Tu tranquilidad es nuestra prioridad. Aquí no solo damos servicio, creamos relaciones de largo plazo.
                </p>
                
                {/* Visual accent element */}
                <div className="flex space-x-3 pt-4">
                  <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-white/30 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-white/10 rounded-full"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostventaGO; 