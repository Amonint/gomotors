"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaPrint, FaCheck, FaFilePdf, FaDownload } from "react-icons/fa";
import Link from "next/link";
import { useParams } from "next/navigation";

interface PostulacionData {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  puesto: string;
  mensaje: string | null;
  cv_filename: string | null;
  cv_path: string | null;
  acepta_terminos: boolean;
  ip_address: string | null;
  user_agent: string | null;
  createdAt: string;
  updatedAt: string;
}

const PostulacionDetailPage = () => {
  const params = useParams();
  const [postulacion, setPostulacion] = useState<PostulacionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPostulacion = async () => {
      try {
        // En Next.js 15, params puede ser Promise o string
        const id = typeof params.id === 'string' ? params.id : await params.id;
        const response = await fetch(`/api/postulaciones/${id}`);

        const result = await response.json();

        if (result.success) {
          setPostulacion(result.data);
        } else {
          setError(result.error);
        }
      } catch {
        setError('Error al cargar la postulación');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPostulacion();
    }
  }, [params.id]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCV = () => {
    if (postulacion?.cv_filename) {
      // Usar la API route para descargar el CV
      const link = document.createElement('a');
      link.href = `/api/postulaciones/cv/${postulacion.cv_filename}`;
      link.download = postulacion.cv_filename;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-neutral-600">Cargando postulación...</p>
        </div>
      </div>
    );
  }

  if (error || !postulacion) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error || 'Postulación no encontrada'}</p>
          <Link href="/admin/postulaciones">
            <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
              Volver a la lista
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Header - oculto en impresión */}
      <div className="w-full bg-white border-b border-neutral-300 shadow-sm print:hidden">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin/postulaciones">
                <button className="flex items-center px-4 py-2 text-neutral-600 hover:text-neutral-800 transition-colors">
                  <FaArrowLeft className="mr-2" />
                  Volver a Lista
                </button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-neutral-800">
                  Postulación #{postulacion.id.slice(-8)}
                </h1>
                <p className="text-neutral-600">
                  Registrada el {formatDate(postulacion.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              {postulacion.cv_filename && (
                <button
                  onClick={handleDownloadCV}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaDownload className="mr-2" />
                  Descargar CV
                </button>
              )}
              <button
                onClick={handlePrint}
                className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors"
              >
                <FaPrint className="mr-2" />
                Imprimir
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido imprimible */}
      <div className="max-w-5xl mx-auto px-6 py-8 print:px-0 print:py-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-neutral-200 print:shadow-none print:border-0"
        >
          {/* Header del formulario - visible en impresión */}
          <div className="print:block">
            <div className="border-b border-neutral-200 p-8 print:border-black print:border-2">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-black mb-2">
                  IOMOTORS S.A.
                </h1>
                <h2 className="text-lg font-semibold text-neutral-800 mb-1">
                  POSTULACIÓN LABORAL
                </h2>
                <p className="text-sm text-neutral-600">
                  Av. 8 de diciembre S/N y Av. Isidro Ayora, Loja - Ecuador
                </p>
                <p className="text-sm text-neutral-600">
                  Teléfono: 072731143 | Email: sistemas@gomotors.com.ec
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>ID de Postulación:</strong> {postulacion.id}
                </div>
                <div>
                  <strong>Fecha de Registro:</strong> {formatDate(postulacion.createdAt)}
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 print:p-6">
            {/* Datos del Postulante */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-neutral-800 mb-4 pb-2 border-b border-neutral-200">
                DATOS DEL POSTULANTE
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-1">
                      Nombre:
                    </label>
                    <p className="text-neutral-900 font-medium border-b border-dotted border-neutral-300 pb-1">
                      {postulacion.nombre}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-1">
                      Apellidos:
                    </label>
                    <p className="text-neutral-900 font-medium border-b border-dotted border-neutral-300 pb-1">
                      {postulacion.apellidos}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-1">
                      Correo Electrónico:
                    </label>
                    <p className="text-neutral-900 font-medium border-b border-dotted border-neutral-300 pb-1">
                      {postulacion.email}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-1">
                      Teléfono:
                    </label>
                    <p className="text-neutral-900 font-medium border-b border-dotted border-neutral-300 pb-1">
                      {postulacion.telefono}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-1">
                      Puesto al que Aplica:
                    </label>
                    <p className="text-neutral-900 font-medium border-b border-dotted border-neutral-300 pb-1">
                      {postulacion.puesto}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-1">
                      CV Adjunto:
                    </label>
                    <div className="flex items-center">
                      {postulacion.cv_filename ? (
                        <>
                          <FaFilePdf className="text-red-500 mr-2" />
                          <p className="text-neutral-900 font-medium">
                            {postulacion.cv_filename}
                          </p>
                        </>
                      ) : (
                        <p className="text-neutral-500">No se adjuntó CV</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {postulacion.mensaje && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-neutral-600 mb-1">
                    Mensaje del Postulante:
                  </label>
                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                    <p className="text-neutral-900">
                      {postulacion.mensaje}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Aceptación de Términos */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-neutral-800 mb-4 pb-2 border-b border-neutral-200">
                ACEPTACIÓN DE TÉRMINOS Y CONDICIONES
              </h3>

              <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <FaCheck className="text-white text-sm" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-800 mb-2">
                      ESTADO: TÉRMINOS ACEPTADOS
                    </p>
                    <p className="text-sm text-green-700 mb-3">
                      El postulante ha aceptado los términos y condiciones para el tratamiento de sus
                      datos personales y la evaluación de su postulación laboral.
                    </p>
                    <div className="text-xs text-green-600">
                      <p><strong>Fecha de aceptación:</strong> {formatDate(postulacion.createdAt)}</p>
                      <p><strong>IP de registro:</strong> {postulacion.ip_address || '[No disponible]'}</p>
                      <p><strong>Navegador:</strong> {postulacion.user_agent ? postulacion.user_agent.substring(0, 100) + '...' : '[No disponible]'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Metadata del sistema */}
            <div className="mb-8 print:hidden">
              <h3 className="text-lg font-bold text-neutral-800 mb-4 pb-2 border-b border-neutral-200">
                INFORMACIÓN DEL SISTEMA
              </h3>

              <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Dirección IP:</strong><br />
                    <span className="text-neutral-600">{postulacion.ip_address || 'No disponible'}</span>
                  </div>
                  <div>
                    <strong>Navegador:</strong><br />
                    <span className="text-neutral-600 break-all">{postulacion.user_agent || 'No disponible'}</span>
                  </div>
                  <div>
                    <strong>Fecha de creación:</strong><br />
                    <span className="text-neutral-600">{formatDate(postulacion.createdAt)}</span>
                  </div>
                  <div>
                    <strong>Última actualización:</strong><br />
                    <span className="text-neutral-600">{formatDate(postulacion.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer para impresión */}
            <div className="hidden print:block mt-12 pt-6 border-t border-neutral-300">
              <div className="text-center text-xs text-neutral-500">
                <p>Este documento fue generado automáticamente el {formatDate(new Date().toISOString())}</p>
                <p>IOMOTORS S.A. - Sistema de Gestión de Recursos Humanos</p>
                <p>REGISTRO DE POSTULACIÓN LABORAL</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PostulacionDetailPage;