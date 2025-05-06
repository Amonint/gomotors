"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FaArrowLeft, FaGasPump, FaCogs, FaRoad, FaTachometerAlt, 
  FaCheck, FaShieldAlt, FaStar, FaCalendarAlt, FaSpinner 
} from 'react-icons/fa';
import { Vehicle, getVehicleById, getVehicles } from '@/services/vehicleService';

const VehicleDetailPage = () => {
  const params = useParams();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [relatedVehicles, setRelatedVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('specs');
  
  useEffect(() => {
    const loadVehicle = async () => {
      setLoading(true);
      try {
        // Obtener el vehículo actual por ID
        const vehicleData = await getVehicleById(params.id as string);
        setVehicle(vehicleData);
        
        // Cargar vehículos relacionados
        if (vehicleData) {
          const allVehicles = await getVehicles();
          const related = allVehicles
            .filter(v => v.tipoVehiculo === vehicleData.tipoVehiculo && v.id !== vehicleData.id)
            .slice(0, 3);
          setRelatedVehicles(related);
        }
      } catch (error) {
        console.error('Error cargando datos del vehículo:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadVehicle();
  }, [params.id]);
  
  // Función para formatear precio (si se añade a la estructura)
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };
  
  // Si está cargando, mostrar indicador
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] w-full bg-[#0A0A0A] text-white">
        <div className="text-center">
          <FaSpinner className="animate-spin text-5xl text-[#ffe600] mx-auto mb-4" />
          <p className="text-xl">Cargando información del vehículo...</p>
        </div>
      </div>
    );
  }
  
  // Si no se encuentra el vehículo
  if (!vehicle) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] w-full bg-[#0A0A0A] text-white px-4">
        <div className="text-center max-w-lg">
          <h2 className="text-3xl font-bold mb-4">Vehículo no encontrado</h2>
          <p className="text-gray-300 mb-8">Lo sentimos, el vehículo que estás buscando no está disponible o ha sido eliminado.</p>
          <Link 
            href="/showroom" 
            className="inline-flex items-center bg-[#ffe600] text-black py-3 px-6 rounded-full font-medium hover:bg-[#fff200] transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Volver al Showroom
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen pb-16">
      {/* Encabezado con imagen principal */}
      <div className="relative h-[50vh] w-full">
        <Image
          src={vehicle.imageUrls[0]} // Usar la primera imagen
          alt={`${vehicle.marca} ${vehicle.modelo}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent"></div>
        
        <div className="absolute top-8 left-8">
          <Link 
            href="/showroom"
            className="flex items-center text-white bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Volver
          </Link>
        </div>
      </div>
      
      <div className="container mx-auto px-4 -mt-24 relative z-10">
        <div className="bg-[#121212] rounded-xl p-6 md:p-8 shadow-2xl mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <div className="inline-block bg-[#ffe600] text-black px-3 py-1 rounded-full text-sm font-bold mb-3">
                {vehicle.marca}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{vehicle.modelo}</h1>
              <div className="flex items-center text-gray-300">
                <FaCalendarAlt className="mr-2 text-[#ffe600]" />
                <span>{vehicle.año}</span>
                <span className="mx-3">•</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  vehicle.tipoVehiculo === 'SUV' ? 'bg-green-500/20 text-green-300' :
                  vehicle.tipoVehiculo === 'Sedán' ? 'bg-blue-500/20 text-blue-300' :
                  'bg-orange-500/20 text-orange-300'
                }`}>
                  {vehicle.tipoVehiculo}
                </span>
              </div>
            </div>
            
          </div>
          
          <p className="text-gray-300 mb-8">
            {vehicle.descripcion}
          </p>
          
          {/* Tabs para especificaciones, características y financiamiento */}
          <div className="border-b border-gray-800 mb-6">
            <div className="flex space-x-4">
              <button 
                onClick={() => setActiveTab('specs')}
                className={`pb-3 font-medium ${activeTab === 'specs' ? 'text-[#ffe600] border-b-2 border-[#ffe600]' : 'text-gray-400 hover:text-white'}`}
              >
                Especificaciones
              </button>
              <button 
                onClick={() => setActiveTab('features')}
                className={`pb-3 font-medium ${activeTab === 'features' ? 'text-[#ffe600] border-b-2 border-[#ffe600]' : 'text-gray-400 hover:text-white'}`}
              >
                Características
              </button>
              
            </div>
          </div>
          
          {/* Contenido de los tabs */}
          <div className="mb-8">
            {/* Especificaciones técnicas */}
            {activeTab === 'specs' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="bg-[#1A1A1A] rounded-lg p-5">
                  <div className="flex items-center mb-4">
                    <FaGasPump className="text-[#ffe600] text-2xl mr-3" />
                    <div>
                      <h3 className="text-sm text-gray-400">Motor</h3>
                      <p className="font-semibold">{vehicle.especificaciones.motor.principal}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {vehicle.especificaciones.motor.adicionales.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <FaCheck className="text-[#ffe600] mr-2" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-[#1A1A1A] rounded-lg p-5">
                  <div className="flex items-center mb-4">
                    <FaCogs className="text-[#ffe600] text-2xl mr-3" />
                    <div>
                      <h3 className="text-sm text-gray-400">Transmisión</h3>
                      <p className="font-semibold">{vehicle.especificaciones.transmision.principal}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {vehicle.especificaciones.transmision.adicionales.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <FaCheck className="text-[#ffe600] mr-2" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-[#1A1A1A] rounded-lg p-5">
                  <div className="flex items-center mb-4">
                    <FaRoad className="text-[#ffe600] text-2xl mr-3" />
                    <div>
                      <h3 className="text-sm text-gray-400">Consumo</h3>
                      <p className="font-semibold">{vehicle.especificaciones.consumo.principal}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {vehicle.especificaciones.consumo.adicionales.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <FaCheck className="text-[#ffe600] mr-2" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-[#1A1A1A] rounded-lg p-5">
                  <div className="flex items-center mb-4">
                    <FaTachometerAlt className="text-[#ffe600] text-2xl mr-3" />
                    <div>
                      <h3 className="text-sm text-gray-400">Potencia</h3>
                      <p className="font-semibold">{vehicle.especificaciones.potencia.principal}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {vehicle.especificaciones.potencia.adicionales.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <FaCheck className="text-[#ffe600] mr-2" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
            
            {/* Características */}
            {activeTab === 'features' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-[#1A1A1A] rounded-lg p-5">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <FaShieldAlt className="text-[#ffe600] mr-2" /> Seguridad
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-center font-medium">
                        <FaCheck className="text-[#ffe600] mr-2" /> {vehicle.caracteristicas.seguridad.principal}
                      </li>
                      {vehicle.caracteristicas.seguridad.adicionales.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <FaCheck className="text-[#ffe600] mr-2" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-[#1A1A1A] rounded-lg p-5">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <FaStar className="text-[#ffe600] mr-2" /> Confort
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-center font-medium">
                        <FaCheck className="text-[#ffe600] mr-2" /> {vehicle.caracteristicas.confort.principal}
                      </li>
                      {vehicle.caracteristicas.confort.adicionales.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <FaCheck className="text-[#ffe600] mr-2" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-[#1A1A1A] rounded-lg p-5">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <FaStar className="text-[#ffe600] mr-2" /> Exterior
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-center font-medium">
                        <FaCheck className="text-[#ffe600] mr-2" /> {vehicle.caracteristicas.exterior.principal}
                      </li>
                      {vehicle.caracteristicas.exterior.adicionales.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <FaCheck className="text-[#ffe600] mr-2" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-[#1A1A1A] rounded-lg p-5">
                  <h3 className="font-semibold mb-3">Colores disponibles</h3>
                  <div className="flex space-x-4 mt-3">
                    {vehicle.coloresDisponibles.map((color, index) => (
                      <div 
                        key={index}
                        className="w-8 h-8 rounded-full border-2 border-gray-700 cursor-pointer hover:border-[#ffe600] transition-colors"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            
          </div>
          
          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/contact-us" 
              className="bg-[#ffe600] text-black font-semibold py-3 px-6 rounded-full hover:bg-[#fff200] transition-colors flex-1 text-center"
            >
              Contactar vendedor
            </Link>
            
          </div>
        </div>
        
        {/* Vehículos relacionados */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Vehículos similares</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedVehicles.map((relatedVehicle) => (
              <Link key={relatedVehicle.id} href={`/showroom/vehicle/${relatedVehicle.id}`}>
                <div className="bg-[#121212] rounded-xl overflow-hidden hover:scale-[1.02] transition-transform group cursor-pointer">
                  <div className="relative w-full h-40">
                    <Image
                      src={relatedVehicle.imageUrls[0]}
                      alt={`${relatedVehicle.marca} ${relatedVehicle.modelo}`}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"></div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-xs text-[#ffe600] font-medium">{relatedVehicle.marca}</span>
                        <h3 className="font-bold">{relatedVehicle.modelo}</h3>
                      </div>
                      <span className="text-gray-400">{relatedVehicle.año}</span>
                    </div>
                    
                    {/* Aquí iría el precio si se agrega a la estructura */}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailPage; 