"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ShowroomFilter from '@/components/ShowroomFilter';
import VehicleCard from '@/components/VehicleCard';
import { Vehicle, getVehicles } from '@/services/vehicleService';

// Definición de tipos para los filtros
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
    features: []
  });
  
  // Carga inicial de vehículos desde Firebase
  useEffect(() => {
    const loadVehicles = async () => {
      setLoading(true);
      try {
        const data = await getVehicles();
        setVehicles(data);
        setFilteredVehicles(data);
      } catch (error) {
        console.error('Error al cargar vehículos:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadVehicles();
  }, []);
  
  // Obtener marcas y tipos únicos
  const brands = vehicles.length > 0 
    ? [...new Set(vehicles.map(vehicle => vehicle.marca))] 
    : [];
    
  const types = vehicles.length > 0 
    ? [...new Set(vehicles.map(vehicle => vehicle.tipoVehiculo))] 
    : [];
  
  // Filtrar vehículos cuando cambien los filtros o la lista de vehículos
  useEffect(() => {
    if (vehicles.length === 0) return;
    
    let result = [...vehicles];
    
    // Filtrar por marca
    if (activeFilters.brands.length > 0) {
      result = result.filter(vehicle => 
        activeFilters.brands.includes(vehicle.marca)
      );
    }
    
    // Filtrar por tipo
    if (activeFilters.types.length > 0) {
      result = result.filter(vehicle => 
        activeFilters.types.includes(vehicle.tipoVehiculo)
      );
    }
    
    // Filtrar por características (busca en las características de confort)
    if (activeFilters.features.length > 0) {
      result = result.filter(vehicle => 
        activeFilters.features.every(feature => {
          // Buscar en principal y adicionales de confort
          const hasInConfort = 
            vehicle.caracteristicas.confort.principal.includes(feature) || 
            vehicle.caracteristicas.confort.adicionales.some(item => item.includes(feature));
          
          // Si es necesario, extender la búsqueda a otras categorías
          // const hasInSafety = vehicle.caracteristicas.seguridad...
          
          return hasInConfort;
        })
      );
    }
    
    setFilteredVehicles(result);
  }, [activeFilters, vehicles]);
  
  const updateFilters = (filterType: keyof ActiveFilters, value: string[]) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  return (
    <section className="w-full bg-white min-h-screen text-gray-800 py-16">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nuestro <span className="text-[#2563eb]">Showroom</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explora nuestra colección de vehículos premium y encuentra el que mejor se adapte a tus necesidades.
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filtros */}
          <div className="lg:w-1/4">
            <ShowroomFilter 
              brands={brands}
              types={types}
              activeFilters={activeFilters}
              updateFilters={updateFilters}
            />
          </div>
          
          {/* Vehículos */}
          <div className="lg:w-3/4">
            {loading ? (
              <div className="flex justify-center items-center h-60">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2563eb]"></div>
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
              <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 rounded-xl">
                <img 
                  src="/images/empty-results.svg" 
                  alt="No se encontraron vehículos" 
                  className="w-40 h-40 mb-6 opacity-70"
                />
                <h3 className="text-2xl font-semibold mb-2">No se encontraron vehículos</h3>
                <p className="text-gray-600 text-center max-w-md">
                  No hay vehículos que coincidan con los filtros seleccionados. Intenta modificar tus criterios de búsqueda.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowroomPage; 