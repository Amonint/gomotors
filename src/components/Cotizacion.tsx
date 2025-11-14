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
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | "partial" | null>(null);
  const [submitMessage, setSubmitMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // Validación de teléfono
  const validatePhone = (telefono: string): { isValid: boolean; error?: string } => {
    if (/[a-zA-Z]/.test(telefono)) {
      return { isValid: false, error: 'El teléfono no puede contener letras' };
    }

    const allowedCharsRegex = /^[\d\s\-\(\)\+\.]+$/;
    if (!allowedCharsRegex.test(telefono)) {
      return { isValid: false, error: 'Solo se permiten números, espacios, guiones, paréntesis y +' };
    }

    const digitsOnly = telefono.replace(/\D/g, '');
    if (digitsOnly.length > 0 && digitsOnly.length < 7) {
      return { isValid: false, error: 'El teléfono debe tener al menos 7 dígitos' };
    }

    if (digitsOnly.length > 15) {
      return { isValid: false, error: 'El teléfono no puede tener más de 15 dígitos' };
    }

    return { isValid: true };
  };

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
      // Validar teléfono en tiempo real
      if (name === 'telefono') {
        const validation = validatePhone(value);
        setPhoneError(validation.isValid ? "" : validation.error || "");
      }

      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar términos
    if (!formData.aceptaTerminos) {
      alert('Debes aceptar los términos y condiciones para continuar');
      return;
    }

    // Validar teléfono antes de enviar
    const phoneValidation = validatePhone(formData.telefono);
    if (!phoneValidation.isValid) {
      alert(phoneValidation.error);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");

    let dbSuccess = false;
    let emailSuccess = false;
    let dbError = "";
    let emailError = "";

    try {
      // Enviar a SQLite primero
      try {
        const dbResponse = await fetch("/api/cotizaciones", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (dbResponse.ok) {
          dbSuccess = true;
        } else {
          const errorData = await dbResponse.json().catch(() => null);
          dbError = errorData?.error || 'Error al guardar en base de datos';
        }
      } catch (error) {
        dbError = 'Error de conexión con la base de datos';
      }

      // Enviar email (original)
      try {
        const emailResponse = await fetch("https://us-central1-gomotors-web.cloudfunctions.net/sendCotizacionEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (emailResponse.ok) {
          emailSuccess = true;
        } else {
          emailError = 'Error al enviar el email de cotización';
        }
      } catch (error) {
        emailError = 'Error de conexión con el servicio de email';
      }

      // Determinar el estado final y mensaje
      if (dbSuccess && emailSuccess) {
        setSubmitStatus("success");
        setSubmitMessage("¡Tu cotización ha sido enviada correctamente! Se ha guardado en nuestro sistema y enviado por email.");
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
        setPhoneError("");
      } else if (dbSuccess || emailSuccess) {
        setSubmitStatus("partial");
        if (dbSuccess) {
          setSubmitMessage("Tu cotización se ha guardado en nuestro sistema correctamente, pero hubo un problema al enviar el email. Nos contactaremos contigo pronto.");
        } else {
          setSubmitMessage("Tu cotización se ha enviado por email correctamente, pero hubo un problema al guardarla en nuestro sistema. Aún así, la hemos recibido.");
        }
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
        setPhoneError("");
      } else {
        setSubmitStatus("error");
        const errors = [dbError, emailError].filter(Boolean);
        setSubmitMessage(`No se pudo procesar tu cotización: ${errors.join(' y ')}`);
      }

    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage("Ocurrió un error inesperado. Por favor, verifica tu conexión a internet e intenta nuevamente.");
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
                src="/images/logogomo.png"
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
              className={`w-full px-6 py-4 border rounded-lg focus:ring-2 focus:border-neutral-500 transition-colors text-black bg-white text-base ${
                phoneError
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-neutral-300 focus:ring-neutral-500'
              }`}
              placeholder="Ingresa tu teléfono"
            />
            {phoneError && (
              <p className="mt-2 text-sm text-red-600">
                {phoneError}
              </p>
            )}
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg text-center"
            >
              <div className="flex items-center justify-center mb-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <p className="text-green-700 font-medium mb-2">
                {submitMessage}
              </p>
              <p className="text-green-600 text-sm">
                Uno de nuestros asesores te contactará pronto con una oferta personalizada.
              </p>
            </motion.div>
          )}

          {submitStatus === "partial" && (
            <motion.div
              variants={formItem}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-6 bg-yellow-50 border border-yellow-200 rounded-lg text-center"
            >
              <div className="flex items-center justify-center mb-3">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
              <p className="text-yellow-700 font-medium mb-2">
                {submitMessage}
              </p>
              <p className="text-yellow-600 text-sm">
                Nos contactaremos contigo pronto.
              </p>
            </motion.div>
          )}

          {submitStatus === "error" && (
            <motion.div
              variants={formItem}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-6 bg-red-50 border border-red-200 rounded-lg text-center"
            >
              <div className="flex items-center justify-center mb-3">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              <p className="text-red-700 font-medium mb-2">
                {submitMessage}
              </p>
              <p className="text-red-600 text-sm">
                Si el problema persiste, puedes contactarnos directamente al 072731143.
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