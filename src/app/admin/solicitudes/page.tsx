"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaEye, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

interface Solicitud {
  id: string;
  nombres: string;
  email: string;
  asesor: string;
  razon: string;
  createdAt: string;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

const AdminSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [asesorFilter, setAsesorFilter] = useState("all");
  const [razonFilter, setRazonFilter] = useState("all");
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  });

  const asesores = [
    "Diego Paucar",
    "Wilson Luzuriaga",
    "Luis Ayala",
    "Pablo Vivanco",
    "Ricardo Capa",
    "Cristhian Maza",
    "Cristhian Espinosa",
    "Edgar Ruilova",
    "María Eugenia Montesinos",
    "Diego Jaramillo",
    "José Ríos",
    "Yury Illescas",
    "Cesar Gonzales"
  ];

  const razones = [
    "Mantenimiento",
    "Pregunta o Duda",
    "Cotización",
    "Solicitudes",
    "Asesoria"
  ];

  const fetchSolicitudes = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });

      if (asesorFilter && asesorFilter !== 'all') {
        params.append('asesor', asesorFilter);
      }

      if (razonFilter && razonFilter !== 'all') {
        params.append('razon', razonFilter);
      }

      if (search.trim()) {
        params.append('search', search);
      }

      const response = await fetch(`/api/solicitudes?${params}`, {
        headers: {
          'Authorization': `Basic ${btoa('admin:lo')}`
        }
      });

      const result = await response.json();

      if (result.success) {
        setSolicitudes(result.data);
        setPagination(result.pagination);
      } else {
        setError(result.error);
      }
    } catch {
      setError('Error al cargar las solicitudes');
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, asesorFilter, razonFilter, search]);

  useEffect(() => {
    fetchSolicitudes();
  }, [pagination.page, asesorFilter, razonFilter, fetchSolicitudes]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchSolicitudes();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const changePage = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  if (loading && solicitudes.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-neutral-600">Cargando solicitudes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="w-full bg-white border-b border-neutral-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-800">
                Administración de Solicitudes
              </h1>
              <p className="text-neutral-600 mt-1">
                Gestiona y visualiza las solicitudes de información
              </p>
            </div>
            <div className="text-sm text-neutral-500">
              Total: {pagination.total} solicitudes
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filtros y búsqueda */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Búsqueda */}
            <form onSubmit={handleSearch} className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar por nombre o email..."
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black bg-white"
                />
                <FaSearch className="absolute left-3 top-3 text-neutral-400" />
                <button
                  type="submit"
                  className="absolute right-2 top-1 bg-black text-white px-3 py-1 rounded text-sm hover:bg-neutral-800 transition-colors"
                >
                  Buscar
                </button>
              </div>
            </form>

            {/* Filtro por Asesor */}
            <select
              value={asesorFilter}
              onChange={(e) => setAsesorFilter(e.target.value)}
              className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black bg-white"
            >
              <option value="all">Todos los asesores</option>
              {asesores.map((asesor) => (
                <option key={asesor} value={asesor}>
                  {asesor}
                </option>
              ))}
            </select>

            {/* Filtro por Razón */}
            <select
              value={razonFilter}
              onChange={(e) => setRazonFilter(e.target.value)}
              className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black bg-white"
            >
              <option value="all">Todas las razones</option>
              {razones.map((razon) => (
                <option key={razon} value={razon}>
                  {razon}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Tabla de solicitudes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 p-4 m-4 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Asesor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Razón
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {solicitudes.map((solicitud) => (
                  <tr key={solicitud.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {solicitud.id.slice(-8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                      {solicitud.nombres}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {solicitud.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {solicitud.asesor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-neutral-100 text-neutral-800">
                        {solicitud.razon}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {formatDate(solicitud.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link href={`/admin/solicitudes/${solicitud.id}`}>
                        <button className="inline-flex items-center px-3 py-1 border border-neutral-300 rounded-md text-sm bg-white hover:bg-neutral-50 transition-colors text-black">
                          <FaEye className="mr-1" />
                          Ver Formulario
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          {pagination.totalPages > 1 && (
            <div className="bg-white px-6 py-3 border-t border-neutral-200 flex items-center justify-between">
              <div className="text-sm text-neutral-500">
                Mostrando {((pagination.page - 1) * pagination.limit) + 1} a{" "}
                {Math.min(pagination.page * pagination.limit, pagination.total)} de{" "}
                {pagination.total} resultados
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => changePage(pagination.page - 1)}
                  disabled={!pagination.hasPrev}
                  className="inline-flex items-center px-3 py-1 border border-neutral-300 rounded-md text-sm bg-white hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-black"
                >
                  <FaArrowLeft className="mr-1" />
                  Anterior
                </button>

                <span className="text-sm text-neutral-500">
                  Página {pagination.page} de {pagination.totalPages}
                </span>

                <button
                  onClick={() => changePage(pagination.page + 1)}
                  disabled={!pagination.hasNext}
                  className="inline-flex items-center px-3 py-1 border border-neutral-300 rounded-md text-sm bg-white hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-black"
                >
                  Siguiente
                  <FaArrowRight className="ml-1" />
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {solicitudes.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-neutral-500 text-lg">No se encontraron solicitudes</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSolicitudes;