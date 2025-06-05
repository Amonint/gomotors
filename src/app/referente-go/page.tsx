"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link"
interface FormData {
  referrerName: string;
  referrerLastName: string;
  referrerId: string;
  referrerPhone: string;
  referrerEmail: string;
  referredName: string;
  referredLastName: string;
  referredPhone: string;
  referredOccupation: string;
}

interface FormErrors {
  referrerId?: string;
}

export default function ReferenteGoPage() {
  const [formData, setFormData] = useState<FormData>({
    referrerName: "",
    referrerLastName: "",
    referrerId: "",
    referrerPhone: "",
    referrerEmail: "",
    referredName: "",
    referredLastName: "",
    referredPhone: "",
    referredOccupation: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const validarCedula = (cedula: string): boolean => {
    return cedula.length !== 10
      ? false
      : ((provincia) => (provincia < 1 || provincia > 24
          ? false
          : ((coeficientes) =>
              ((suma) => {
                const digitoVerificador = (10 - (suma % 10)) % 10;
                return digitoVerificador === parseInt(cedula[9], 10);
              })(
                cedula
                  .split('')
                  .slice(0, 9)
                  .map((d, i) => {
                    const valor = parseInt(d, 10) * coeficientes[i];
                    return valor >= 10 ? valor - 9 : valor;
                  })
                  .reduce((a, b) => a + b, 0)
              ))([2, 1, 2, 1, 2, 1, 2, 1, 2])
        ))(parseInt(cedula.substring(0, 2), 10));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://us-central1-gomotors-web.cloudfunctions.net/sendReferralEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          referrerName: "",
          referrerLastName: "",
          referrerId: "",
          referrerPhone: "",
          referrerEmail: "",
          referredName: "",
          referredLastName: "",
          referredPhone: "",
          referredOccupation: "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error de cédula cuando el usuario empiece a escribir
    if (name === "referrerId" && errors.referrerId) {
      setErrors((prev) => ({
        ...prev,
        referrerId: undefined,
      }));
    }
  };

  const handleCedulaBlur = () => {
    if (formData.referrerId && formData.referrerId.length > 0) {
      if (!validarCedula(formData.referrerId)) {
        setErrors({ referrerId: "La cédula ingresada no es válida" });
      }
    }
  };

  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="w-full bg-[#F5F5F5] border-b border-neutral-300">
        <div className="max-w-[1600px] mx-auto px-6 py-12 md:py-16 lg:py-20">
          <div className="absolute top-8 left-8">
            <Link
              href="/"
              className="flex items-center text-white bg-black px-4 py-2 rounded-full hover:bg-neutral-800 transition-colors"
            >
              <FaArrowLeft className="mr-2 text-white" /> Volver
            </Link>
          </div>

          <div className="flex flex-col items-center md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-lg md:text-xl font-light text-neutral-600 tracking-wide">
                Programa de Referidos
              </h2>
              <h3 className="text-2xl md:text-3xl font-normal text-neutral-800 mt-2">
                ¡Recomienda, comparte y gana!
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Datos del referido */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">
                Tus datos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="referrerName"
                    value={formData.referrerName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent text-black bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    name="referrerLastName"
                    value={formData.referrerLastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent text-black bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    C.I.
                  </label>
                  <input
                    type="text"
                    name="referrerId"
                    value={formData.referrerId}
                    onChange={handleChange}
                    onBlur={handleCedulaBlur}
                    maxLength={10}
                    pattern="[0-9]*"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent text-black bg-white ${
                      errors.referrerId ? 'border-red-500' : 'border-neutral-300'
                    }`}
                  />
                  {errors.referrerId && (
                    <p className="text-red-500 text-sm mt-1">{errors.referrerId}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Número de celular
                  </label>
                  <input
                    type="tel"
                    name="referrerPhone"
                    value={formData.referrerPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent text-black bg-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    name="referrerEmail"
                    value={formData.referrerEmail}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent text-black bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Datos de la persona referida */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">
                Datos de tu referido
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="referredName"
                    value={formData.referredName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent text-black bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    name="referredLastName"
                    value={formData.referredLastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent text-black bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Número de celular
                  </label>
                  <input
                    type="tel"
                    name="referredPhone"
                    value={formData.referredPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent text-black bg-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    A qué se dedica tu referido
                  </label>
                  <input
                    type="text"
                    name="referredOccupation"
                    value={formData.referredOccupation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent text-black bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Botón de envío */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black text-white px-8 py-3 rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </button>
            </div>

            {/* Mensajes de estado */}
            {submitStatus === "success" && (
              <div className="text-center text-green-600">
                ¡Formulario enviado con éxito! Nos pondremos en contacto contigo pronto.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="text-center text-red-600">
                Hubo un error al enviar el formulario. Por favor, intenta nuevamente.
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}