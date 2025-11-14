-- ================================================
-- SCRIPT PARA CREAR TABLAS EN SUPABASE
-- ================================================
-- Copia y pega este script completo en:
-- Supabase Dashboard → SQL Editor → New Query
-- Luego haz clic en "RUN"
-- ================================================

-- Tabla: solicitudes
CREATE TABLE IF NOT EXISTS solicitudes (
    id TEXT PRIMARY KEY,
    nombres TEXT NOT NULL,
    email TEXT NOT NULL,
    cedula TEXT NOT NULL,
    telefono TEXT NOT NULL,
    ciudad TEXT NOT NULL,
    asesor TEXT NOT NULL,
    razon TEXT NOT NULL,
    comentario TEXT,
    cedula_frontal_path TEXT,
    cedula_trasera_path TEXT,
    acepta_politicas BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: recoleccion_datos
CREATE TABLE IF NOT EXISTS recoleccion_datos (
    id TEXT PRIMARY KEY,
    nombres TEXT NOT NULL,
    email TEXT NOT NULL,
    cedula TEXT NOT NULL,
    telefono TEXT NOT NULL,
    ciudad TEXT NOT NULL,
    asesor TEXT NOT NULL,
    razon TEXT NOT NULL,
    comentario TEXT,
    acepta_politicas BOOLEAN NOT NULL DEFAULT true,
    ip_address TEXT,
    user_agent TEXT,
    firma_base64 TEXT NOT NULL DEFAULT '',
    firma_fecha TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    firma_ip TEXT,
    firma_dispositivo TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: cotizaciones
CREATE TABLE IF NOT EXISTS cotizaciones (
    id TEXT PRIMARY KEY,
    nombre_completo TEXT NOT NULL,
    telefono TEXT NOT NULL,
    ciudad TEXT NOT NULL,
    marca_interes TEXT NOT NULL,
    segmento TEXT NOT NULL,
    forma_pago TEXT,
    comentario TEXT,
    acepta_terminos BOOLEAN NOT NULL DEFAULT true,
    ip_address TEXT,
    user_agent TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: postulaciones
CREATE TABLE IF NOT EXISTS postulaciones (
    id TEXT PRIMARY KEY,
    nombre TEXT NOT NULL,
    apellidos TEXT NOT NULL,
    email TEXT NOT NULL,
    telefono TEXT NOT NULL,
    puesto TEXT NOT NULL,
    mensaje TEXT,
    cv_filename TEXT,
    cv_path TEXT,
    acepta_terminos BOOLEAN NOT NULL DEFAULT true,
    ip_address TEXT,
    user_agent TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: referidos
CREATE TABLE IF NOT EXISTS referidos (
    id TEXT PRIMARY KEY,
    referente_nombre TEXT NOT NULL,
    referente_apellidos TEXT,
    referente_cedula TEXT,
    referente_telefono TEXT,
    referente_email TEXT NOT NULL,
    referido_nombre TEXT NOT NULL,
    referido_apellidos TEXT,
    referido_telefono TEXT,
    referido_ocupacion TEXT,
    acepta_terminos BOOLEAN NOT NULL DEFAULT true,
    ip_address TEXT,
    user_agent TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ================================================
-- TRIGGERS PARA ACTUALIZAR "updatedAt" AUTOMÁTICAMENTE
-- ================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para solicitudes
DROP TRIGGER IF EXISTS update_solicitudes_updated_at ON solicitudes;
CREATE TRIGGER update_solicitudes_updated_at
    BEFORE UPDATE ON solicitudes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para recoleccion_datos
DROP TRIGGER IF EXISTS update_recoleccion_datos_updated_at ON recoleccion_datos;
CREATE TRIGGER update_recoleccion_datos_updated_at
    BEFORE UPDATE ON recoleccion_datos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para cotizaciones
DROP TRIGGER IF EXISTS update_cotizaciones_updated_at ON cotizaciones;
CREATE TRIGGER update_cotizaciones_updated_at
    BEFORE UPDATE ON cotizaciones
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para postulaciones
DROP TRIGGER IF EXISTS update_postulaciones_updated_at ON postulaciones;
CREATE TRIGGER update_postulaciones_updated_at
    BEFORE UPDATE ON postulaciones
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para referidos
DROP TRIGGER IF EXISTS update_referidos_updated_at ON referidos;
CREATE TRIGGER update_referidos_updated_at
    BEFORE UPDATE ON referidos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ================================================
-- VERIFICACIÓN
-- ================================================
SELECT
    table_name,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE'
    AND table_name IN ('solicitudes', 'recoleccion_datos', 'cotizaciones', 'postulaciones', 'referidos')
ORDER BY table_name;
