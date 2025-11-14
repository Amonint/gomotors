"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import ShowroomFilter from "@/components/ShowroomFilter";
import VehicleCard from "@/components/VehicleCard";
import VehicleDetailClient from "@/components/VehicleDetailClient";
import { Vehicle, getVehicles, getVehicleById } from "@/services/vehicleService";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

interface ActiveFilters {
  brands: string[];
  types: string[];
  features: string[];
}

const ShowroomPage = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [relatedVehicles, setRelatedVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    brands: [],
    types: [],
    features: [],
  });

  const loadVehicleDetail = useCallback(async (vehicleId: string) => {
    try {
      const vehicle = await getVehicleById(vehicleId);
      if (vehicle) {
        setSelectedVehicle(vehicle);
        setViewMode('detail');

        // Hacer scroll al principio de la página
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Cargar vehículos relacionados
        const related = vehicles
          .filter((v) => v.tipoVehiculo === vehicle.tipoVehiculo && v.id !== vehicle.id)
          .slice(0, 3);
        setRelatedVehicles(related);
      }
    } catch (error) {
      console.error("Error al cargar vehículo:", error);
    }
  }, [vehicles]);

  // Detectar parámetros de URL del lado del cliente
  useEffect(() => {
    const checkUrlParams = () => {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const vehicleId = urlParams.get('vehicle');
        
        if (vehicleId && vehicles.length > 0) {
          loadVehicleDetail(vehicleId);
        }
      }
    };

    checkUrlParams();
  }, [vehicles, loadVehicleDetail]);

  useEffect(() => {
    const loadVehicles = async () => {
      setLoading(true);
      try {
        const data = await getVehicles();
        setVehicles(data);
        setFilteredVehicles(data);
      } catch (error) {
        console.error("Error al cargar vehículos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadVehicles();
  }, []);

  const brands =
    vehicles.length > 0
      ? [...new Set(vehicles.map((vehicle) => vehicle.marca))]
      : [];

  useEffect(() => {
    if (vehicles.length === 0) return;

    let result = [...vehicles];

    if (activeFilters.brands.length > 0) {
      result = result.filter((vehicle) =>
        activeFilters.brands.includes(vehicle.marca)
      );
    }

    if (activeFilters.features.length > 0) {
      result = result.filter((vehicle) =>
        activeFilters.features.every((feature) => {
          const hasInConfort =
            vehicle.caracteristicas.confort.principal.includes(feature) ||
            vehicle.caracteristicas.confort.adicionales.some((item) =>
              item.includes(feature)
            );
          return hasInConfort;
        })
      );
    }

    setFilteredVehicles(result);
  }, [activeFilters, vehicles]);

  const updateFilters = (filterType: keyof ActiveFilters, value: string[]) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setViewMode('detail');

    // Hacer scroll al principio de la página
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Actualizar URL sin recargar la página
      const newUrl = `/showroom?vehicle=${vehicle.id}`;
      window.history.pushState({}, '', newUrl);
    }

    // Cargar vehículos relacionados
    const related = vehicles
      .filter((v) => v.tipoVehiculo === vehicle.tipoVehiculo && v.id !== vehicle.id)
      .slice(0, 3);
    setRelatedVehicles(related);
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedVehicle(null);

    // Hacer scroll al principio de la página
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Actualizar URL sin recargar la página
      window.history.pushState({}, '', '/showroom');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Cargando showroom...</p>
        </div>
      </div>
    );
  }

  if (viewMode === 'detail' && selectedVehicle) {
    return (
      <VehicleDetailClient 
        vehicle={selectedVehicle} 
        relatedVehicles={relatedVehicles}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <section className="w-full bg-black min-h-screen text-white py-16">
      <div className="absolute top-8 left-8">
            <Link
              href="/"
              className="flex items-center text-white bg-black px-4 py-2 rounded-full hover:bg-neutral-800 transition-colors"
            >
              <FaArrowLeft className="mr-2 text-white" /> Volver
            </Link>
          </div>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-12 px-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            VEHÍCULOS <span className="text-white">MULTIMARCAS</span>
          </h1>

          <p className="text-lg text-neutral-400 mb-3 leading-normal">
            Explora el vehículo que te conviene:{" "}
            <span className="text-white">Autos, SUV, Camionetas, VAN</span> y{" "}
            <span className="text-white">Camiones</span>.
          </p>

          <p className="text-base text-neutral-400 leading-normal">
            En nuestro showroom multimarca encontrarás una amplia variedad de
            modelos pensados para cada estilo de vida y necesidad. Desde
            vehículos compactos y familiares, hasta camionetas 4x4, VANs de
            trabajo o camiones de carga, tenemos la opción perfecta para ti.
            <br />
            <span className="text-white font-medium">
              Estás a un clic de conocer tu próximo vehículo.
            </span>
          </p>
        </motion.div>

        <div className="mb-8">
          <ShowroomFilter
            brands={brands}
            activeFilters={activeFilters}
            updateFilters={updateFilters}
          />
        </div>

        <div className="w-full">
          {filteredVehicles.length > 0 ? (
            <div className="space-y-12">
              {/* Agrupar vehículos por marca */}
              {(() => {
                // Crear grupos por tipo de vehículo
                const vehiclesByType = filteredVehicles.reduce((acc, vehicle) => {
                  if (!acc[vehicle.tipoVehiculo]) {
                    acc[vehicle.tipoVehiculo] = [];
                  }
                  acc[vehicle.tipoVehiculo].push(vehicle);
                  return acc;
                }, {} as Record<string, Vehicle[]>);

                // Ordenar tipos de vehículo alfabéticamente
                const sortedTypes = Object.keys(vehiclesByType).sort();

                return sortedTypes.map((type, typeIndex) => (
                  <motion.div
                    key={type}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: typeIndex * 0.2 }}
                    className="mb-12"
                  >
                    {/* Título del tipo de vehículo */}
                    <div className="mb-8">
                      <motion.h2 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: typeIndex * 0.2 + 0.1 }}
                        className="text-3xl md:text-4xl font-bold text-white mb-2"
                      >
                        {type}
                      </motion.h2>
                      <motion.div 
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: typeIndex * 0.2 + 0.2 }}
                        className="h-1 w-24 bg-white rounded origin-left"
                      />
                      <p className="text-neutral-400 mt-3">
                        {vehiclesByType[type].length} vehículo{vehiclesByType[type].length !== 1 ? 's' : ''} disponible{vehiclesByType[type].length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    
                    {/* Grid de vehículos de este tipo */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {vehiclesByType[type].map((vehicle, vehicleIndex) => (
                        <motion.div
                          key={vehicle.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: typeIndex * 0.2 + vehicleIndex * 0.1 + 0.3 
                          }}
                        >
                          <VehicleCard 
                            vehicle={vehicle} 
                            onSelect={() => handleVehicleSelect(vehicle)}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ));
              })()}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4 bg-black rounded-lg shadow-sm border border-neutral-700">
              <Image
                src="/images/empty-results.svg"
                alt="No se encontraron vehículos"
                width={160}
                height={160}
                className="mb-6 opacity-50"
              />
              <h3 className="text-2xl font-semibold mb-2 text-white">
                No se encontraron vehículos
              </h3>
              <p className="text-neutral-400 text-center max-w-md">
                No hay vehículos que coincidan con los filtros seleccionados.
                Intenta modificar tus criterios de búsqueda.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShowroomPage;
