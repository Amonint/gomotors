"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaPrint, FaCheck, FaImage } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

interface SolicitudData {
  id: string;
  nombres: string;
  email: string;
  cedula: string;
  telefono: string;
  ciudad: string;
  asesor: string;
  razon: string;
  comentario?: string;
  cedula_frontal_path?: string;
  cedula_trasera_path?: string;
  acepta_politicas: boolean;
  createdAt: string;
  updatedAt: string;
}

const SolicitudDetail = () => {
  const params = useParams();
  const [solicitud, setSolicitud] = useState<SolicitudData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");

  useEffect(() => {
    const fetchSolicitud = async () => {
      try {
        const response = await fetch(`/api/solicitudes/${params.id}`, {
          headers: {
            'Authorization': `Basic ${btoa('admin:lo')}`
          }
        });

        const result = await response.json();

        if (result.success) {
          setSolicitud(result.data);
        } else {
          setError(result.error);
        }
      } catch {
        setError('Error al cargar la solicitud');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchSolicitud();
    }
  }, [params.id]);

  const handlePrint = () => {
    window.print();
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

  const openImageModal = (imageSrc: string) => {
    setModalImageSrc(imageSrc);
    setImageModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-neutral-600">Cargando solicitud...</p>
        </div>
      </div>
    );
  }

  if (error || !solicitud) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error || 'Solicitud no encontrada'}</p>
          <Link href="/admin/solicitudes">
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
              <Link href="/admin/solicitudes">
                <button className="flex items-center px-4 py-2 text-neutral-600 hover:text-neutral-800 transition-colors">
                  <FaArrowLeft className="mr-2" />
                  Volver a Lista
                </button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-neutral-800">
                  Solicitud #{solicitud.id.slice(-8)}
                </h1>
                <p className="text-neutral-600">
                  Enviada el {formatDate(solicitud.createdAt)}
                </p>
              </div>
            </div>
            <button
              onClick={handlePrint}
              className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <FaPrint className="mr-2" />
              Imprimir Formulario
            </button>
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
                  FORMULARIO DE SOLICITUD DE INFORMACIÓN
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
                  <strong>ID de Solicitud:</strong> {solicitud.id}
                </div>
                <div>
                  <strong>Fecha de Envío:</strong> {formatDate(solicitud.createdAt)}
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 print:p-6">
            {/* Datos del Cliente */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-neutral-800 mb-4 pb-2 border-b border-neutral-200">
                DATOS DEL CLIENTE
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-1">
                      Nombres Completos:
                    </label>
                    <p className="text-neutral-900 font-medium border-b border-dotted border-neutral-300 pb-1">
                      {solicitud.nombres}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-1">
                      Correo Electrónico:
                    </label>
                    <p className="text-neutral-900 font-medium border-b border-dotted border-neutral-300 pb-1">
                      {solicitud.email}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-1">
                      Cédula o Pasaporte:
                    </label>
                    <p className="text-neutral-900 font-medium border-b border-dotted border-neutral-300 pb-1">
                      {solicitud.cedula}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-1">
                      Teléfono:
                    </label>
                    <p className="text-neutral-900 font-medium border-b border-dotted border-neutral-300 pb-1">
                      {solicitud.telefono}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-1">
                      Ciudad:
                    </label>
                    <p className="text-neutral-900 font-medium border-b border-dotted border-neutral-300 pb-1">
                      {solicitud.ciudad}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-1">
                      Asesor Asignado:
                    </label>
                    <p className="text-neutral-900 font-medium border-b border-dotted border-neutral-300 pb-1">
                      {solicitud.asesor}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-600 mb-1">
                    Razón de la Solicitud:
                  </label>
                  <p className="text-neutral-900 font-medium border-b border-dotted border-neutral-300 pb-1">
                    {solicitud.razon}
                  </p>
                </div>
              </div>

              {solicitud.comentario && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-neutral-600 mb-1">
                    Comentario o Mensaje:
                  </label>
                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                    <p className="text-neutral-900">
                      {solicitud.comentario}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Documentos Adjuntos */}
            {(solicitud.cedula_frontal_path || solicitud.cedula_trasera_path) && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-neutral-800 mb-4 pb-2 border-b border-neutral-200">
                  DOCUMENTOS ADJUNTOS
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {solicitud.cedula_frontal_path && (
                    <div>
                      <label className="block text-sm font-medium text-neutral-600 mb-2">
                        Cédula - Cara Frontal:
                      </label>
                      <div className="border border-neutral-200 rounded-lg p-4 bg-neutral-50">
                        <div className="print:hidden">
                          <Image
                            src={`/api/files/${solicitud.cedula_frontal_path}`}
                            alt="Cédula frontal"
                            width={300}
                            height={200}
                            className="w-full h-48 object-contain rounded-lg border border-neutral-300 cursor-pointer hover:opacity-80 transition-opacity bg-white"
                            onClick={() => openImageModal(`/api/files/${solicitud.cedula_frontal_path}`)}
                            priority
                          />
                          <p className="text-xs text-neutral-500 text-center mt-2">Click para ampliar</p>
                        </div>
                        <div className="hidden print-block text-center py-4">
                          <p className="text-sm text-neutral-600 mb-2">
                            Cédula - Cara Frontal:
                          </p>
                          <Image
                            src={`/api/files/${solicitud.cedula_frontal_path}`}
                            alt="Cédula frontal"
                            width={400}
                            height={300}
                            className="max-w-full h-auto mx-auto border border-neutral-300"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {solicitud.cedula_trasera_path && (
                    <div>
                      <label className="block text-sm font-medium text-neutral-600 mb-2">
                        Cédula - Cara Trasera:
                      </label>
                      <div className="border border-neutral-200 rounded-lg p-4 bg-neutral-50">
                        <div className="print:hidden">
                          <Image
                            src={`/api/files/${solicitud.cedula_trasera_path}`}
                            alt="Cédula trasera"
                            width={300}
                            height={200}
                            className="w-full h-48 object-contain rounded-lg border border-neutral-300 cursor-pointer hover:opacity-80 transition-opacity bg-white"
                            onClick={() => openImageModal(`/api/files/${solicitud.cedula_trasera_path}`)}
                            priority
                          />
                          <p className="text-xs text-neutral-500 text-center mt-2">Click para ampliar</p>
                        </div>
                        <div className="hidden print-block text-center py-4">
                          <p className="text-sm text-neutral-600 mb-2">
                            Cédula - Cara Trasera:
                          </p>
                          <Image
                            src={`/api/files/${solicitud.cedula_trasera_path}`}
                            alt="Cédula trasera"
                            width={400}
                            height={300}
                            className="max-w-full h-auto mx-auto border border-neutral-300"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Aceptación de Políticas */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-neutral-800 mb-4 pb-2 border-b border-neutral-200">
                ACEPTACIÓN DE POLÍTICAS DE PRIVACIDAD
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
                      ESTADO: ACEPTADO
                    </p>
                    <p className="text-sm text-green-700 mb-3">
                      El cliente ha autorizado de manera expresa, inequívoca y voluntaria a IOMOTORS S.A para tratar,
                      recopilar y conservar sus datos personales, así como para su revisión ante el buro de crédito
                      con la finalidad de cotizar el vehículo y recibir comunicaciones o notificaciones sobre sus
                      productos o servicios.
                    </p>
                    <div className="text-xs text-green-600">
                      <p><strong>Fecha de aceptación:</strong> {formatDate(solicitud.createdAt)}</p>
                      <p><strong>IP de registro:</strong> [Registrado desde formulario web]</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer para impresión */}
            <div className="hidden print:block mt-12 pt-6 border-t border-neutral-300">
              <div className="text-center text-xs text-neutral-500">
                <p>Este documento fue generado automáticamente el {formatDate(new Date().toISOString())}</p>
                <p>IOMOTORS S.A. - Sistema de Gestión de Solicitudes</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal para imágenes */}
      {imageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 print:hidden">
          <div className="bg-white p-4 rounded-lg max-w-4xl max-h-screen overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Documento de Identidad</h3>
              <button
                onClick={() => setImageModalOpen(false)}
                className="text-neutral-500 hover:text-neutral-700 text-xl font-bold"
              >
                ×
              </button>
            </div>
            <Image
              src={modalImageSrc}
              alt="Documento de identidad"
              width={800}
              height={600}
              className="max-w-full h-auto rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SolicitudDetail;