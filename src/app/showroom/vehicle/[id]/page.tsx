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
import { vehicles } from '@/data/vehicles';

const VehicleDetailPage = () => {
  const params = useParams();
  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('specs');
  
  useEffect(() => {
    // Simulando carga de datos (en una app real esto sería una llamada a la API)
    const loadVehicle = () => {
      setLoading(true);
      
      // Encontrar el vehículo por ID
      const foundVehicle = vehicles.find(v => v.id === params.id);
      
      setTimeout(() => {
        setVehicle(foundVehicle || null);
        setLoading(false);
      }, 800);
    };
    
    loadVehicle();
  }, [params.id]);
  
  // Función para formatear precio
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
          src={vehicle.image}
          alt={vehicle.name}
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
                {vehicle.brand}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{vehicle.name}</h1>
              <div className="flex items-center text-gray-300">
                <FaCalendarAlt className="mr-2 text-[#ffe600]" />
                <span>{vehicle.year}</span>
                <span className="mx-3">•</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  vehicle.type === 'SUV' ? 'bg-green-500/20 text-green-300' :
                  vehicle.type === 'Sedán' ? 'bg-blue-500/20 text-blue-300' :
                  'bg-orange-500/20 text-orange-300'
                }`}>
                  {vehicle.type}
                </span>
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <div className="text-gray-400 text-sm mb-1">Precio</div>
              <div className="text-3xl font-bold text-[#ffe600]">
                {formatCurrency(vehicle.price)}
              </div>
            </div>
          </div>
          
          <p className="text-gray-300 mb-8">
            {vehicle.description}
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
              <button 
                onClick={() => setActiveTab('financing')}
                className={`pb-3 font-medium ${activeTab === 'financing' ? 'text-[#ffe600] border-b-2 border-[#ffe600]' : 'text-gray-400 hover:text-white'}`}
              >
                Financiamiento
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
                      <p className="font-semibold">{vehicle.specs.engine}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center">
                      <FaCheck className="text-[#ffe600] mr-2" /> Sistema de inyección directa
                    </li>
                    <li className="flex items-center">
                      <FaCheck className="text-[#ffe600] mr-2" /> Sistema Start/Stop
                    </li>
                    <li className="flex items-center">
                      <FaCheck className="text-[#ffe600] mr-2" /> Certificación de emisiones Euro 6
                    </li>
                  </ul>
                </div>
                
                <div className="bg-[#1A1A1A] rounded-lg p-5">
                  <div className="flex items-center mb-4">
                    <FaCogs className="text-[#ffe600] text-2xl mr-3" />
                    <div>
                      <h3 className="text-sm text-gray-400">Transmisión</h3>
                      <p className="font-semibold">{vehicle.specs.transmission}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center">
                      <FaCheck className="text-[#ffe600] mr-2" /> Cambios al volante
                    </li>
                    <li className="flex items-center">
                      <FaCheck className="text-[#ffe600] mr-2" /> Modos de conducción
                    </li>
                    <li className="flex items-center">
                      <FaCheck className="text-[#ffe600] mr-2" /> Control de tracción avanzado
                    </li>
                  </ul>
                </div>
                
                <div className="bg-[#1A1A1A] rounded-lg p-5">
                  <div className="flex items-center mb-4">
                    <FaRoad className="text-[#ffe600] text-2xl mr-3" />
                    <div>
                      <h3 className="text-sm text-gray-400">Consumo</h3>
                      <p className="font-semibold">{vehicle.specs.mileage}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center">
                      <FaCheck className="text-[#ffe600] mr-2" /> Tanque de 60 litros
                    </li>
                    <li className="flex items-center">
                      <FaCheck className="text-[#ffe600] mr-2" /> Modo ECO de ahorro
                    </li>
                    <li className="flex items-center">
                      <FaCheck className="text-[#ffe600] mr-2" /> Autonomía de 700 km
                    </li>
                  </ul>
                </div>
                
                <div className="bg-[#1A1A1A] rounded-lg p-5">
                  <div className="flex items-center mb-4">
                    <FaTachometerAlt className="text-[#ffe600] text-2xl mr-3" />
                    <div>
                      <h3 className="text-sm text-gray-400">Potencia</h3>
                      <p className="font-semibold">{vehicle.specs.power}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center">
                      <FaCheck className="text-[#ffe600] mr-2" /> Torque máximo de 320 Nm
                    </li>
                    <li className="flex items-center">
                      <FaCheck className="text-[#ffe600] mr-2" /> 0-100 km/h en 8.5 segundos
                    </li>
                    <li className="flex items-center">
                      <FaCheck className="text-[#ffe600] mr-2" /> Velocidad máxima 200 km/h
                    </li>
                  </ul>
                </div>
                
                {/* Más especificaciones según sea necesario */}
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
                      <li className="flex items-center">
                        <FaCheck className="text-[#ffe600] mr-2" /> 6 Airbags
                      </li>
                      <li className="flex items-center">
                        <FaCheck className="text-[#ffe600] mr-2" /> Control de estabilidad
                      </li>
                      <li className="flex items-center">
                        <FaCheck className="text-[#ffe600] mr-2" /> Sistema de frenos ABS
                      </li>
                      <li className="flex items-center">
                        <FaCheck className="text-[#ffe600] mr-2" /> Asistente de frenado de emergencia
                      </li>
                      <li className="flex items-center">
                        <FaCheck className="text-[#ffe600] mr-2" /> Sistema ISOFIX
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-[#1A1A1A] rounded-lg p-5">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <FaStar className="text-[#ffe600] mr-2" /> Confort
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                      {vehicle.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <FaCheck className="text-[#ffe600] mr-2" /> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-[#1A1A1A] rounded-lg p-5">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <FaStar className="text-[#ffe600] mr-2" /> Exterior
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-center">
                        <FaCheck className="text-[#ffe600] mr-2" /> Faros LED
                      </li>
                      <li className="flex items-center">
                        <FaCheck className="text-[#ffe600] mr-2" /> Aros de aleación
                      </li>
                      <li className="flex items-center">
                        <FaCheck className="text-[#ffe600] mr-2" /> Barras de techo
                      </li>
                      <li className="flex items-center">
                        <FaCheck className="text-[#ffe600] mr-2" /> Spoiler trasero
                      </li>
                      <li className="flex items-center">
                        <FaCheck className="text-[#ffe600] mr-2" /> Sensores de estacionamiento
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-[#1A1A1A] rounded-lg p-5">
                  <h3 className="font-semibold mb-3">Colores disponibles</h3>
                  <div className="flex space-x-4 mt-3">
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-700 cursor-pointer hover:border-[#ffe600] transition-colors"></div>
                    <div className="w-8 h-8 rounded-full bg-black border-2 border-gray-700 cursor-pointer hover:border-[#ffe600] transition-colors"></div>
                    <div className="w-8 h-8 rounded-full bg-red-600 border-2 border-gray-700 cursor-pointer hover:border-[#ffe600] transition-colors"></div>
                    <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-gray-700 cursor-pointer hover:border-[#ffe600] transition-colors"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-gray-700 cursor-pointer hover:border-[#ffe600] transition-colors"></div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Financiamiento */}
            {activeTab === 'financing' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-[#1A1A1A] rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-4">Opciones de financiamiento</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="border border-gray-700 rounded-lg p-4 hover:border-[#ffe600] transition-colors">
                    <h4 className="font-semibold mb-2">Plan Estándar</h4>
                    <p className="text-gray-400 text-sm mb-3">Financiamiento tradicional con tasas competitivas</p>
                    <div className="text-lg font-bold mb-1">{formatCurrency(Math.round(vehicle.price * 0.8 / 36))} <span className="text-sm font-normal text-gray-400">/ mes</span></div>
                    <div className="text-xs text-gray-400">36 cuotas con 20% de entrada</div>
                  </div>
                  
                  <div className="border border-gray-700 rounded-lg p-4 hover:border-[#ffe600] transition-colors bg-[#ffe600]/5">
                    <div className="absolute -mt-8 -ml-2 bg-[#ffe600] text-black text-xs font-bold py-1 px-3 rounded-full">Recomendado</div>
                    <h4 className="font-semibold mb-2">Plan Flexible</h4>
                    <p className="text-gray-400 text-sm mb-3">Cuotas más bajas y un pago final garantizado</p>
                    <div className="text-lg font-bold mb-1">{formatCurrency(Math.round(vehicle.price * 0.6 / 48))} <span className="text-sm font-normal text-gray-400">/ mes</span></div>
                    <div className="text-xs text-gray-400">48 cuotas con 15% de entrada y valor final garantizado</div>
                  </div>
                  
                  <div className="border border-gray-700 rounded-lg p-4 hover:border-[#ffe600] transition-colors">
                    <h4 className="font-semibold mb-2">Plan Empresarial</h4>
                    <p className="text-gray-400 text-sm mb-3">Ideal para empresas con beneficios fiscales</p>
                    <div className="text-lg font-bold mb-1">{formatCurrency(Math.round(vehicle.price * 0.9 / 24))} <span className="text-sm font-normal text-gray-400">/ mes</span></div>
                    <div className="text-xs text-gray-400">24 cuotas con 10% de entrada</div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-400 mb-4">
                  *Los valores son referenciales. Consulta con un asesor para recibir una cotización personalizada según tu perfil crediticio.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <button className="bg-[#ffe600] text-black font-semibold py-3 px-6 rounded-full hover:bg-[#fff200] transition-colors flex-1">
                    Solicitar cotización
                  </button>
                  <button className="bg-transparent border border-[#ffe600] text-[#ffe600] font-semibold py-3 px-6 rounded-full hover:bg-[#ffe600]/10 transition-colors flex-1">
                    Agendar prueba de manejo
                  </button>
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
            <button 
              className="bg-transparent border border-white text-white font-semibold py-3 px-6 rounded-full hover:bg-white/10 transition-colors flex-1"
            >
              Guardar y comparar
            </button>
          </div>
        </div>
        
        {/* Vehículos relacionados */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Vehículos similares</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vehicles
              .filter(v => v.type === vehicle.type && v.id !== vehicle.id)
              .slice(0, 3)
              .map((relatedVehicle, index) => (
                <Link key={relatedVehicle.id} href={`/showroom/vehicle/${relatedVehicle.id}`}>
                  <div className="bg-[#121212] rounded-xl overflow-hidden hover:scale-[1.02] transition-transform group cursor-pointer">
                    <div className="relative w-full h-40">
                      <Image
                        src={relatedVehicle.image}
                        alt={relatedVehicle.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"></div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-xs text-[#ffe600] font-medium">{relatedVehicle.brand}</span>
                          <h3 className="font-bold">{relatedVehicle.name}</h3>
                        </div>
                        <span className="text-gray-400">{relatedVehicle.year}</span>
                      </div>
                      
                      <div className="mt-2 text-lg font-bold">{formatCurrency(relatedVehicle.price)}</div>
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