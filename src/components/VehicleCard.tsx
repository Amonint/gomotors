"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGasPump, FaCogs, FaRoad, FaTachometerAlt } from 'react-icons/fa';
import { Vehicle } from '@/services/vehicleService';

interface VehicleProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleProps> = ({ vehicle }) => {
  const [imageError, setImageError] = useState(false);

  const formatCurrency = (amount: string | undefined) => {
    if (!amount) return '$0';
    return `$${Number(amount).toLocaleString()}`;
  };

  const imageUrl = imageError || !vehicle.imagenTarjeta
    ? '/images/vehicle-placeholder.svg'
    : vehicle.imagenTarjeta;

  return (
    <div className="bg-black text-white rounded-lg overflow-hidden transition-all hover:scale-[1.02] duration-300 group shadow-sm hover:shadow-white/10 border border-neutral-700">
      {/* Imagen del vehículo */}
      <div className="relative w-full h-48 sm:h-56 overflow-hidden">
        <Image
          src={imageUrl}
          alt={`${vehicle.marca} ${vehicle.modelo}`}
          fill
          className="object-cover transition-transform group-hover:scale-105 duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          priority={false}
          onError={() => setImageError(true)}
          unoptimized={imageUrl.startsWith('https://firebasestorage.googleapis.com')}
        />
        
        {/* Badge de tipo */}
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-900 backdrop-blur-sm">
          {vehicle.tipoVehiculo}
        </div>
        
        {/* Badge de marca */}
        <div className="absolute top-3 left-3 bg-black/80 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
          {vehicle.marca}
        </div>
      </div>
      
      {/* Contenido */}
      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base sm:text-lg font-bold text-white">{vehicle.modelo}</h3>
          <span className="text-neutral-400 font-semibold">{vehicle.año}</span>
        </div>
        
        <p className="text-neutral-400 text-sm line-clamp-2 mb-4">{vehicle.descripcion}</p>
        
        {/* Especificaciones */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="flex items-center">
            <FaGasPump className="text-neutral-500 mr-2" />
            <span className="text-xs text-neutral-400">{vehicle.especificaciones.motor.principal}</span>
          </div>
          <div className="flex items-center">
            <FaCogs className="text-neutral-500 mr-2" />
            <span className="text-xs text-neutral-400">{vehicle.especificaciones.transmision.principal}</span>
          </div>
          <div className="flex items-center">
            <FaRoad className="text-neutral-500 mr-2" />
            <span className="text-xs text-neutral-400">{vehicle.especificaciones.consumo.principal}</span>
          </div>
          <div className="flex items-center">
            <FaTachometerAlt className="text-neutral-500 mr-2" />
            <span className="text-xs text-neutral-400">{vehicle.especificaciones.potencia.principal}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-white">{formatCurrency(vehicle.precio)}</div>
          <Link 
            href={`/showroom/vehicle/${vehicle.id}`} 
            className="bg-neutral-800 text-white font-medium rounded-full px-4 py-1.5 text-sm hover:bg-neutral-700 transition-colors"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
