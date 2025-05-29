"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaGasPump,
  FaCogs,
  FaRoad,
  FaTachometerAlt,
  FaCheck,
  FaShieldAlt,
  FaStar,
  FaCalendarAlt,
  FaSpinner,
  FaFileDownload,
} from "react-icons/fa";
import {
  Vehicle,
  getVehicleById,
  getVehicles,
} from "@/services/vehicleService";

const VehicleDetailPage = () => {
  const params = useParams();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [relatedVehicles, setRelatedVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("specs");

  useEffect(() => {
    const loadVehicle = async () => {
      setLoading(true);
      try {
        // Obtener el vehículo actual por ID
        const vehicleData = await getVehicleById(params.id as string);
        setVehicle(vehicleData);

        // Cargar vehículos relacionados
        if (vehicleData) {
          const allVehicles = await getVehicles();
          const related = allVehicles
            .filter(
              (v) =>
                v.tipoVehiculo === vehicleData.tipoVehiculo &&
                v.id !== vehicleData.id
            )
            .slice(0, 3);
          setRelatedVehicles(related);
        }
      } catch (error) {
        console.error("Error cargando datos del vehículo:", error);
      } finally {
        setLoading(false);
      }
    };

    loadVehicle();
  }, [params.id]);

  // Función para formatear precio (si se añade a la estructura)
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  // Si está cargando, mostrar indicador
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] w-full bg-white text-gray-800">
        <div className="text-center">
          <FaSpinner className="animate-spin text-5xl text-[#2563eb] mx-auto mb-4" />
          <p className="text-xl">Cargando información del vehículo...</p>
        </div>
      </div>
    );
  }

  // Si no se encuentra el vehículo
  if (!vehicle) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] w-full bg-white text-gray-800 px-4">
        <div className="text-center max-w-lg">
          <h2 className="text-3xl font-bold mb-4">Vehículo no encontrado</h2>
          <p className="text-gray-600 mb-8">
            Lo sentimos, el vehículo que estás buscando no está disponible o ha
            sido eliminado.
          </p>
          <Link
            href="/showroom"
            className="inline-flex items-center bg-gray-900 text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Volver al Showroom
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen pb-16">
      {/* Encabezado con imagen principal */}
      <div className="relative h-[50vh] w-full">
        <Image
          src={
            vehicle.imageUrls && vehicle.imageUrls.length > 0
              ? vehicle.imageUrls[0]
              : "/images/vehicle-placeholder.svg"
          }
          alt={`${vehicle.marca} ${vehicle.modelo}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent"></div>

        <div className="absolute top-8 left-8">
          <Link
            href="/showroom"
            className="flex items-center text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Volver
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-24 relative z-10">
        <div className="container mx-auto px-4 -mt-24 relative z-10">
          <div className="bg-neutral-900 rounded-xl p-6 md:p-8 shadow-2xl mb-8 border border-neutral-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <div className="inline-block bg-neutral-100 text-neutral-900 px-3 py-1 rounded-full text-sm font-bold mb-3 shadow-sm">
                  {vehicle.marca}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                  {vehicle.modelo}
                </h1>
                <div className="flex items-center text-neutral-300">
                  <FaCalendarAlt className="mr-2 text-neutral-400" />
                  <span>{vehicle.año}</span>
                  <span className="mx-3 text-neutral-500">•</span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-200 border border-neutral-700">
                    {vehicle.tipoVehiculo}
                  </span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col items-end">
                <div className="text-3xl font-bold text-white mb-2">
                  ${Number(vehicle.precio).toLocaleString()} USD
                </div>
                {vehicle.fichaTecnicaUrl && (
                  <a
                    href={vehicle.fichaTecnicaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-neutral-300 hover:text-white transition-colors duration-200"
                  >
                    <FaFileDownload className="mr-2" />
                    Ficha técnica
                  </a>
                )}
              </div>
            </div>

            <p className="text-neutral-300 mb-8 leading-relaxed">
              {vehicle.descripcion}
            </p>

            {/* Tabs para especificaciones, características y galería */}
            <div className="border-b border-neutral-700 mb-6">
              <div className="flex space-x-6">
                <button
                  onClick={() => setActiveTab("specs")}
                  className={`pb-3 px-1 font-medium transition-all duration-200 ${
                    activeTab === "specs"
                      ? "text-white border-b-2 border-neutral-200"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  Especificaciones
                </button>
                <button
                  onClick={() => setActiveTab("features")}
                  className={`pb-3 px-1 font-medium transition-all duration-200 ${
                    activeTab === "features"
                      ? "text-white border-b-2 border-neutral-200"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  Características
                </button>
                <button
                  onClick={() => setActiveTab("gallery")}
                  className={`pb-3 px-1 font-medium transition-all duration-200 ${
                    activeTab === "gallery"
                      ? "text-white border-b-2 border-neutral-200"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  Galería
                </button>
              </div>
            </div>

            {/* Contenido de los tabs */}
            <div className="mb-8">
              {/* Especificaciones técnicas */}
              {activeTab === "specs" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700 hover:bg-neutral-750 transition-colors duration-200">
                    <div className="flex items-center mb-4">
                      <FaGasPump className="text-neutral-300 text-2xl mr-3" />
                      <div>
                        <h3 className="text-sm text-neutral-400 uppercase tracking-wide">
                          Motor
                        </h3>
                        <p className="font-semibold text-white text-lg">
                          {vehicle.especificaciones.motor.principal}
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-3 text-sm text-neutral-300">
                      {vehicle.especificaciones.motor.adicionales.map(
                        (item, index) => (
                          <li key={index} className="flex items-center">
                            <FaCheck className="text-neutral-400 mr-3 text-xs" />{" "}
                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700 hover:bg-neutral-750 transition-colors duration-200">
                    <div className="flex items-center mb-4">
                      <FaCogs className="text-neutral-300 text-2xl mr-3" />
                      <div>
                        <h3 className="text-sm text-neutral-400 uppercase tracking-wide">
                          Transmisión
                        </h3>
                        <p className="font-semibold text-white text-lg">
                          {vehicle.especificaciones.transmision.principal}
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-3 text-sm text-neutral-300">
                      {vehicle.especificaciones.transmision.adicionales.map(
                        (item, index) => (
                          <li key={index} className="flex items-center">
                            <FaCheck className="text-neutral-400 mr-3 text-xs" />{" "}
                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700 hover:bg-neutral-750 transition-colors duration-200">
                    <div className="flex items-center mb-4">
                      <FaRoad className="text-neutral-300 text-2xl mr-3" />
                      <div>
                        <h3 className="text-sm text-neutral-400 uppercase tracking-wide">
                          Consumo
                        </h3>
                        <p className="font-semibold text-white text-lg">
                          {vehicle.especificaciones.consumo.principal}
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-3 text-sm text-neutral-300">
                      {vehicle.especificaciones.consumo.adicionales.map(
                        (item, index) => (
                          <li key={index} className="flex items-center">
                            <FaCheck className="text-neutral-400 mr-3 text-xs" />{" "}
                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700 hover:bg-neutral-750 transition-colors duration-200">
                    <div className="flex items-center mb-4">
                      <FaTachometerAlt className="text-neutral-300 text-2xl mr-3" />
                      <div>
                        <h3 className="text-sm text-neutral-400 uppercase tracking-wide">
                          Potencia
                        </h3>
                        <p className="font-semibold text-white text-lg">
                          {vehicle.especificaciones.potencia.principal}
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-3 text-sm text-neutral-300">
                      {vehicle.especificaciones.potencia.adicionales.map(
                        (item, index) => (
                          <li key={index} className="flex items-center">
                            <FaCheck className="text-neutral-400 mr-3 text-xs" />{" "}
                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </motion.div>
              )}

              {/* Características */}
              {activeTab === "features" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700 hover:bg-neutral-750 transition-colors duration-200">
                      <h3 className="font-semibold mb-4 flex items-center text-white text-lg">
                        <FaShieldAlt className="text-neutral-300 mr-3" />{" "}
                        Seguridad
                      </h3>
                      <ul className="space-y-3 text-sm text-neutral-300">
                        <li className="flex items-center font-medium">
                          <FaCheck className="text-neutral-400 mr-3 text-xs" />{" "}
                          {vehicle.caracteristicas.seguridad.principal}
                        </li>
                        {vehicle.caracteristicas.seguridad.adicionales.map(
                          (item, index) => (
                            <li key={index} className="flex items-center">
                              <FaCheck className="text-neutral-400 mr-3 text-xs" />{" "}
                              {item}
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700 hover:bg-neutral-750 transition-colors duration-200">
                      <h3 className="font-semibold mb-4 flex items-center text-white text-lg">
                        <FaStar className="text-neutral-300 mr-3" /> Confort
                      </h3>
                      <ul className="space-y-3 text-sm text-neutral-300">
                        <li className="flex items-center font-medium">
                          <FaCheck className="text-neutral-400 mr-3 text-xs" />{" "}
                          {vehicle.caracteristicas.confort.principal}
                        </li>
                        {vehicle.caracteristicas.confort.adicionales.map(
                          (item, index) => (
                            <li key={index} className="flex items-center">
                              <FaCheck className="text-neutral-400 mr-3 text-xs" />{" "}
                              {item}
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700 hover:bg-neutral-750 transition-colors duration-200">
                      <h3 className="font-semibold mb-4 flex items-center text-white text-lg">
                        <FaStar className="text-neutral-300 mr-3" /> Exterior
                      </h3>
                      <ul className="space-y-3 text-sm text-neutral-300">
                        <li className="flex items-center font-medium">
                          <FaCheck className="text-neutral-400 mr-3 text-xs" />{" "}
                          {vehicle.caracteristicas.exterior.principal}
                        </li>
                        {vehicle.caracteristicas.exterior.adicionales.map(
                          (item, index) => (
                            <li key={index} className="flex items-center">
                              <FaCheck className="text-neutral-400 mr-3 text-xs" />{" "}
                              {item}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
                    <h3 className="font-semibold mb-4 text-white text-lg">
                      Colores disponibles
                    </h3>
                    <div className="flex space-x-4 mt-4">
                      {vehicle.coloresDisponibles.map((color, index) => (
                        <div
                          key={index}
                          className="w-10 h-10 rounded-full border-2 border-neutral-600 cursor-pointer hover:border-neutral-400 transition-all duration-200 hover:scale-110 shadow-lg"
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Galería */}
              {activeTab === "gallery" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {vehicle.imageUrls.map((imageUrl, index) => (
                    <div
                      key={index}
                      className="relative aspect-[4/3] rounded-lg overflow-hidden bg-neutral-800 border border-neutral-700 hover:border-neutral-500 transition-all duration-200"
                    >
                      <Image
                        src={imageUrl}
                        alt={`${vehicle.marca} ${vehicle.modelo} - Imagen ${
                          index + 1
                        }`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/593961022800?text=Hola%2C%20estoy%20interesado%20en%20una%20cotizaci%C3%B3n"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-neutral-900 font-semibold py-4 px-8 rounded-lg hover:bg-neutral-100 hover:shadow-lg transition-all duration-200 flex-1 text-center border border-neutral-300 transform hover:scale-[1.02]"
              >
                Cotizar
              </a>
            </div>
          </div>

          {/* Vehículos relacionados */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8 text-white">
              Vehículos similares
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedVehicles.map((relatedVehicle) => (
                <Link
                  key={relatedVehicle.id}
                  href={`/showroom/vehicle/${relatedVehicle.id}`}
                >
                  <div className="bg-neutral-800 rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 group cursor-pointer border border-neutral-700 hover:border-neutral-600 hover:shadow-xl">
                    <div className="relative w-full h-48">
                      <Image
                        src={
                          relatedVehicle.imageUrls &&
                          relatedVehicle.imageUrls.length > 0
                            ? relatedVehicle.imageUrls[0]
                            : "/images/vehicle-placeholder.svg"
                        }
                        alt={`${relatedVehicle.marca} ${relatedVehicle.modelo}`}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-transparent to-transparent"></div>
                    </div>

                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-xs text-neutral-400 font-medium uppercase tracking-wide">
                            {relatedVehicle.marca}
                          </span>
                          <h3 className="font-bold text-white text-lg">
                            {relatedVehicle.modelo}
                          </h3>
                        </div>
                        <span className="text-neutral-300 font-medium">
                          {relatedVehicle.año}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailPage;
