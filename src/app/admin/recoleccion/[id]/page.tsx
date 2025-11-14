"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaPrint, FaCheck } from "react-icons/fa";
import Link from "next/link";
import { useParams } from "next/navigation";

interface RecoleccionData {
  id: string;
  nombres: string;
  email: string;
  cedula: string;
  telefono: string;
  ciudad: string;
  asesor: string;
  razon: string;
  comentario?: string;
  acepta_politicas: boolean;
  ip_address?: string;
  user_agent?: string;
  firma_base64?: string;
  firma_fecha?: string;
  firma_ip?: string;
  firma_dispositivo?: string;
  createdAt: string;
  updatedAt: string;
}

const RecoleccionDetailPage = () => {
  const params = useParams();
  const [recoleccion, setRecoleccion] = useState<RecoleccionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecoleccion = async () => {
      try {
        const response = await fetch(`/api/recoleccion-datos/${params.id}`, {
          headers: {
            'Authorization': `Basic ${btoa('admin:lo')}`
          }
        });

        const result = await response.json();

        if (result.success) {
          setRecoleccion(result.data);
        } else {
          setError(result.error);
        }
      } catch {
        setError('Error al cargar el registro');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchRecoleccion();
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

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-neutral-600">Cargando registro...</p>
        </div>
      </div>
    );
  }

  if (error || !recoleccion) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error || 'Registro no encontrado'}</p>
          <Link href="/admin/recoleccion">
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
              <Link href="/admin/recoleccion">
                <button className="flex items-center px-4 py-2 text-neutral-600 hover:text-neutral-800 transition-colors">
                  <FaArrowLeft className="mr-2" />
                  Volver a Lista
                </button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-neutral-800">
                  Registro #{recoleccion.id.slice(-8)}
                </h1>
                <p className="text-neutral-600">
                  Registrado el {formatDate(recoleccion.createdAt)}
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
                  FORMULARIO DE RECOLECCIÓN DE DATOS
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
                  <strong>ID de Registro:</strong> {recoleccion.id}
                </div>
                <div>
                  <strong>Fecha de Registro:</strong> {formatDate(recoleccion.createdAt)}
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
                      {recoleccion.nombres}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-1">
                      Correo Electrónico:
                    </label>
                    <p className="text-neutral-900 font-medium border-b border-dotted border-neutral-300 pb-1">
                      {recoleccion.email}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-1">
                      Cédula o Pasaporte:
                    </label>
                    <p className="text-neutral-900 font-medium border-b border-dotted border-neutral-300 pb-1">
                      {recoleccion.cedula}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-1">
                      Teléfono:
                    </label>
                    <p className="text-neutral-900 font-medium border-b border-dotted border-neutral-300 pb-1">
                      {recoleccion.telefono}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-1">
                      Ciudad:
                    </label>
                    <p className="text-neutral-900 font-medium border-b border-dotted border-neutral-300 pb-1">
                      {recoleccion.ciudad}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-1">
                      Asesor Seleccionado:
                    </label>
                    <p className="text-neutral-900 font-medium border-b border-dotted border-neutral-300 pb-1">
                      {recoleccion.asesor}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-600 mb-1">
                    Razón de Contacto:
                  </label>
                  <p className="text-neutral-900 font-medium border-b border-dotted border-neutral-300 pb-1">
                    {recoleccion.razon}
                  </p>
                </div>
              </div>

              {recoleccion.comentario && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-neutral-600 mb-1">
                    Comentario o Mensaje:
                  </label>
                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                    <p className="text-neutral-900">
                      {recoleccion.comentario}
                    </p>
                  </div>
                </div>
              )}
            </div>

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
                      ESTADO: TÉRMINOS ACEPTADOS
                    </p>
                    <p className="text-sm text-green-700 mb-3">
                      El cliente ha autorizado de manera expresa, inequívoca y voluntaria a IOMOTORS S.A para tratar,
                      recopilar y conservar sus datos personales, así como para su revisión ante el buro de crédito
                      con la finalidad de cotizar el vehículo y recibir comunicaciones o notificaciones sobre sus
                      productos o servicios. Política de Privacidad y Política de Cookies.
                    </p>
                    <div className="text-xs text-green-600">
                      <p><strong>Fecha de aceptación:</strong> {formatDate(recoleccion.createdAt)}</p>
                      <p><strong>IP de registro:</strong> {recoleccion.ip_address || '[No disponible]'}</p>
                      <p><strong>Navegador:</strong> {recoleccion.user_agent ? recoleccion.user_agent.substring(0, 100) + '...' : '[No disponible]'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Firma Digital */}
            {recoleccion.firma_base64 && (
              <div className="mb-8 page-break-before">
                <h3 className="text-lg font-bold text-neutral-800 mb-4 pb-2 border-b border-neutral-200">
                  FIRMA DIGITAL
                </h3>

                <div className="bg-white border-2 border-black rounded-lg p-6 print:border-black">
                  <div className="mb-4">
                    <div className="border-2 border-neutral-300 rounded-lg p-4 bg-white inline-block">
                      <img
                        src={recoleccion.firma_base64}
                        alt="Firma Digital del Cliente"
                        className="max-w-[400px] w-full h-auto print:max-w-[300px]"
                      />
                    </div>
                  </div>

                  <div className="border-t border-neutral-300 pt-4 mt-4">
                    <p className="text-sm font-medium text-neutral-800 mb-2">
                      Firma Digital del Cliente
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-neutral-600">
                      <div>
                        <strong>Fecha de Firma:</strong><br />
                        {recoleccion.firma_fecha ? formatDate(recoleccion.firma_fecha) : formatDate(recoleccion.createdAt)}
                      </div>
                      <div>
                        <strong>Dispositivo:</strong><br />
                        {recoleccion.firma_dispositivo || 'Desconocido'}
                      </div>
                      <div>
                        <strong>IP de Firma:</strong><br />
                        {recoleccion.firma_ip || recoleccion.ip_address || 'No disponible'}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-neutral-300 text-xs text-neutral-500 text-center print:text-[10px]">
                    <p>Esta firma digital fue capturada electrónicamente y tiene validez legal según la normativa vigente.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Metadata del sistema */}
            <div className="mb-8 print:hidden">
              <h3 className="text-lg font-bold text-neutral-800 mb-4 pb-2 border-b border-neutral-200">
                INFORMACIÓN DEL SISTEMA
              </h3>

              <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Dirección IP:</strong><br />
                    <span className="text-neutral-600">{recoleccion.ip_address || 'No disponible'}</span>
                  </div>
                  <div>
                    <strong>Navegador:</strong><br />
                    <span className="text-neutral-600 break-all">{recoleccion.user_agent || 'No disponible'}</span>
                  </div>
                  <div>
                    <strong>Fecha de creación:</strong><br />
                    <span className="text-neutral-600">{formatDate(recoleccion.createdAt)}</span>
                  </div>
                  <div>
                    <strong>Última actualización:</strong><br />
                    <span className="text-neutral-600">{formatDate(recoleccion.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer para impresión */}
            <div className="hidden print:block mt-12 pt-6 border-t border-neutral-300">
              <div className="text-center text-xs text-neutral-500">
                <p>Este documento fue generado automáticamente el {formatDate(new Date().toISOString())}</p>
                <p>IOMOTORS S.A. - Sistema de Gestión de Recolección de Datos</p>
                <p>REGISTRO DE ACEPTACIÓN DE POLÍTICAS - RECOLECCIÓN DE DATOS</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RecoleccionDetailPage;