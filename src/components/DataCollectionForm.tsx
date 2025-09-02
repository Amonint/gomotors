"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const DataCollectionForm = () => {
  const [formData, setFormData] = useState({
    nombres: "",
    email: "",
    cedulaPasaporte: "",
    telefono: "",
    ciudad: "",
    asesor: "",
    razon: "",
    comentario: "",
    aceptaPoliticas: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const asesores = [
    "Diego Paucar",
    "Wilson Luzuriaga",
    "Luis Ayala",
    "Pablo Vivanco",
    "Ricardo Capa",
    "Cristhian Maza",
    "Cristhian Espinosa",
    "Edgar Ruilova",
    "María Eugenia Montesinos",
    "Diego Jaramillo",
    "José Ríos",
    "Yury Illescas",
    "Cesar Gonzales"
  ];

  const razones = [
    "Mantenimiento",
    "Pregunta o Duda",
    "Cotización",
    "Solicitudes",
    "Asesoria"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    if (!formData.aceptaPoliticas) {
      setError("Debe aceptar las políticas de uso de datos para continuar.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Enviar a Firebase Function
      const response = await fetch("https://us-central1-gomotors-web.cloudfunctions.net/sendDataCollectionEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          nombres: "",
          email: "",
          cedulaPasaporte: "",
          telefono: "",
          ciudad: "",
          asesor: "",
          razon: "",
          comentario: "",
          aceptaPoliticas: false,
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
          <div className="absolute top-4 md:top-8 left-4 md:left-8">
            <Link
              href="/proteccion-datos"
              className="flex items-center text-white bg-black px-2 md:px-4 py-1 md:py-2 rounded-full hover:bg-neutral-800 transition-colors text-sm md:text-base"
            >
              <FaArrowLeft className="mr-2 text-white" /> Volver
            </Link>
          </div>

          <div className="flex flex-col items-center md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-normal text-neutral-800 mt-2">
                Recolección de Datos
              </h1>
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
              Complete el siguiente formulario para que podamos atender su solicitud de manera efectiva.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Nombres *
                  </label>
                  <input
                    type="text"
                    name="nombres"
                    value={formData.nombres}
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
                    Cédula o pasaporte *
                  </label>
                  <input
                    type="text"
                    name="cedulaPasaporte"
                    value={formData.cedulaPasaporte}
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
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent text-black bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Ciudad *
                  </label>
                  <input
                    type="text"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent text-black bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Asesor *
                  </label>
                  <select
                    name="asesor"
                    value={formData.asesor}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent text-black bg-white"
                  >
                    <option value="">Seleccione un asesor</option>
                    {asesores.map((asesor) => (
                      <option key={asesor} value={asesor}>
                        {asesor}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Razón *
                  </label>
                  <select
                    name="razon"
                    value={formData.razon}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent text-black bg-white"
                  >
                    <option value="">Seleccione una razón</option>
                    {razones.map((razon) => (
                      <option key={razon} value={razon}>
                        {razon}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Comentario o mensaje
                  </label>
                  <textarea
                    name="comentario"
                    value={formData.comentario}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent text-black bg-white resize-none"
                    placeholder="Escriba su comentario o mensaje aquí..."
                  />
                </div>
              </div>

              {/* Acuerdo de políticas */}
              <div className="mt-8 p-6 bg-neutral-50 border border-neutral-200 rounded-lg">
                <h3 className="text-lg font-medium text-neutral-800 mb-4">
                  Acuerdo de políticas de uso de datos:
                </h3>
                <p className="text-neutral-600 mb-4">
                  Autorizo de manera expresa, inequívoca y voluntaria a IOMOTORS S.A para tratar, recopilar y conservar mis datos personales, así como para su revisión ante el buro de crédito con la finalidad de cotizar el vehículo y recibir comunicaciones o notificaciones sobre sus productos o servicios.{" "}
                  <Link
                    href="/proteccion-datos"
                    className="text-black font-medium hover:text-neutral-600 transition-colors"
                  >
                    Política de Privacidad
                  </Link>
                  {" "}y{" "}
                  <Link
                    href="/cookies"
                    className="text-black font-medium hover:text-neutral-600 transition-colors"
                  >
                    Política de Cookies
                  </Link>
                  .
                </p>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="aceptaPoliticas"
                    name="aceptaPoliticas"
                    checked={formData.aceptaPoliticas}
                    onChange={handleCheckboxChange}
                    required
                    className="h-4 w-4 text-neutral-600 focus:ring-neutral-500 border-neutral-300 rounded"
                  />
                  <label htmlFor="aceptaPoliticas" className="ml-3 block text-sm text-neutral-700">
                    Acepto las políticas de uso de datos *
                  </label>
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

export default DataCollectionForm;
