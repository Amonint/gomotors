"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const DataProtectionForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    id: "",
    phone: "",
    email: "",
    restrictions: {
      offers: false,
      surveys: false,
      maintenance: false,
      newProducts: false,
      all: false,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    if (name === "all") {
      setFormData((prev) => ({
        ...prev,
        restrictions: {
          offers: checked,
          surveys: checked,
          maintenance: checked,
          newProducts: checked,
          all: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        restrictions: {
          ...prev.restrictions,
          [name]: checked,
          all: false,
        },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      // Enviar a Firebase Function
      const response = await fetch("https://us-central1-gomotors-web.cloudfunctions.net/sendDataProtectionEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          lastName: "",
          id: "",
          phone: "",
          email: "",
          restrictions: {
            offers: false,
            surveys: false,
            maintenance: false,
            newProducts: false,
            all: false,
          },
        });
      } else {
        setError("Error al enviar la solicitud. Por favor, inténtalo de nuevo.");
      }
    } catch (err) {
      console.error("Error enviando solicitud:", err);
      setError("Error al enviar la solicitud. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="w-full bg-[#F5F5F5] border-b border-neutral-300">
        <div className="max-w-[1600px] mx-auto px-6 py-12 md:py-16 lg:py-20">
          <div className="absolute top-8 left-8">
            <Link
              href="/proteccion-datos"
              className="flex items-center text-white bg-black px-4 py-2 rounded-full hover:bg-neutral-800 transition-colors"
            >
              <FaArrowLeft className="mr-2 text-white" /> Volver
            </Link>
          </div>

          <div className="flex flex-col items-center md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-lg md:text-xl font-light text-neutral-600 tracking-wide">
                PROTECCIÓN DE DATOS
              </h2>
              <h3 className="text-2xl md:text-3xl font-normal text-neutral-800 mt-2">
                BAJA DE INFORMACIÓN PERSONAL
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
          {/* Datos personales */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200">
            <p className="text-neutral-600 mb-8">
              Comprometidos con la protección de sus datos personales, por medio de este formulario puede indicarnos de que área damos de baja tus datos personales.
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
                    Cédula *
                  </label>
                  <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                    required
                    maxLength={10}
                    pattern="[0-9]*"
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
                    Email *
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
              </div>

              {/* Restricciones de datos */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-neutral-800 mb-4">
                  Deseo restringir el uso de mis datos para las siguientes finalidades
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="offers"
                      name="offers"
                      checked={formData.restrictions.offers}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-neutral-600 focus:ring-neutral-500 border-neutral-300 rounded"
                    />
                    <label htmlFor="offers" className="ml-3 block text-sm text-neutral-700">
                      Envío de ofertas y promociones
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="surveys"
                      name="surveys"
                      checked={formData.restrictions.surveys}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-neutral-600 focus:ring-neutral-500 border-neutral-300 rounded"
                    />
                    <label htmlFor="surveys" className="ml-3 block text-sm text-neutral-700">
                      Envío de encuestas de satisfacción
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="maintenance"
                      name="maintenance"
                      checked={formData.restrictions.maintenance}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-neutral-600 focus:ring-neutral-500 border-neutral-300 rounded"
                    />
                    <label htmlFor="maintenance" className="ml-3 block text-sm text-neutral-700">
                      Envío de información y gestión de citas y mantenimientos (posventa)
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="newProducts"
                      name="newProducts"
                      checked={formData.restrictions.newProducts}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-neutral-600 focus:ring-neutral-500 border-neutral-300 rounded"
                    />
                    <label htmlFor="newProducts" className="ml-3 block text-sm text-neutral-700">
                      Envío de información de nuevos productos y servicios
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="all"
                      name="all"
                      checked={formData.restrictions.all}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-neutral-600 focus:ring-neutral-500 border-neutral-300 rounded"
                    />
                    <label htmlFor="all" className="ml-3 block text-sm text-neutral-700">
                      Todas las anteriores
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black text-white px-8 py-3 rounded-lg hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Enviando..." : "Enviar solicitud"}
                </button>
              </div>

              {/* Mensajes de estado */}
              {success && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 text-center">
                    ¡Tu solicitud ha sido enviada correctamente! Te contactaremos pronto.
                  </p>
                </div>
              )}

              {error && (
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
};

export default DataProtectionForm; 