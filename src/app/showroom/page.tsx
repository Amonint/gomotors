"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ShowroomFilter from '@/components/ShowroomFilter';
import VehicleCard from '@/components/VehicleCard';
import { vehicles } from '@/data/vehicles';

const ShowroomPage = () => {
  const [filteredVehicles, setFilteredVehicles] = useState(vehicles);
  const [activeFilters, setActiveFilters] = useState({
    brands: [],
    types: [],
    priceRange: [0, 100000],
    features: []
  });
  
  const brands = [...new Set(vehicles.map(vehicle => vehicle.brand))];
  const types = [...new Set(vehicles.map(vehicle => vehicle.type))];
  
  useEffect(() => {
    // Filtrar vehículos cuando cambien los filtros
    let result = [...vehicles];
    
    // Filtrar por marca
    if (activeFilters.brands.length > 0) {
      result = result.filter(vehicle => 
        activeFilters.brands.includes(vehicle.brand)
      );
    }
    
    // Filtrar por tipo
    if (activeFilters.types.length > 0) {
      result = result.filter(vehicle => 
        activeFilters.types.includes(vehicle.type)
      );
    }
    
    // Filtrar por rango de precio
    result = result.filter(vehicle => 
      vehicle.price >= activeFilters.priceRange[0] && 
      vehicle.price <= activeFilters.priceRange[1]
    );
    
    // Filtrar por características
    if (activeFilters.features.length > 0) {
      result = result.filter(vehicle => 
        activeFilters.features.every(feature => 
          vehicle.features.includes(feature)
        )
      );
    }
    
    setFilteredVehicles(result);
  }, [activeFilters]);
  
  const updateFilters = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  return (
    <section className="w-full bg-[#0A0A0A] min-h-screen text-white py-16">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nuestro <span className="text-[#ffe600]">Showroom</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
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
            {filteredVehicles.length > 0 ? (
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
              <div className="flex flex-col items-center justify-center py-12 px-4 bg-[#111111] rounded-xl">
                <img 
                  src="/images/empty-results.svg" 
                  alt="No se encontraron vehículos" 
                  className="w-40 h-40 mb-6 opacity-70"
                />
                <h3 className="text-2xl font-semibold mb-2">No se encontraron vehículos</h3>
                <p className="text-gray-400 text-center max-w-md">
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