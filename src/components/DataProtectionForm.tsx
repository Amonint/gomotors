"use client";

import React, { useState } from "react";

const DataProtectionForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    id: "",
    phone: "",
    email: "",
    restrictions: {
      offers: false,
      surveys: false,
      maintenance: false,
      newProducts: false,
      all: false,
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    if (name === "all") {
      setFormData((prev) => ({
        ...prev,
        restrictions: {
          offers: checked,
          surveys: checked,
          maintenance: checked,
          newProducts: checked,
          all: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        restrictions: {
          ...prev.restrictions,
          [name]: checked,
          all: false,
        },
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Aquí iría la lógica para enviar los datos
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          BAJA DE INFORMACIÓN PERSONAL
        </h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          PROTECCIÓN DE DATOS
        </h2>
        
        <p className="text-gray-600 mb-8">
          Comprometidos con la protección de sus datos personales, por medio de este formulario puede indicarnos de que área damos de baja tus datos personales.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Apellido *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
                Cédula *
              </label>
              <input
                type="text"
                id="id"
                name="id"
                required
                value={formData.id}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Deseo restringir el uso de mis datos para las siguientes finalidades
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="offers"
                  name="offers"
                  checked={formData.restrictions.offers}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="offers" className="ml-2 block text-sm text-gray-700">
                  Envio de ofertas y promociones
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="surveys"
                  name="surveys"
                  checked={formData.restrictions.surveys}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="surveys" className="ml-2 block text-sm text-gray-700">
                  Envio de encuestas de satisfacción
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="maintenance"
                  name="maintenance"
                  checked={formData.restrictions.maintenance}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="maintenance" className="ml-2 block text-sm text-gray-700">
                  Envío de información y gestión de citas y mantenimientos (posventa)
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="newProducts"
                  name="newProducts"
                  checked={formData.restrictions.newProducts}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="newProducts" className="ml-2 block text-sm text-gray-700">
                  Envío de información de nuevos productos y servicios
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="all"
                  name="all"
                  checked={formData.restrictions.all}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="all" className="ml-2 block text-sm text-gray-700">
                  Todas las anteriores
                </label>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DataProtectionForm; 