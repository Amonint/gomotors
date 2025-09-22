"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaUpload, FaCheck, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

interface FormData {
  nombres: string;
  email: string;
  cedula: string;
  telefono: string;
  ciudad: string;
  asesor: string;
  razon: string;
  comentario: string;
  cedula_frontal_path: string;
  cedula_trasera_path: string;
  acepta_politicas: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const FormularioSolicitud = () => {
  const [formData, setFormData] = useState<FormData>({
    nombres: "",
    email: "",
    cedula: "",
    telefono: "",
    ciudad: "",
    asesor: "",
    razon: "",
    comentario: "",
    cedula_frontal_path: "",
    cedula_trasera_path: "",
    acepta_politicas: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [previewFrontal, setPreviewFrontal] = useState<string>("");
  const [previewTrasera, setPreviewTrasera] = useState<string>("");

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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nombres.trim()) newErrors.nombres = "El nombre es requerido";
    if (!formData.email.trim()) newErrors.email = "El email es requerido";
    if (!formData.cedula.trim()) newErrors.cedula = "La cédula es requerida";
    if (!formData.telefono.trim()) newErrors.telefono = "El teléfono es requerido";
    if (!formData.ciudad.trim()) newErrors.ciudad = "La ciudad es requerida";
    if (!formData.asesor) newErrors.asesor = "Debe seleccionar un asesor";
    if (!formData.razon) newErrors.razon = "Debe seleccionar una razón";
    if (!formData.acepta_politicas) newErrors.acepta_politicas = "Debe aceptar las políticas";

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Formato de email inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));

    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleFileUpload = async (file: File, type: "frontal" | "trasera") => {
    if (!file) return;

    // Validar tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        [type]: 'Solo se permiten archivos JPG, PNG o PDF'
      }));
      return;
    }

    // Validar tamaño (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        [type]: 'El archivo no debe superar 5MB'
      }));
      return;
    }

    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      const result = await response.json();

      if (result.success) {
        setFormData(prev => ({
          ...prev,
          [`cedula_${type}_path`]: result.path
        }));

        // Crear preview para imágenes
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (type === 'frontal') {
              setPreviewFrontal(e.target?.result as string);
            } else {
              setPreviewTrasera(e.target?.result as string);
            }
          };
          reader.readAsDataURL(file);
        }

        // Limpiar error
        setErrors(prev => ({
          ...prev,
          [type]: ""
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          [type]: result.error
        }));
      }
    } catch {
      setErrors(prev => ({
        ...prev,
        [type]: 'Error al subir el archivo'
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/solicitudes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        // Limpiar formulario
        setFormData({
          nombres: "",
          email: "",
          cedula: "",
          telefono: "",
          ciudad: "",
          asesor: "",
          razon: "",
          comentario: "",
          cedula_frontal_path: "",
          cedula_trasera_path: "",
          acepta_politicas: false,
        });
        setPreviewFrontal("");
        setPreviewTrasera("");
      } else {
        setErrors({ general: result.error });
      }
    } catch {
      setErrors({ general: 'Error al enviar la solicitud. Intente nuevamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-neutral-100 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto text-center"
        >
          <FaCheck className="text-green-500 text-6xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">
            ¡Solicitud Enviada Exitosamente!
          </h2>
          <p className="text-neutral-600 mb-6">
            Hemos recibido su solicitud. Nuestro equipo se pondrá en contacto con usted pronto.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => setIsSuccess(false)}
              className="w-full bg-black text-white py-3 rounded-full hover:bg-neutral-800 transition-colors"
            >
              Enviar otra solicitud
            </button>
            <Link href="/">
              <button className="w-full bg-neutral-200 text-neutral-800 py-3 rounded-full hover:bg-neutral-300 transition-colors">
                Volver al inicio
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="w-full bg-[#F5F5F5] border-b border-neutral-300">
        <div className="max-w-[1600px] mx-auto px-6 py-12 md:py-16 lg:py-20">
          <div className="absolute top-4 md:top-8 left-4 md:left-8">
            <Link
              href="/proteccion-datos"
              className="flex items-center text-white bg-black px-2 md:px-4 py-1 md:py-2 rounded-full hover:bg-neutral-800 transition-colors text-sm md:text-base"
            >
              <FaArrowLeft className="mr-2 text-white" /> Volver
            </Link>
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-2xl md:text-3xl font-normal text-neutral-800 mt-2 text-center">
              Complete el siguiente formulario para que podamos atender su solicitud de manera efectiva
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200">
            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <FaTimes className="text-red-500 mr-2" />
                <span className="text-red-700">{errors.general}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombres */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Nombres *
                </label>
                <input
                  type="text"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black bg-white"
                  placeholder="Ingrese sus nombres completos"
                />
                {errors.nombres && <p className="text-red-500 text-sm mt-1">{errors.nombres}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black bg-white"
                  placeholder="ejemplo@correo.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Cédula */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Cédula o pasaporte *
                </label>
                <input
                  type="text"
                  name="cedula"
                  value={formData.cedula}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black bg-white"
                  placeholder="Número de identificación"
                />
                {errors.cedula && <p className="text-red-500 text-sm mt-1">{errors.cedula}</p>}
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black bg-white"
                  placeholder="Número de teléfono"
                />
                {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
              </div>

              {/* Ciudad */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Ciudad *
                </label>
                <input
                  type="text"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black bg-white"
                  placeholder="Ciudad de residencia"
                />
                {errors.ciudad && <p className="text-red-500 text-sm mt-1">{errors.ciudad}</p>}
              </div>

              {/* Asesor */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Asesor *
                </label>
                <select
                  name="asesor"
                  value={formData.asesor}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black bg-white"
                >
                  <option value="">Seleccione un asesor</option>
                  {asesores.map((asesor) => (
                    <option key={asesor} value={asesor}>
                      {asesor}
                    </option>
                  ))}
                </select>
                {errors.asesor && <p className="text-red-500 text-sm mt-1">{errors.asesor}</p>}
              </div>
            </div>

            {/* Razón */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Razón *
              </label>
              <select
                name="razon"
                value={formData.razon}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black bg-white"
              >
                <option value="">Seleccione una razón</option>
                {razones.map((razon) => (
                  <option key={razon} value={razon}>
                    {razon}
                  </option>
                ))}
              </select>
              {errors.razon && <p className="text-red-500 text-sm mt-1">{errors.razon}</p>}
            </div>

            {/* Comentario */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Comentario o mensaje
              </label>
              <textarea
                name="comentario"
                value={formData.comentario}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black bg-white"
                placeholder="Escriba aquí su comentario o mensaje (opcional)"
              />
            </div>

            {/* Upload Cédula Frontal */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Foto de Cédula cara frontal
              </label>
              <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'frontal');
                  }}
                  className="hidden"
                  id="cedula-frontal"
                />
                <label htmlFor="cedula-frontal" className="cursor-pointer">
                  <FaUpload className="mx-auto text-neutral-400 text-2xl mb-2" />
                  <p className="text-neutral-600">Haga clic para subir archivo</p>
                  <p className="text-sm text-neutral-500">JPG, PNG o PDF (máx. 5MB)</p>
                </label>
                {previewFrontal && (
                  <div className="mt-4">
                    <Image src={previewFrontal} alt="Preview frontal" width={300} height={200} className="w-48 h-32 object-cover mx-auto rounded border" />
                  </div>
                )}
                {formData.cedula_frontal_path && !previewFrontal && (
                  <p className="text-green-600 mt-2">✓ Archivo subido correctamente</p>
                )}
              </div>
              {errors.frontal && <p className="text-red-500 text-sm mt-1">{errors.frontal}</p>}
            </div>

            {/* Upload Cédula Trasera */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Foto de Cédula cara trasera
              </label>
              <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'trasera');
                  }}
                  className="hidden"
                  id="cedula-trasera"
                />
                <label htmlFor="cedula-trasera" className="cursor-pointer">
                  <FaUpload className="mx-auto text-neutral-400 text-2xl mb-2" />
                  <p className="text-neutral-600">Haga clic para subir archivo</p>
                  <p className="text-sm text-neutral-500">JPG, PNG o PDF (máx. 5MB)</p>
                </label>
                {previewTrasera && (
                  <div className="mt-4">
                    <Image src={previewTrasera} alt="Preview trasera" width={300} height={200} className="w-48 h-32 object-cover mx-auto rounded border" />
                  </div>
                )}
                {formData.cedula_trasera_path && !previewTrasera && (
                  <p className="text-green-600 mt-2">✓ Archivo subido correctamente</p>
                )}
              </div>
              {errors.trasera && <p className="text-red-500 text-sm mt-1">{errors.trasera}</p>}
            </div>

            {/* Checkbox Políticas */}
            <div className="mt-6">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="acepta_politicas"
                  checked={formData.acepta_politicas}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 text-black focus:ring-black border-neutral-300 rounded"
                />
                <span className="text-sm text-neutral-700">
                  Autorizo de manera expresa, inequívoca y voluntaria a IOMOTORS S.A para tratar, recopilar y conservar mis datos personales, así como para su revisión ante el buro de crédito con la finalidad de cotizar el vehículo y recibir comunicaciones o notificaciones sobre sus productos o servicios.{" "}
                  <Link href="/proteccion-datos" className="text-black hover:text-neutral-600 underline">
                    Política de Privacidad
                  </Link>{" "}
                  y{" "}
                  <Link href="/cookies" className="text-black hover:text-neutral-600 underline">
                    Política de Cookies
                  </Link>
                  . *
                </span>
              </label>
              {errors.acepta_politicas && <p className="text-red-500 text-sm mt-1">{errors.acepta_politicas}</p>}
            </div>

            {/* Botón de envío */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white py-3 px-6 rounded-full hover:bg-neutral-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Enviando solicitud..." : "Enviar solicitud"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default FormularioSolicitud;