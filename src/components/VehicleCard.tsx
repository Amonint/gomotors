"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGasPump, FaCogs, FaRoad, FaTachometerAlt } from 'react-icons/fa';

interface VehicleProps {
  vehicle: {
    id: string;
    name: string;
    brand: string;
    type: string;
    image: string;
    price: number;
    year: number;
    description: string;
    specs: {
      engine: string;
      transmission: string;
      mileage: string;
      power: string;
    };
    features: string[];
  };
}

const VehicleCard: React.FC<VehicleProps> = ({ vehicle }) => {
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };
  
  // Determinar clase de tipo de vehículo para el badge
  const getTypeClass = (type: string) => {
    switch(type.toLowerCase()) {
      case 'sedán':
        return 'bg-blue-500/20 text-blue-300';
      case 'suv':
        return 'bg-green-500/20 text-green-300';
      case 'pickup':
        return 'bg-orange-500/20 text-orange-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className="bg-[#121212] rounded-xl overflow-hidden transition-transform hover:scale-[1.02] duration-300 group">
      {/* Imagen del vehículo */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          className="object-cover transition-transform group-hover:scale-105 duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"></div>
        
        {/* Badge de tipo */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${getTypeClass(vehicle.type)}`}>
          {vehicle.type}
        </div>
        
        {/* Badge de marca */}
        <div className="absolute top-3 left-3 bg-[#ffe600] text-black px-3 py-1 rounded-full text-xs font-bold">
          {vehicle.brand}
        </div>
      </div>
      
      {/* Contenido */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold">{vehicle.name}</h3>
          <span className="text-[#ffe600] font-semibold">{vehicle.year}</span>
        </div>
        
        <p className="text-gray-400 text-sm line-clamp-2 mb-4">{vehicle.description}</p>
        
        {/* Especificaciones */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="flex items-center">
            <FaGasPump className="text-[#ffe600] mr-2" />
            <span className="text-xs text-gray-300">{vehicle.specs.engine}</span>
          </div>
          <div className="flex items-center">
            <FaCogs className="text-[#ffe600] mr-2" />
            <span className="text-xs text-gray-300">{vehicle.specs.transmission}</span>
          </div>
          <div className="flex items-center">
            <FaRoad className="text-[#ffe600] mr-2" />
            <span className="text-xs text-gray-300">{vehicle.specs.mileage}</span>
          </div>
          <div className="flex items-center">
            <FaTachometerAlt className="text-[#ffe600] mr-2" />
            <span className="text-xs text-gray-300">{vehicle.specs.power}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold">{formatCurrency(vehicle.price)}</div>
          <Link 
            href={`/showroom/vehicle/${vehicle.id}`} 
            className="bg-[#ffe600] text-black font-medium rounded-full px-4 py-1 text-sm hover:bg-[#fff200] transition-colors"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard; 