"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const Cotizacion = () => {
  const containerRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    telefono: '',
    ciudad: '',
    marcaInteres: '',
    segmento: '',
    formaPago: '',
    comentario: '',
    aceptaTerminos: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Line animation
  const lineExpand = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
    },
  };

  // Form animation
  const formContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const formItem = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.aceptaTerminos) {
      alert('Debes aceptar los términos y condiciones para continuar');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://us-central1-gomotors-web.cloudfunctions.net/sendCotizacionEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          nombreCompleto: '',
          telefono: '',
          ciudad: '',
          marcaInteres: '',
          segmento: '',
          formaPago: '',
          comentario: '',
          aceptaTerminos: false
        });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const marcas = ["HYUNDAI", "GWM", "HAVAL", "LIVAN", "SHINERAY", "DFKS", "TANK", "KINGLONG", "SWM"];
  const segmentos = ["Auto", "SUV", "Camioneta", "VAN", "CAMIÓN"];

  return (
    <section
      id="cotizacion"
      className="bg-neutral-100 overflow-hidden"
      ref={containerRef}
    >
      <div className="w-full bg-[#F5F5F5] border-b border-neutral-300">
        <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-16 lg:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleIn}
            className="flex flex-col items-center md:flex-row md:items-end md:justify-between"
          >
            <div className="relative h-32 w-72 mb-8 md:mb-0">
              <Image
                src="/images/logo-gomotors.png"
                alt="GOmotors Logo"
                fill
                style={{ objectFit: "contain" }}
                priority
                className="brightness-0 invert-0 contrast-100"
              />
            </div>

            <div className="text-right">
              <h2 className="text-lg md:text-xl font-light text-neutral-600 tracking-wide">
                Cotización Personalizada
              </h2>
              <h3 className="text-2xl md:text-3xl font-normal text-neutral-800 mt-2">
                Tu nuevo vehículo está más cerca
              </h3>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main content - Linear Layout */}
      <div className="max-w-[800px] mx-auto px-6 py-16 md:py-24">
        
        {/* Introduction */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <motion.div style={{ y: y1 }}>
            <span className="inline-block text-xs uppercase tracking-widest text-neutral-500 mb-6">
              Cotización gratuita
            </span>

            <h2 className="text-2xl md:text-3xl text-neutral-800 font-light leading-relaxed mb-8">
              Tu nuevo vehículo está más cerca de lo que imaginas.
            </h2>

            <p className="text-lg text-neutral-600 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
              Solo llena este formulario y déjanos ayudarte a encontrar el modelo perfecto para ti. En minutos, uno de nuestros asesores te contactará con una oferta personalizada.
            </p>

            {/* Benefits section - DARK */}
            <div className="bg-[#0A0A0A] p-8 mx-auto max-w-md">
              <div className="flex items-center justify-center mb-6">
                <span className="block w-16 h-[2px] bg-neutral-700 mr-4"></span>
                <p className="text-neutral-400 text-sm font-medium uppercase tracking-wide">
                  Beneficios
                </p>
                <span className="block w-16 h-[2px] bg-neutral-700 ml-4"></span>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="border-t-2 border-neutral-700 pt-4 text-center">
                  <span className="text-2xl font-light text-white block">
                    Respuesta
                  </span>
                  <p className="text-xs text-neutral-400 mt-2">
                    En minutos
                  </p>
                </div>
                <div className="border-t-2 border-neutral-700 pt-4 text-center">
                  <span className="text-2xl font-light text-white block">
                    Personalizada
                  </span>
                  <p className="text-xs text-neutral-400 mt-2">
                    Para ti
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Form Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-[2px] bg-neutral-400 mr-4"></div>
            <h3 className="text-xl text-neutral-800 font-normal uppercase tracking-widest">
              Formulario de cotización
            </h3>
            <div className="w-12 h-[2px] bg-neutral-400 ml-4"></div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form 
          onSubmit={handleSubmit} 
          variants={formContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
        >
          {/* Nombre completo */}
          <motion.div variants={formItem}>
            <label htmlFor="nombreCompleto" className="block text-sm font-medium text-neutral-700 mb-3">
              Nombre completo *
            </label>
            <input
              type="text"
              id="nombreCompleto"
              name="nombreCompleto"
              required
              value={formData.nombreCompleto}
              onChange={handleInputChange}
              className="w-full px-6 py-4 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-colors text-black bg-white text-base"
              placeholder="Ingresa tu nombre completo"
            />
          </motion.div>

          {/* Teléfono */}
          <motion.div variants={formItem}>
            <label htmlFor="telefono" className="block text-sm font-medium text-neutral-700 mb-3">
              Teléfono *
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              required
              value={formData.telefono}
              onChange={handleInputChange}
              className="w-full px-6 py-4 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-colors text-black bg-white text-base"
              placeholder="Ingresa tu teléfono"
            />
          </motion.div>

          {/* Ciudad */}
          <motion.div variants={formItem}>
            <label htmlFor="ciudad" className="block text-sm font-medium text-neutral-700 mb-3">
              Ciudad *
            </label>
            <input
              type="text"
              id="ciudad"
              name="ciudad"
              required
              value={formData.ciudad}
              onChange={handleInputChange}
              className="w-full px-6 py-4 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-colors text-black bg-white text-base"
              placeholder="Ingresa tu ciudad"
            />
          </motion.div>

          {/* Marca de interés */}
          <motion.div variants={formItem}>
            <label htmlFor="marcaInteres" className="block text-sm font-medium text-neutral-700 mb-3">
              Marca de interés *
            </label>
            <select
              id="marcaInteres"
              name="marcaInteres"
              required
              value={formData.marcaInteres}
              onChange={handleInputChange}
              className="w-full px-6 py-4 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-colors text-black bg-white text-base"
            >
              <option value="">Selecciona una marca</option>
              {marcas.map((marca) => (
                <option key={marca} value={marca}>
                  {marca}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Segmento */}
          <motion.div variants={formItem}>
            <label htmlFor="segmento" className="block text-sm font-medium text-neutral-700 mb-3">
              Segmento *
            </label>
            <select
              id="segmento"
              name="segmento"
              required
              value={formData.segmento}
              onChange={handleInputChange}
              className="w-full px-6 py-4 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-colors text-black bg-white text-base"
            >
              <option value="">Selecciona un segmento</option>
              {segmentos.map((segmento) => (
                <option key={segmento} value={segmento}>
                  {segmento}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Forma de pago */}
          <motion.div variants={formItem}>
            <label htmlFor="formaPago" className="block text-sm font-medium text-neutral-700 mb-3">
              Forma de pago
            </label>
            <select
              id="formaPago"
              name="formaPago"
              value={formData.formaPago}
              onChange={handleInputChange}
              className="w-full px-6 py-4 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-colors text-black bg-white text-base"
            >
              <option value="">Selecciona una opción</option>
              <option value="Contado">Contado</option>
              <option value="Crédito">Crédito</option>
            </select>
          </motion.div>

          {/* Comentario adicional */}
          <motion.div variants={formItem}>
            <label htmlFor="comentario" className="block text-sm font-medium text-neutral-700 mb-3">
              Comentario adicional
            </label>
            <textarea
              id="comentario"
              name="comentario"
              rows={4}
              maxLength={200}
              value={formData.comentario}
              onChange={handleInputChange}
              className="w-full px-6 py-4 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-colors resize-none text-black bg-white text-base"
              placeholder="Cuéntanos más detalles sobre lo que buscas (máximo 200 caracteres)"
            />
            <p className="text-xs text-neutral-500 mt-2">
              {formData.comentario.length}/200 caracteres
            </p>
          </motion.div>

          {/* Terms and conditions checkbox */}
          <motion.div variants={formItem} className="pt-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="aceptaTerminos"
                name="aceptaTerminos"
                checked={formData.aceptaTerminos}
                onChange={handleInputChange}
                required
                className="mt-1 h-4 w-4 text-neutral-600 focus:ring-neutral-500 border-neutral-300 rounded"
              />
              <label htmlFor="aceptaTerminos" className="text-sm text-neutral-600 leading-relaxed">
                <span className="font-medium">Acepto los términos y condiciones *</span>
                <br />
                Autorizo de manera expresa, inequívoca y voluntaria a IOMOTORS S.A para recopilar, tratar, transferir a terceros y conservar mis datos personales, así como para su revisión ante el buró de crédito con la finalidad de cotizar el vehículo, y recibir comunicaciones o notificaciones sobre sus productos y servicios. Las fotografías son referenciales, el modelo y accesorios pueden variar.
              </label>
            </div>
          </motion.div>

          {/* Botón de envío */}
          <motion.div variants={formItem} className="pt-8">
            <button
              type="submit"
              disabled={!formData.aceptaTerminos || isSubmitting}
              className="w-full bg-[#0A0A0A] text-white px-8 py-5 rounded-lg font-medium hover:bg-neutral-800 disabled:bg-neutral-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-lg"
            >
              {isSubmitting ? "Enviando..." : "Enviar mi cotización"}
            </button>
          </motion.div>

          {/* Mensajes de estado */}
          {submitStatus === "success" && (
            <motion.div 
              variants={formItem}
              className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg text-center"
            >
              <p className="text-green-700 font-medium">
                ¡Tu cotización ha sido enviada correctamente! 
              </p>
              <p className="text-green-600 text-sm mt-2">
                Uno de nuestros asesores te contactará pronto con una oferta personalizada.
              </p>
            </motion.div>
          )}

          {submitStatus === "error" && (
            <motion.div 
              variants={formItem}
              className="mt-6 p-6 bg-red-50 border border-red-200 rounded-lg text-center"
            >
              <p className="text-red-700 font-medium">
                Hubo un error al enviar la cotización. Por favor, intenta nuevamente.
              </p>
              <p className="text-red-600 text-sm mt-2">
                Verifica tu conexión a internet y vuelve a intentarlo.
              </p>
            </motion.div>
          )}
        </motion.form>

        {/* Decorative line */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-32 h-[1px] bg-neutral-400 mx-auto mt-16 overflow-hidden"
        >
          <motion.div
            variants={lineExpand}
            className="h-full bg-neutral-800"
          ></motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Cotizacion;