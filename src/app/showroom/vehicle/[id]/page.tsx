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
      <div className="flex items-center justify-center h-[70vh] w-full bg-white text-gray-800">
        <div className="text-center">
          <FaSpinner className="animate-spin text-5xl text-[#2563eb] mx-auto mb-4" />
          <p className="text-xl">Cargando información del vehículo...</p>
        </div>
      </div>
    );
  }
  
  // Si no se encuentra el vehículo
  if (!vehicle) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] w-full bg-white text-gray-800 px-4">
        <div className="text-center max-w-lg">
          <h2 className="text-3xl font-bold mb-4">Vehículo no encontrado</h2>
          <p className="text-gray-600 mb-8">Lo sentimos, el vehículo que estás buscando no está disponible o ha sido eliminado.</p>
          <Link 
            href="/showroom" 
            className="inline-flex items-center bg-[#2563eb] text-white py-3 px-6 rounded-full font-medium hover:bg-[#1d4ed8] transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Volver al Showroom
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white text-gray-800 min-h-screen pb-16">
      {/* Encabezado con imagen principal */}
      <div className="relative h-[50vh] w-full">
        <Image
          src={vehicle.imageUrls && vehicle.imageUrls.length > 0 ? vehicle.imageUrls[0] : '/images/vehicle-placeholder.svg'}
          alt={`${vehicle.marca} ${vehicle.modelo}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
        
        <div className="absolute top-8 left-8">
          <Link 
            href="/showroom"
            className="flex items-center text-gray-800 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/90 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Volver
          </Link>
        </div>
      </div>
      
      <div className="container mx-auto px-4 -mt-24 relative z-10">
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <div className="inline-block bg-[#2563eb] text-white px-3 py-1 rounded-full text-sm font-bold mb-3">
                {vehicle.marca}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{vehicle.modelo}</h1>
              <div className="flex items-center text-gray-600">
                <FaCalendarAlt className="mr-2 text-[#2563eb]" />
                <span>{vehicle.año}</span>
                <span className="mx-3">•</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  vehicle.tipoVehiculo === 'SUV' ? 'bg-green-100 text-green-700' :
                  vehicle.tipoVehiculo === 'Sedán' ? 'bg-blue-100 text-blue-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {vehicle.tipoVehiculo}
                </span>
              </div>
            </div>
            
          </div>
          
          <p className="text-gray-600 mb-8">
            {vehicle.descripcion}
          </p>
          
          {/* Tabs para especificaciones, características y financiamiento */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-4">
              <button 
                onClick={() => setActiveTab('specs')}
                className={`pb-3 font-medium ${activeTab === 'specs' ? 'text-[#2563eb] border-b-2 border-[#2563eb]' : 'text-gray-500 hover:text-gray-800'}`}
              >
                Especificaciones
              </button>
              <button 
                onClick={() => setActiveTab('features')}
                className={`pb-3 font-medium ${activeTab === 'features' ? 'text-[#2563eb] border-b-2 border-[#2563eb]' : 'text-gray-500 hover:text-gray-800'}`}
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
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                  <div className="flex items-center mb-4">
                    <FaGasPump className="text-[#2563eb] text-2xl mr-3" />
                    <div>
                      <h3 className="text-sm text-gray-500">Motor</h3>
                      <p className="font-semibold text-gray-800">{vehicle.especificaciones.motor.principal}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {vehicle.especificaciones.motor.adicionales.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <FaCheck className="text-[#2563eb] mr-2" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                  <div className="flex items-center mb-4">
                    <FaCogs className="text-[#2563eb] text-2xl mr-3" />
                    <div>
                      <h3 className="text-sm text-gray-500">Transmisión</h3>
                      <p className="font-semibold text-gray-800">{vehicle.especificaciones.transmision.principal}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {vehicle.especificaciones.transmision.adicionales.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <FaCheck className="text-[#2563eb] mr-2" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                  <div className="flex items-center mb-4">
                    <FaRoad className="text-[#2563eb] text-2xl mr-3" />
                    <div>
                      <h3 className="text-sm text-gray-500">Consumo</h3>
                      <p className="font-semibold text-gray-800">{vehicle.especificaciones.consumo.principal}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {vehicle.especificaciones.consumo.adicionales.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <FaCheck className="text-[#2563eb] mr-2" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                  <div className="flex items-center mb-4">
                    <FaTachometerAlt className="text-[#2563eb] text-2xl mr-3" />
                    <div>
                      <h3 className="text-sm text-gray-500">Potencia</h3>
                      <p className="font-semibold text-gray-800">{vehicle.especificaciones.potencia.principal}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {vehicle.especificaciones.potencia.adicionales.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <FaCheck className="text-[#2563eb] mr-2" /> {item}
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
                  <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <FaShieldAlt className="text-[#2563eb] mr-2" /> Seguridad
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center font-medium">
                        <FaCheck className="text-[#2563eb] mr-2" /> {vehicle.caracteristicas.seguridad.principal}
                      </li>
                      {vehicle.caracteristicas.seguridad.adicionales.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <FaCheck className="text-[#2563eb] mr-2" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <FaStar className="text-[#2563eb] mr-2" /> Confort
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center font-medium">
                        <FaCheck className="text-[#2563eb] mr-2" /> {vehicle.caracteristicas.confort.principal}
                      </li>
                      {vehicle.caracteristicas.confort.adicionales.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <FaCheck className="text-[#2563eb] mr-2" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <FaStar className="text-[#2563eb] mr-2" /> Exterior
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center font-medium">
                        <FaCheck className="text-[#2563eb] mr-2" /> {vehicle.caracteristicas.exterior.principal}
                      </li>
                      {vehicle.caracteristicas.exterior.adicionales.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <FaCheck className="text-[#2563eb] mr-2" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                  <h3 className="font-semibold mb-3">Colores disponibles</h3>
                  <div className="flex space-x-4 mt-3">
                    {vehicle.coloresDisponibles.map((color, index) => (
                      <div 
                        key={index}
                        className="w-8 h-8 rounded-full border-2 border-gray-200 cursor-pointer hover:border-[#2563eb] transition-colors"
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
              className="bg-[#2563eb] text-white font-semibold py-3 px-6 rounded-full hover:bg-[#1d4ed8] transition-colors flex-1 text-center"
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
                <div className="bg-gray-50 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform group cursor-pointer">
                  <div className="relative w-full h-40">
                    <Image
                      src={relatedVehicle.imageUrls && relatedVehicle.imageUrls.length > 0 ? relatedVehicle.imageUrls[0] : '/images/vehicle-placeholder.svg'}
                      alt={`${relatedVehicle.marca} ${relatedVehicle.modelo}`}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent"></div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-xs text-[#2563eb] font-medium">{relatedVehicle.marca}</span>
                        <h3 className="font-bold">{relatedVehicle.modelo}</h3>
                      </div>
                      <span className="text-gray-500">{relatedVehicle.año}</span>
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