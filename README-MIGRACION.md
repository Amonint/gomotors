# 🚀 Guía de Migración: SQLite → Supabase PostgreSQL

## 📋 Tabla de Contenidos
1. [Resumen de Cambios](#resumen-de-cambios)
2. [Pre-requisitos](#pre-requisitos)
3. [Backup de Seguridad](#backup-de-seguridad)
4. [Proceso de Migración Paso a Paso](#proceso-de-migración-paso-a-paso)
5. [Verificación Post-Migración](#verificación-post-migración)
6. [Rollback (En caso de problemas)](#rollback)
7. [FAQ y Troubleshooting](#faq-y-troubleshooting)

---

## 📝 Resumen de Cambios

### Archivos Modificados
- ✅ `prisma/schema.prisma` - Actualizado a PostgreSQL con tipos de datos optimizados
- ✅ `.env.local` - Nuevas credenciales de Supabase (creado)
- ✅ `package.json` - Scripts adicionales para gestión de base de datos
- ✅ `prisma/migrate-data.js` - Script de migración de datos (nuevo)

### Modelos Migrados
- ✅ Solicitud (solicitudes)
- ✅ RecoleccionDatos (recoleccion_datos)
- ✅ Cotizacion (cotizaciones)
- ✅ Postulacion (postulaciones)
- ✅ Referido (referidos)

### Cambios en Schema
- **Provider**: `sqlite` → `postgresql`
- **Campos de texto largo**: Ahora usan `@db.Text` para mejor rendimiento
- **Pooling**: Configurado con `driverAdapters` y `directUrl`
- **IDs y Fechas**: Mantenidos sin cambios (CUID y DateTime)

---

## ⚙️ Pre-requisitos

### Verificar Versiones
```bash
node --version   # Debe ser >= 18.x
npm --version    # Debe ser >= 9.x
```

### Credenciales de Supabase
Las credenciales ya están configuradas en `.env.local`:
- **DATABASE_URL**: Para conexiones pooled (PgBouncer)
- **DIRECT_URL**: Para migraciones directas

---

## 💾 Backup de Seguridad

**🚨 IMPORTANTE: Haz esto ANTES de continuar**

### Opción 1: Backup Manual
```bash
# Copia el archivo de base de datos SQLite
cp prisma/dev.db prisma/dev.db.backup

# Copia también el archivo WAL si existe
cp prisma/dev.db-wal prisma/dev.db-wal.backup 2>/dev/null || true
cp prisma/dev.db-shm prisma/dev.db-shm.backup 2>/dev/null || true
```

### Opción 2: Backup con Fecha
```bash
# Windows PowerShell
$fecha = Get-Date -Format "yyyyMMdd_HHmmss"
Copy-Item prisma/dev.db "prisma/dev.db.backup.$fecha"

# Linux/Mac
cp prisma/dev.db "prisma/dev.db.backup.$(date +%Y%m%d_%H%M%S)"
```

---

## 🔄 Proceso de Migración Paso a Paso

### PASO 1: Instalar Dependencias
```bash
npm install
```

### PASO 2: Generar Cliente Prisma con Nuevo Schema
```bash
npm run db:generate
```

**Esperado**: Deberías ver un mensaje confirmando la generación del cliente PostgreSQL.

### PASO 3: Crear Estructura de Base de Datos en Supabase

Opción A - **Usando Migraciones (Recomendado para Producción)**:
```bash
# Crear la primera migración
npm run migrate:dev -- --name init_postgresql

# Sigue las instrucciones en pantalla
# Cuando pregunte si quieres crear la base de datos, responde: YES
```

Opción B - **Usando Push (Desarrollo Rápido)**:
```bash
npm run db:push
```

**Esperado**: Las tablas deben crearse en Supabase.

### PASO 4: Verificar Estructura en Supabase

1. Ve a tu dashboard de Supabase: https://supabase.com/dashboard
2. Selecciona tu proyecto: `rzsgjivilgkndlvklilm`
3. Ve a **Table Editor**
4. Verifica que existan estas tablas:
   - ✅ solicitudes
   - ✅ recoleccion_datos
   - ✅ cotizaciones
   - ✅ postulaciones
   - ✅ referidos

### PASO 5: Migrar Datos de SQLite a PostgreSQL

```bash
npm run migrate:data
```

**Salida Esperada**:
```
╔═══════════════════════════════════════════════════════╗
║   MIGRACIÓN DE DATOS: SQLite → Supabase PostgreSQL   ║
╚═══════════════════════════════════════════════════════╝

🔌 Conectando a las bases de datos...
✅ Conexiones establecidas

📦 Migrando Solicitudes...
   📊 Encontrados X registros
   ⏳ Progreso: X/X registros migrados
   ✅ Solicitudes migrado exitosamente: X registros

📦 Migrando RecoleccionDatos...
   📊 Encontrados X registros
   ⏳ Progreso: X/X registros migrados
   ✅ RecoleccionDatos migrado exitosamente: X registros

... (continúa para cada modelo)

╔═══════════════════════════════════════════════════════╗
║                  RESUMEN DE MIGRACIÓN                 ║
╚═══════════════════════════════════════════════════════╝

✅ Solicitudes: X registros migrados
✅ RecoleccionDatos: X registros migrados
✅ Cotizaciones: X registros migrados
✅ Postulaciones: X registros migrados
✅ Referidos: X registros migrados

⏱️  Tiempo total: X.XX segundos
📊 Total de registros migrados: XXX

🎉 ¡MIGRACIÓN COMPLETADA EXITOSAMENTE!
```

### PASO 6: Verificar Datos Migrados

#### Opción 1: Usando Prisma Studio
```bash
npm run db:studio
```
Esto abrirá una interfaz web en `http://localhost:5555` donde puedes ver todos tus datos.

#### Opción 2: Directamente en Supabase
1. Ve a **Table Editor** en Supabase Dashboard
2. Haz clic en cada tabla para ver los registros
3. Verifica que los datos coincidan con tu base SQLite original

---

## ✅ Verificación Post-Migración

### Checklist de Verificación

- [ ] **Contar Registros**: Verifica que el número de registros coincida entre SQLite y PostgreSQL

  ```bash
  # Puedes usar Prisma Studio o consultas directas
  npm run db:studio
  ```

- [ ] **Verificar IDs**: Los IDs (CUID) deben ser idénticos a los originales

- [ ] **Verificar Fechas**: Las fechas `createdAt` y `updatedAt` deben mantenerse

- [ ] **Datos Especiales**:
  - Firmas base64 en `RecoleccionDatos`
  - Rutas de archivos en `Postulacion` y `Solicitud`
  - Campos de texto largo (comentarios, user_agent, etc.)

- [ ] **Probar la Aplicación**:
  ```bash
  npm run dev
  ```
  - Navega a `http://localhost:3000/admin/solicitudes`
  - Navega a `http://localhost:3000/admin/cotizaciones`
  - Navega a `http://localhost:3000/admin/postulaciones`
  - Navega a `http://localhost:3000/admin/referidos`
  - Navega a `http://localhost:3000/admin/recoleccion`

- [ ] **Probar Funcionalidades CRUD**:
  - Crear un nuevo registro
  - Leer registros existentes
  - Actualizar un registro (si aplica)
  - Eliminar un registro de prueba (si aplica)

---

## 🔙 Rollback (En caso de problemas)

Si algo sale mal durante la migración:

### Opción 1: Restaurar .env.local y Schema

1. **Restaurar .env.local**:
   ```bash
   # Elimina .env.local
   rm .env.local

   # La aplicación usará .env con SQLite
   ```

2. **Revertir schema.prisma**:
   ```bash
   git checkout prisma/schema.prisma
   ```

3. **Regenerar cliente**:
   ```bash
   npm run db:generate
   ```

### Opción 2: Restaurar desde Git

```bash
# Ver archivos modificados
git status

# Revertir todos los cambios
git checkout .

# O revertir archivos específicos
git checkout prisma/schema.prisma
git checkout package.json

# Regenerar cliente
npm run db:generate
```

### Opción 3: Restaurar Backup de Base de Datos

```bash
# Restaurar desde backup
cp prisma/dev.db.backup prisma/dev.db
```

---

## 🛠️ FAQ y Troubleshooting

### Error: "Can't reach database server"

**Problema**: No se puede conectar a Supabase.

**Solución**:
1. Verifica que las credenciales en `.env.local` sean correctas
2. Verifica tu conexión a internet
3. Verifica que el proyecto de Supabase esté activo
4. Intenta acceder al dashboard de Supabase

### Error: "Invalid connection string"

**Problema**: URL de conexión mal formada.

**Solución**:
1. Asegúrate de que la contraseña esté correctamente escapada
2. Verifica que no haya espacios al inicio/final de las URLs
3. La contraseña `Gomo2025.` debe tener el punto al final

### Error: "Unique constraint violation"

**Problema**: Intentas migrar datos que ya existen.

**Solución**:
El script usa `upsert`, por lo que esto no debería ocurrir. Si ocurre:
```bash
# Limpia las tablas en Supabase y vuelve a ejecutar
npm run migrate:data
```

### Error: "Prisma Client is not configured"

**Problema**: Cliente Prisma no generado correctamente.

**Solución**:
```bash
# Elimina node_modules/@prisma
rm -rf node_modules/@prisma

# Regenera el cliente
npm run db:generate
```

### La aplicación sigue usando SQLite

**Problema**: Next.js puede tener el cliente en caché.

**Solución**:
```bash
# Detén el servidor
# Limpia .next
rm -rf .next

# Regenera cliente y reinicia
npm run db:generate
npm run dev
```

### Campos de texto se cortan en PostgreSQL

**Problema**: Campos String sin @db.Text tienen límite de 255 caracteres.

**Solución**:
Ya están configurados correctamente en el schema. Si aún así hay problemas:
```bash
# Regenera el cliente y migración
npm run db:generate
npm run migrate:dev
```

---

## 📊 Comparación: SQLite vs PostgreSQL

| Característica | SQLite | PostgreSQL (Supabase) |
|----------------|---------|----------------------|
| **Escalabilidad** | Limitada | Ilimitada |
| **Concurrencia** | Escritura bloqueante | Múltiples escrituras simultáneas |
| **Tamaño BD** | Hasta ~140 TB (teórico) | Sin límites prácticos |
| **Tipos de datos** | Flexibles | Estrictos y optimizados |
| **Backups** | Manual | Automáticos diarios |
| **Rendimiento** | Excelente para lectura local | Excelente para todo, incluso remoto |
| **Hosting** | Solo local | Cloud (accesible desde cualquier lugar) |

---

## 🎯 Próximos Pasos Recomendados

1. **Monitoreo**:
   - Configura alertas en Supabase para uso de base de datos
   - Revisa los logs regularmente

2. **Backups**:
   - Supabase hace backups automáticos diarios
   - Puedes hacer backups manuales adicionales desde el dashboard

3. **Optimización**:
   - Considera agregar índices si tienes consultas lentas
   - Revisa el Query Performance en Supabase Dashboard

4. **Seguridad**:
   - Revisa las Row Level Security (RLS) policies en Supabase
   - Considera habilitar RLS para proteger datos sensibles

5. **Mantén SQLite como Backup Local**:
   - No elimines `prisma/dev.db.backup`
   - Es útil para desarrollo offline

---

## 📞 Soporte

Si encuentras problemas durante la migración:

1. **Logs de Supabase**: Ve a Logs en el Dashboard
2. **Prisma Logs**: Ejecuta comandos con `DEBUG=prisma:*`
3. **Documentación**:
   - [Prisma PostgreSQL](https://www.prisma.io/docs/concepts/database-connectors/postgresql)
   - [Supabase Database](https://supabase.com/docs/guides/database)

---

## ✨ Scripts Disponibles

```bash
# Desarrollo
npm run dev                 # Inicia servidor de desarrollo
npm run db:studio          # Abre Prisma Studio (GUI para BD)

# Base de Datos
npm run db:generate        # Genera cliente Prisma
npm run db:push           # Sincroniza schema sin migraciones
npm run migrate:dev       # Crea y aplica migración (desarrollo)
npm run migrate:prod      # Aplica migraciones (producción)
npm run migrate:data      # Migra datos de SQLite a PostgreSQL

# Producción
npm run build             # Construye aplicación
npm run start             # Inicia en producción
```

---

## 🎉 ¡Listo!

Tu proyecto GoMotors ahora usa **Supabase PostgreSQL**. Disfruta de:
- ✅ Mayor escalabilidad
- ✅ Backups automáticos
- ✅ Mejor rendimiento en producción
- ✅ Acceso desde cualquier lugar
- ✅ Dashboard profesional para gestionar datos

**¿Alguna duda?** Revisa la sección de [Troubleshooting](#faq-y-troubleshooting) o consulta la documentación oficial.
