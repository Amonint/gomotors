"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFilter, FaChevronDown, FaCheck } from 'react-icons/fa';

// Lista de características disponibles para filtrar
const availableFeatures = [
  "Bluetooth",
  "Cámara de retroceso",
  "Asientos de cuero",
  "Sistema de navegación",
  "Techo solar",
  "Control de crucero adaptativo",
  "Pantalla táctil",
  "Asientos calefaccionados",
  "Arranque sin llave",
  "Asistente de estacionamiento"
];

// Interfaz para los filtros activos
interface ActiveFilters {
  brands: string[];
  types: string[];
  features: string[];
}

interface ShowroomFilterProps {
  brands: string[];
  types: string[];
  activeFilters: ActiveFilters;
  updateFilters: (filterType: keyof ActiveFilters, value: string[]) => void;
}

const ShowroomFilter: React.FC<ShowroomFilterProps> = ({
  brands,
  types,
  activeFilters,
  updateFilters
}) => {
  const [expandedSections, setExpandedSections] = useState({
    brands: true,
    types: true,
    features: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleBrand = (brand: string) => {
    const newBrands = activeFilters.brands.includes(brand)
      ? activeFilters.brands.filter(b => b !== brand)
      : [...activeFilters.brands, brand];
    updateFilters('brands', newBrands);
  };

  const toggleType = (type: string) => {
    const newTypes = activeFilters.types.includes(type)
      ? activeFilters.types.filter(t => t !== type)
      : [...activeFilters.types, type];
    updateFilters('types', newTypes);
  };

  const toggleFeature = (feature: string) => {
    const newFeatures = activeFilters.features.includes(feature)
      ? activeFilters.features.filter(f => f !== feature)
      : [...activeFilters.features, feature];
    updateFilters('features', newFeatures);
  };

  const resetFilters = () => {
    updateFilters('brands', []);
    updateFilters('types', []);
    updateFilters('features', []);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#111111] rounded-xl p-5 sticky top-24"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <FaFilter className="mr-2 text-[#ffe600]" /> Filtros
        </h2>
        <button 
          onClick={resetFilters}
          className="text-sm text-gray-400 hover:text-[#ffe600] transition-colors"
        >
          Reiniciar
        </button>
      </div>

      {/* Filtro por marca */}
      <div className="mb-6 border-b border-gray-800 pb-5">
        <button 
          onClick={() => toggleSection('brands')}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <span className="font-medium">Marca</span>
          <FaChevronDown 
            className={`transition-transform ${expandedSections.brands ? 'rotate-180' : ''}`} 
          />
        </button>
        
        {expandedSections.brands && (
          <div className="space-y-2 mt-3">
            {brands.map(brand => (
              <label 
                key={brand} 
                className="flex items-center cursor-pointer hover:text-[#ffe600] transition-colors"
                onClick={() => toggleBrand(brand)}
              >
                <div className={`w-5 h-5 rounded border ${activeFilters.brands.includes(brand) ? 'bg-[#ffe600] border-[#ffe600]' : 'border-gray-600'} mr-3 flex items-center justify-center`}>
                  {activeFilters.brands.includes(brand) && (
                    <FaCheck className="text-black text-xs" />
                  )}
                </div>
                <span className="text-sm">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Filtro por tipo */}
      <div className="mb-6 border-b border-gray-800 pb-5">
        <button 
          onClick={() => toggleSection('types')}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <span className="font-medium">Tipo de vehículo</span>
          <FaChevronDown 
            className={`transition-transform ${expandedSections.types ? 'rotate-180' : ''}`} 
          />
        </button>
        
        {expandedSections.types && (
          <div className="space-y-2 mt-3">
            {types.map(type => (
              <label 
                key={type} 
                className="flex items-center cursor-pointer hover:text-[#ffe600] transition-colors"
                onClick={() => toggleType(type)}
              >
                <div className={`w-5 h-5 rounded border ${activeFilters.types.includes(type) ? 'bg-[#ffe600] border-[#ffe600]' : 'border-gray-600'} mr-3 flex items-center justify-center`}>
                  {activeFilters.types.includes(type) && (
                    <FaCheck className="text-black text-xs" />
                  )}
                </div>
                <span className="text-sm">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Filtro por características */}
      <div className="mb-3">
        <button 
          onClick={() => toggleSection('features')}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <span className="font-medium">Características</span>
          <FaChevronDown 
            className={`transition-transform ${expandedSections.features ? 'rotate-180' : ''}`} 
          />
        </button>
        
        {expandedSections.features && (
          <div className="space-y-2 mt-3">
            {availableFeatures.map(feature => (
              <label 
                key={feature} 
                className="flex items-center cursor-pointer hover:text-[#ffe600] transition-colors"
                onClick={() => toggleFeature(feature)}
              >
                <div className={`w-5 h-5 rounded border ${activeFilters.features.includes(feature) ? 'bg-[#ffe600] border-[#ffe600]' : 'border-gray-600'} mr-3 flex items-center justify-center`}>
                  {activeFilters.features.includes(feature) && (
                    <FaCheck className="text-black text-xs" />
                  )}
                </div>
                <span className="text-sm">{feature}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ShowroomFilter; 