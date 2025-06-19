"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

interface ContratacionFormData {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  message: string;
  cv: File | null;
  acceptTerms: boolean;
}

export function ContratacionForm() {
  const [formData, setFormData] = useState<ContratacionFormData>({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    message: "",
    cv: null,
    acceptTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    if (file && file.type !== "application/pdf") {
      setError("Solo se permiten archivos PDF.");
      setFormData((prev) => ({ ...prev, cv: null }));
      return;
    }
    setError("");
    setFormData((prev) => ({ ...prev, cv: file }));
  }

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      // Convertir CV a base64 si existe
      let cvBase64 = "";
      if (formData.cv) {
        const reader = new FileReader();
        cvBase64 = await new Promise((resolve, reject) => {
          reader.onload = () => {
            const result = reader.result as string;
            // Remover el prefijo "data:application/pdf;base64,"
            resolve(result.split(',')[1]);
          };
          reader.onerror = reject;
          reader.readAsDataURL(formData.cv as File);
        });
      }

      // Preparar datos para enviar
      const dataToSend = {
        name: formData.name,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        message: formData.message,
        cv: cvBase64
      };

      // Enviar a Firebase Function
      const response = await fetch("https://us-central1-gomotors-web.cloudfunctions.net/sendContratacionEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          lastName: "",
          email: "",
          phone: "",
          position: "",
          message: "",
          cv: null,
          acceptTerms: false,
        });
        // Limpiar el input de archivo
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      } else {
        setError("Error al enviar el formulario. Por favor, inténtalo de nuevo.");
      }
    } catch (err) {
      console.error("Error enviando formulario:", err);
      setError("Error al enviar el formulario. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="w-full bg-[#F5F5F5] border-b border-neutral-300">
      <div className="absolute top-8 left-8">
            <Link
              href="/proteccion-datos"
              className="flex items-center text-white bg-black px-4 py-2 rounded-full hover:bg-neutral-800 transition-colors"
            >
              <FaArrowLeft className="mr-2 text-white" /> Volver
            </Link>
          </div>
        <div className="max-w-[1600px] mx-auto px-6 py-12 md:py-16 lg:py-20">
          <div className="flex flex-col items-center md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-lg md:text-xl font-light text-neutral-600 tracking-wide">
                CONTRATACIÓN
              </h2>
              <h3 className="text-2xl md:text-3xl font-normal text-neutral-800 mt-2">
                ÚNETE A NUESTRO EQUIPO
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
          <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200">
            <p className="text-neutral-600 mb-8">
              Completa el siguiente formulario para aplicar a una vacante. Adjunta tu CV en PDF.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent text-black bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Apellidos *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent text-black bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent text-black bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent text-black bg-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Puesto al que desea aplicar *
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent text-black bg-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Mensaje (opcional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent text-black bg-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Adjuntar CV (PDF) *
                  </label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg bg-white text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neutral-200 file:text-neutral-700 hover:file:bg-neutral-300"
                  />
                  {formData.cv && (
                    <span className="text-sm text-neutral-600 mt-2 block">
                      Archivo seleccionado: {formData.cv.name}
                    </span>
                  )}
                  {error && (
                    <span className="text-sm text-red-600 mt-2 block">{error}</span>
                  )}
                </div>
              </div>

              {/* Términos y Condiciones */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleCheckboxChange}
                  required
                  className="h-4 w-4 text-black focus:ring-neutral-500 border-neutral-300 rounded mt-1"
                />
                <label htmlFor="acceptTerms" className="text-sm text-neutral-700">
                  Acepto los{" "}
                  <Link
                    href="/proteccion-datos"
                    className="font-bold text-black hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Términos y Condiciones
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !formData.acceptTerms}
                className="w-full py-3 px-6 bg-black text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors disabled:opacity-60"
              >
                {isSubmitting ? "Enviando..." : "Enviar solicitud"}
              </button>
              {success && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 text-center">
                    ¡Tu solicitud ha sido enviada correctamente! Te contactaremos pronto.
                  </p>
                </div>
              )}

              {error && !formData.cv && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-center">{error}</p>
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 