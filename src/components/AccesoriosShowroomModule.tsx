"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaBox, FaSpinner } from "react-icons/fa";
import { AccessoryService, Accessory } from "@/services/accessoryService";

interface AccesoriosShowroomModuleProps {
  className?: string;
}

const AccesoriosShowroomModule = ({ className = "" }: AccesoriosShowroomModuleProps) => {
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadAccessories = async () => {
      try {
        setLoading(true);
        setError(null);
        const accessoriesData = await AccessoryService.getAllAccessories();
        setAccessories(accessoriesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar accesorios');
        console.error('Error cargando accesorios:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAccessories();
  }, []);

  const handleImageError = (accessoryId: string) => {
    setImageErrors(prev => new Set(prev).add(accessoryId));
  };



  if (loading) {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <FaSpinner className="text-4xl text-neutral-400 animate-spin" />
          <p className="text-neutral-400 text-lg">Cargando accesorios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <FaBox className="text-4xl text-neutral-500" />
          <p className="text-neutral-400 text-lg">Error al cargar accesorios</p>
          <p className="text-neutral-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (accessories.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <FaBox className="text-4xl text-neutral-500" />
          <p className="text-neutral-400 text-lg">No hay accesorios disponibles</p>
          <p className="text-neutral-500 text-sm">Próximamente agregaremos nuevos accesorios</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Grid de accesorios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {accessories.map((accessory, index) => (
          <motion.div
            key={accessory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-neutral-900 rounded-xl overflow-hidden border border-neutral-700 hover:border-neutral-600 transition-all duration-300 hover:shadow-xl hover:shadow-neutral-900/50"
          >
            {/* Imagen del accesorio */}
            <div className="relative h-48 bg-neutral-800 overflow-hidden">
              {!imageErrors.has(accessory.id) && accessory.imageUrl ? (
                <Image
                  src={accessory.imageUrl}
                  alt={accessory.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  onError={() => handleImageError(accessory.id)}
                  unoptimized={true}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-neutral-500">
                  <FaBox className="text-3xl mb-2" />
                  <p className="text-sm">Sin imagen</p>
                </div>
              )}
              
              {/* Overlay con gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Información del accesorio */}
            <div className="p-4">
              <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-neutral-100 transition-colors line-clamp-2">
                {accessory.name}
              </h3>
              
              
            </div>
          </motion.div>
        ))}
      </div>

      
    </div>
  );
};

export default AccesoriosShowroomModule; 