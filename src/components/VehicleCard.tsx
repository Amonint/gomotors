"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGasPump, FaCogs, FaRoad, FaTachometerAlt } from 'react-icons/fa';
import { Vehicle } from '@/services/vehicleService';

interface VehicleProps {
  vehicle: Vehicle;
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

  // Validar que existan imágenes y proporcionar una imagen por defecto
  const imageUrl = vehicle.imageUrls && vehicle.imageUrls.length > 0 
    ? vehicle.imageUrls[0] 
    : '/images/vehicle-placeholder.svg';

  return (
    <div className="bg-white rounded-xl overflow-hidden transition-transform hover:scale-[1.02] duration-300 group shadow-lg hover:shadow-xl">
      {/* Imagen del vehículo */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={imageUrl}
          alt={`${vehicle.marca} ${vehicle.modelo}`}
          fill
          className="object-cover transition-transform group-hover:scale-105 duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
        
        {/* Badge de tipo */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
          vehicle.tipoVehiculo === 'SUV' ? 'bg-green-100 text-green-800' :
          vehicle.tipoVehiculo === 'Sedán' ? 'bg-blue-100 text-blue-800' :
          'bg-orange-100 text-orange-800'
        }`}>
          {vehicle.tipoVehiculo}
        </div>
        
        {/* Badge de marca */}
        <div className="absolute top-3 left-3 bg-[#2563eb] text-white px-3 py-1 rounded-full text-xs font-bold">
          {vehicle.marca}
        </div>
      </div>
      
      {/* Contenido */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900">{vehicle.modelo}</h3>
          <span className="text-[#2563eb] font-semibold">{vehicle.año}</span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{vehicle.descripcion}</p>
        
        {/* Especificaciones */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="flex items-center">
            <FaGasPump className="text-[#2563eb] mr-2" />
            <span className="text-xs text-gray-600">{vehicle.especificaciones.motor.principal}</span>
          </div>
          <div className="flex items-center">
            <FaCogs className="text-[#2563eb] mr-2" />
            <span className="text-xs text-gray-600">{vehicle.especificaciones.transmision.principal}</span>
          </div>
          <div className="flex items-center">
            <FaRoad className="text-[#2563eb] mr-2" />
            <span className="text-xs text-gray-600">{vehicle.especificaciones.consumo.principal}</span>
          </div>
          <div className="flex items-center">
            <FaTachometerAlt className="text-[#2563eb] mr-2" />
            <span className="text-xs text-gray-600">{vehicle.especificaciones.potencia.principal}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold"></div>
          <Link 
            href={`/showroom/vehicle/${vehicle.id}`} 
            className="bg-[#2563eb] text-white font-medium rounded-full px-4 py-1 text-sm hover:bg-[#1d4ed8] transition-colors"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard; 