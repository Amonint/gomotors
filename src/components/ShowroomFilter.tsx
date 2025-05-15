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
}

interface ShowroomFilterProps {
  brands: string[];
  activeFilters: ActiveFilters;
  updateFilters: (filterType: keyof ActiveFilters, value: string[]) => void;
}

const ShowroomFilter: React.FC<ShowroomFilterProps> = ({
  brands,
  activeFilters,
  updateFilters
}) => {
  const [expandedSections, setExpandedSections] = useState({
    brands: true
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

  const resetFilters = () => {
    updateFilters('brands', []);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-900 rounded-xl p-6 sticky top-24 shadow-xl border border-gray-800"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center text-white">
          <FaFilter className="mr-2 text-gray-400" /> Filtros
        </h2>
        <button 
          onClick={resetFilters}
          className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-1 rounded-lg hover:bg-gray-800"
        >
          Reiniciar
        </button>
      </div>

      {/* Filtro por marca */}
      <div className="mb-3">
        <button 
          onClick={() => toggleSection('brands')}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <span className="font-medium text-white">Marca</span>
          <FaChevronDown 
            className={`transition-transform text-gray-400 ${expandedSections.brands ? 'rotate-180' : ''}`} 
          />
        </button>
        
        {expandedSections.brands && (
          <div className="space-y-2 mt-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {brands.map(brand => (
              <label 
                key={brand} 
                className="flex items-center cursor-pointer hover:text-white transition-colors group"
                onClick={() => toggleBrand(brand)}
              >
                <div className={`w-5 h-5 rounded border ${activeFilters.brands.includes(brand) ? 'bg-gray-700 border-gray-500' : 'border-gray-600'} mr-3 flex items-center justify-center group-hover:border-gray-400`}>
                  {activeFilters.brands.includes(brand) && (
                    <FaCheck className="text-white text-xs" />
                  )}
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </motion.div>
  );
};

export default ShowroomFilter; 