"use client";

import React, { useState, useRef } from "react";

interface ActiveFilters {
  brands: string[];
  types: string[];
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
  updateFilters,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [clickedOpen, setClickedOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleBrand = (brand: string) => {
    const newBrands = activeFilters.brands.includes(brand)
      ? activeFilters.brands.filter((b) => b !== brand)
      : [...activeFilters.brands, brand];
    updateFilters("brands", newBrands);
  };

  const resetFilters = () => {
    updateFilters("brands", []);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    if (!clickedOpen) {
      timeoutRef.current = setTimeout(() => setDropdownOpen(false), 150);
    }
  };

  const handleClickToggle = () => {
    const newState = !(dropdownOpen && clickedOpen);
    setDropdownOpen(newState);
    setClickedOpen(newState);
  };

  return (
    <div className="w-full bg-black border-b border-neutral-700 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Selector de marcas */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={handleClickToggle}
              className="px-4 py-2 text-sm text-neutral-300 hover:text-white border border-neutral-600 rounded-full flex items-center gap-2 hover:border-neutral-400 transition-colors"
            >
              <span>
                {activeFilters.brands.length > 0
                  ? `${activeFilters.brands.length} seleccionados`
                  : "Marca"}
              </span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute z-20 mt-2 w-56 max-h-64 overflow-y-auto bg-neutral-950 rounded-xl shadow-2xl border border-neutral-700 py-2 px-1 animate-fade-in custom-scroll">
                {brands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center px-4 py-2 rounded-md hover:bg-neutral-800 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 border-2 border-neutral-600 rounded-sm checked:bg-white checked:border-white focus:outline-none"
                      checked={activeFilters.brands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                    />
                    <span className="ml-3 text-sm text-neutral-200">
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Filtros activos */}
          {activeFilters.brands.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {activeFilters.brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => toggleBrand(brand)}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-neutral-800 text-white hover:bg-neutral-700 transition-colors"
                >
                  {brand}
                  <svg
                    className="w-3 h-3 ml-1.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              ))}
              <button
                onClick={resetFilters}
                className="text-xs text-neutral-400 hover:text-white underline ml-2"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowroomFilter;
