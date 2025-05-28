"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ShowroomFilter from "@/components/ShowroomFilter";
import VehicleCard from "@/components/VehicleCard";
import { Vehicle, getVehicles } from "@/services/vehicleService";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface ActiveFilters {
  brands: string[];
  types: string[];
  features: string[];
}

const ShowroomPage = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    brands: [],
    types: [],
    features: [],
  });
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/showroom");
      }
    });
    return () => unsubscribe();
  }, [router]);

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

  const types =
    vehicles.length > 0
      ? [...new Set(vehicles.map((vehicle) => vehicle.tipoVehiculo))]
      : [];

  useEffect(() => {
    if (vehicles.length === 0) return;

    let result = [...vehicles];

    if (activeFilters.brands.length > 0) {
      result = result.filter((vehicle) =>
        activeFilters.brands.includes(vehicle.marca)
      );
    }

    if (activeFilters.types.length > 0) {
      result = result.filter((vehicle) =>
        activeFilters.types.includes(vehicle.tipoVehiculo)
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

  return (
    <section className="w-full bg-black min-h-screen text-white py-16">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-12 px-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            SHOWROOM <span className="text-white">MULTIMARCAS</span>
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
            types={types}
            activeFilters={activeFilters}
            updateFilters={updateFilters}
          />
        </div>

        <div className="w-full">
          {loading ? (
            <div className="flex justify-center items-center h-60">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <VehicleCard vehicle={vehicle} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4 bg-black rounded-lg shadow-sm border border-neutral-700">
              <img
                src="/images/empty-results.svg"
                alt="No se encontraron vehículos"
                className="w-40 h-40 mb-6 opacity-50"
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
