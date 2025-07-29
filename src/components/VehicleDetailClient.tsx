"use client";

import React, { useState } from "react";
import Image from "next/image";
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
  FaFileDownload,
  FaWhatsapp,
  FaPalette,
  FaCar,
  FaTimes,
} from "react-icons/fa";
import { Vehicle } from "@/services/vehicleService";
import AccesoriosShowroomModule from "./AccesoriosShowroomModule";
import Cotizacion from './Cotizacion';

interface VehicleDetailClientProps {
  vehicle: Vehicle;
  relatedVehicles: Vehicle[];
  onBack: () => void;
}

const VehicleDetailClient = ({
  vehicle,
  relatedVehicles,
  onBack,
}: VehicleDetailClientProps) => {
  const [activeTab, setActiveTab] = useState("specs");
  const [mainImageError, setMainImageError] = useState(false);

  /* Codigo modal para eleguir whatsapp o formulaio*/
  const [showModal, setShowModal] = useState(false);
  const [showCotizacionForm, setShowCotizacionForm] = useState(false);

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen pb-16">
      {/* Encabezado con imagen principal */}
      <div className="relative h-[80vh] w-full">
        <Image
          src={
            mainImageError || !vehicle.imagenBanner
              ? "/images/vehicle-placeholder.svg"
              : vehicle.imagenBanner
          }
          alt={`${vehicle.marca} ${vehicle.modelo}`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          onError={() => setMainImageError(true)}
          unoptimized={true}
        />

        <div className="absolute top-8 left-8">
          <button
            onClick={onBack}
            className="flex items-center text-white bg-black px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Volver
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
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
                ${Number(vehicle.precio || 0).toLocaleString()} USD
              </div>
              {vehicle.fichaTecnicaUrl && (
                <a
                  href={vehicle.fichaTecnicaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-400 hover:text-white border border-green-400 hover:bg-green-400 px-6 py-3 rounded-full transition-all duration-300 text-2lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FaFileDownload className="mr-2 text-2xl" />
                  Ficha técnica
                </a>
              )}
            </div>
          </div>

          {/* Descripción del vehículo */}
          <div className="mb-6">
            <p className="text-neutral-300 leading-relaxed">
              {vehicle.descripcion}
            </p>
          </div>

          {/* Tabs */}
          <div className="border-b border-neutral-700 mb-6">
            <div className="flex space-x-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab("specs")}
                className={`pb-4 px-1 whitespace-nowrap ${activeTab === "specs"
                  ? "border-b-2 border-white text-white"
                  : "text-neutral-400 hover:text-white"
                  }`}
              >
                Especificaciones
              </button>
              <button
                onClick={() => setActiveTab("features")}
                className={`pb-4 px-1 whitespace-nowrap ${activeTab === "features"
                  ? "border-b-2 border-white text-white"
                  : "text-neutral-400 hover:text-white"
                  }`}
              >
                Características
              </button>
              <button
                onClick={() => setActiveTab("gallery")}
                className={`pb-4 px-1 whitespace-nowrap ${activeTab === "gallery"
                  ? "border-b-2 border-white text-white"
                  : "text-neutral-400 hover:text-white"
                  }`}
              >
                Galería
              </button>
              <button
                onClick={() => setActiveTab("accessories")}
                className={`pb-4 px-1 whitespace-nowrap ${activeTab === "accessories"
                  ? "border-b-2 border-white text-white"
                  : "text-neutral-400 hover:text-white"
                  }`}
              >

                Accesorios
              </button>
            </div>
          </div>

          {/* Tab content */}
          {activeTab === "specs" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <FaGasPump className="mr-2 text-neutral-400" />
                    Motor
                  </h3>
                  <p className="text-neutral-300">
                    {vehicle.especificaciones.motor.principal}
                  </p>
                  <ul className="mt-2 space-y-2">
                    {vehicle.especificaciones.motor.adicionales.map(
                      (item, index) => (
                        <li
                          key={index}
                          className="flex items-center text-neutral-300"
                        >
                          <FaCheck className="mr-2 text-green-500" />
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <FaCogs className="mr-2 text-neutral-400" />
                    Transmisión
                  </h3>
                  <p className="text-neutral-300">
                    {vehicle.especificaciones.transmision.principal}
                  </p>
                  <ul className="mt-2 space-y-2">
                    {vehicle.especificaciones.transmision.adicionales.map(
                      (item, index) => (
                        <li
                          key={index}
                          className="flex items-center text-neutral-300"
                        >
                          <FaCheck className="mr-2 text-green-500" />
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <FaRoad className="mr-2 text-neutral-400" />
                    Consumo
                  </h3>
                  <p className="text-neutral-300">
                    {vehicle.especificaciones.consumo.principal}
                  </p>
                  <ul className="mt-2 space-y-2">
                    {vehicle.especificaciones.consumo.adicionales.map(
                      (item, index) => (
                        <li
                          key={index}
                          className="flex items-center text-neutral-300"
                        >
                          <FaCheck className="mr-2 text-green-500" />
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <FaTachometerAlt className="mr-2 text-neutral-400" />
                    Potencia
                  </h3>
                  <p className="text-neutral-300">
                    {vehicle.especificaciones.potencia.principal}
                  </p>
                  <ul className="mt-2 space-y-2">
                    {vehicle.especificaciones.potencia.adicionales.map(
                      (item, index) => (
                        <li
                          key={index}
                          className="flex items-center text-neutral-300"
                        >
                          <FaCheck className="mr-2 text-green-500" />
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "features" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <FaShieldAlt className="mr-2 text-neutral-400" />
                  Seguridad
                </h3>
                <p className="text-neutral-300">
                  {vehicle.caracteristicas.seguridad.principal}
                </p>
                <ul className="mt-2 space-y-2">
                  {vehicle.caracteristicas.seguridad.adicionales.map(
                    (item, index) => (
                      <li
                        key={index}
                        className="flex items-center text-neutral-300"
                      >
                        <FaCheck className="mr-2 text-green-500" />
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Colores Disponibles */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <FaPalette className="mr-2 text-neutral-400" />
                  Colores Disponibles
                </h3>
                <div className="flex flex-wrap gap-4">
                  {vehicle.coloresDisponibles.map((color, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full border border-neutral-500"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <FaStar className="mr-2 text-neutral-400" />
                  Confort
                </h3>
                <p className="text-neutral-300">
                  {vehicle.caracteristicas.confort.principal}
                </p>
                <ul className="mt-2 space-y-2">
                  {vehicle.caracteristicas.confort.adicionales.map(
                    (item, index) => (
                      <li
                        key={index}
                        className="flex items-center text-neutral-300"
                      >
                        <FaCheck className="mr-2 text-green-500" />
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <FaCar className="mr-2 text-neutral-400" />
                  Exterior
                </h3>
                <p className="text-neutral-300">
                  {vehicle.caracteristicas.exterior.principal}
                </p>
                <ul className="mt-2 space-y-2">
                  {vehicle.caracteristicas.exterior.adicionales.map(
                    (item, index) => (
                      <li
                        key={index}
                        className="flex items-center text-neutral-300"
                      >
                        <FaCheck className="mr-2 text-green-500" />
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {vehicle.imagenGaleria &&
                vehicle.imagenGaleria.map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <Image
                      src={image}
                      alt={`${vehicle.marca} ${vehicle.modelo} - Imagen ${index + 1
                        }`}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      unoptimized={true}
                    />
                  </div>
                ))}
            </div>
          )}

          {activeTab === "accessories" && (
            <div className="w-full">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  Accesorios Disponibles
                </h3>
                <p className="text-neutral-300">
                  Descubre los accesorios originales disponibles para complementar tu vehículo
                </p>
              </div>
              <AccesoriosShowroomModule />
            </div>
          )}
        </div>

        {/* Botón CTA WhatsApp */}
        <div className="bg-neutral-900 rounded-xl p-6 md:p-8 shadow-2xl mb-8 border border-neutral-700 text-center">
          <h2 className="text-2xl font-bold mb-4">
            ¿Te interesa este vehículo?
          </h2>
          <p className="text-neutral-300 mb-6">
            Contáctanos vía WhatsApp para obtener más información y cotizar este{" "}
            {vehicle.marca} {vehicle.modelo}
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-200"
          >
            <FaWhatsapp className="mr-2 text-xl" />
            Cotizar por WhatsApp
          </button>
        </div>

        {/* Modal de opciones */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-neutral-900 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl border border-neutral-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">
                  ¿Cómo te gustaría cotizar?
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setShowCotizacionForm(true);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  📋 Déjanos tus datos
                </button>

                <button
                  onClick={() => {
                    setShowModal(false);
                    window.open(
                      `https://wa.me/593999454243?text=Hola, me interesa el ${vehicle.marca} ${vehicle.modelo} ${vehicle.año}`,
                      '_blank'
                    );
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <FaWhatsapp className="mr-2 text-xl" />
                  Cotizar por WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal del formulario de cotización */}
        {showCotizacionForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-xl font-bold text-neutral-900">
                  Formulario de Cotización
                </h3>
                <button
                  onClick={() => setShowCotizacionForm(false)}
                  className="text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              <div className="p-6">
                <Cotizacion />
              </div>
            </div>
          </div>
        )}

        {/* Vehículos relacionados */}
        {relatedVehicles.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Más {vehicle.tipoVehiculo} que te pueden interesar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedVehicles
                .filter(
                  (relatedVehicle) =>
                    relatedVehicle.tipoVehiculo === vehicle.tipoVehiculo &&
                    relatedVehicle.id !== vehicle.id
                )
                .slice(0, 3)
                .map((relatedVehicle) => (
                  <div
                    key={relatedVehicle.id}
                    className="group cursor-pointer"
                    onClick={onBack}
                  >
                    <div className="bg-black text-white rounded-lg overflow-hidden transition-all hover:scale-[1.02] duration-300 group shadow-sm hover:shadow-white/10 border border-neutral-700">
                      {/* Imagen del vehículo */}
                      <div className="relative w-full h-48 sm:h-56 overflow-hidden">
                        <Image
                          src={
                            relatedVehicle.imagenTarjeta ||
                            "/images/vehicle-placeholder.svg"
                          }
                          alt={`${relatedVehicle.marca} ${relatedVehicle.modelo}`}
                          fill
                          className="object-cover transition-transform group-hover:scale-105 duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                          priority={false}
                          unoptimized={true}
                        />

                        {/* Badge de tipo */}
                        <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-900 backdrop-blur-sm">
                          {relatedVehicle.tipoVehiculo}
                        </div>

                        {/* Badge de marca */}
                        <div className="absolute top-3 left-3 bg-black/80 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                          {relatedVehicle.marca}
                        </div>
                      </div>

                      {/* Contenido */}
                      <div className="p-4 sm:p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-base sm:text-lg font-bold text-white">
                            {relatedVehicle.modelo}
                          </h3>
                          <span className="text-neutral-400 font-semibold">
                            {relatedVehicle.año}
                          </span>
                        </div>

                        <p className="text-neutral-400 text-sm line-clamp-2 mb-4">
                          {relatedVehicle.descripcion}
                        </p>

                        {/* Especificaciones */}
                        <div className="grid grid-cols-2 gap-3 mb-5">
                          <div className="flex items-center">
                            <FaGasPump className="text-neutral-500 mr-2 flex-shrink-0" />
                            <span className="text-xs text-neutral-400 line-clamp-1">
                              {relatedVehicle.especificaciones.motor.principal}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <FaCogs className="text-neutral-500 mr-2 flex-shrink-0" />
                            <span className="text-xs text-neutral-400 line-clamp-1">
                              {
                                relatedVehicle.especificaciones.transmision
                                  .principal
                              }
                            </span>
                          </div>
                          <div className="flex items-center">
                            <FaRoad className="text-neutral-500 mr-2 flex-shrink-0" />
                            <span className="text-xs text-neutral-400 line-clamp-1">
                              {
                                relatedVehicle.especificaciones.consumo
                                  .principal
                              }
                            </span>
                          </div>
                          <div className="flex items-center">
                            <FaTachometerAlt className="text-neutral-500 mr-2 flex-shrink-0" />
                            <span className="text-xs text-neutral-400 line-clamp-1">
                              {
                                relatedVehicle.especificaciones.potencia
                                  .principal
                              }
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-lg font-bold text-white">
                            $
                            {Number(
                              relatedVehicle.precio || 0
                            ).toLocaleString()}{" "}
                            USD
                          </div>
                          <div className="bg-neutral-800 text-white font-medium rounded-full px-4 py-1.5 text-sm hover:bg-neutral-700 transition-colors">
                            Ver detalles
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleDetailClient;
