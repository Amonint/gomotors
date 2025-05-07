"use client";

import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  // 4 imágenes con diferentes proporciones
  const images = [
    "/images/about-us/about-us1.jpg",    // Coche blanco - grande (60%)
    "/images/about-us/about-us2.avif",   // Coche negro - grande
    "/images/about-us/about-us5.png",    // Detalle lateral - pequeña
    "/images/about-us/about-us6.jpg",    // Concesionario - pequeña
  ];

  // Animación para el contenedor
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Animación para cada imagen
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.7,
        ease: [0.43, 0.13, 0.23, 0.96] // Curva de easing elegante
      }
    }
  };

  return (
    <section id="about-us" className="h-screen bg-white text-black overflow-hidden font-tt-hoves">
      <div className="h-full flex flex-col lg:flex-row">
        {/* Grid Gallery con imágenes de diferentes proporciones */}
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative overflow-hidden">
          <motion.div 
            className="h-full w-full grid grid-cols-5 grid-rows-5 gap-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Imagen 1 - 60% Superior izquierda */}
            <motion.div 
              className="col-span-3 row-span-3 overflow-hidden"
              variants={itemVariants}
            >
              <img
                src={images[0]}
                alt="GOmotors vehículo Hyundai premium"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </motion.div>
            
            {/* Imagen 2 - 40% Superior derecha */}
            <motion.div 
              className="col-span-2 row-span-3 overflow-hidden"
              variants={itemVariants}
            >
              <img
                src={images[1]}
                alt="GOmotors SUV de lujo"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </motion.div>
            
            {/* Imagen 3 - 40% Inferior izquierda */}
            <motion.div 
              className="col-span-2 row-span-2 overflow-hidden"
              variants={itemVariants}
            >
              <img
                src={images[2]}
                alt="Detalle lateral de vehículo GOmotors"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </motion.div>
            
            {/* Imagen 4 - 60% Inferior derecha */}
            <motion.div 
              className="col-span-3 row-span-2 overflow-hidden"
              variants={itemVariants}
            >
              <img
                src={images[3]}
                alt="Concesionario GOmotors"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Texto "Sobre Nosotros" a la derecha */}
        <motion.div 
          className="w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-white"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="max-w-lg ml-auto flex flex-col items-end">
            <motion.h2 
              className="text-5xl md:text-6xl font-bold mb-5 text-right text-[#000000]"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Sobre Nosotros
            </motion.h2>

            {/* Línea decorativa */}
            <motion.div 
              className="w-24 h-px bg-black/30 mb-10"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
            />
            
            <motion.div 
              className="text-right space-y-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Primer párrafo combinado */}
              <p className="text-xl leading-relaxed tracking-wide text-black/80">
                En <span className="font-semibold">GOmotors</span>, orgullosamente parte del Grupo Empresarial Ortega, nos mueve la pasión por ofrecer las 
                mejores soluciones en bienes y servicios, con un enfoque especial en el sector automotriz. Representamos a reconocidas marcas como <span className="font-semibold">HYUNDAI</span>, <span className="font-semibold">GREAT WALL</span>, <span className="font-semibold">HAVAL</span>, <span className="font-semibold">SOUEAST</span> y <span className="font-semibold">SHINERAY</span> en las provincias 
                de Loja y Zamora Chinchipe, brindando a nuestros clientes vehículos de alta calidad, talleres autorizados, 
                centro de colisiones y repuestos genuinos.
              </p>
              
              {/* Segundo párrafo combinado */}
              <p className="text-lg leading-relaxed tracking-wide text-black/80">
                Nuestro equipo humano, altamente especializado y comprometido, trabaja cada día para garantizar un servicio 
                de excelencia, manteniendo elevados niveles de competitividad. Nos proyectamos como uno de los grupos económicos más rentables y respetados del país, liderando los 
                mercados en los que participamos y respondiendo de manera efectiva a las necesidades de nuestros clientes, 
                colaboradores y proveedores.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs; 