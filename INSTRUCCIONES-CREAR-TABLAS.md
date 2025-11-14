# 📋 Instrucciones: Crear Tablas en Supabase

## 🚀 Paso 1: Abrir SQL Editor en Supabase

1. Ve a: **https://supabase.com/dashboard/project/rzsgjuiltgkndlvklilm**
2. En el menú lateral izquierdo, haz clic en **SQL Editor** (icono: `</>`)
3. Haz clic en el botón **"+ New query"**

## 📝 Paso 2: Copiar y Ejecutar el Script SQL

1. Abre el archivo: **`supabase-create-tables.sql`**
2. **Copia TODO el contenido** del archivo (Ctrl+A, Ctrl+C)
3. **Pégalo** en el editor SQL de Supabase (Ctrl+V)
4. Haz clic en el botón **"RUN"** (o presiona Ctrl+Enter)

## ✅ Paso 3: Verificar que se crearon las Tablas

Deberías ver un mensaje de éxito y una tabla de resultados al final que muestra:

```
table_name          | column_count
--------------------|-------------
cotizaciones        | 12
postulaciones       | 13
recoleccion_datos   | 17
referidos           | 14
solicitudes         | 13
```

También puedes verificar manualmente:
1. Ve a **Table Editor** en el menú lateral
2. Deberías ver todas estas tablas:
   - ✅ cotizaciones
   - ✅ postulaciones
   - ✅ recoleccion_datos
   - ✅ referidos
   - ✅ solicitudes

## 🔄 Paso 4: Regenerar Cliente Prisma

Una vez que las tablas estén creadas, ejecuta en tu terminal:

```bash
npm run db:generate
```

## 🧪 Paso 5: Probar la Aplicación

```bash
npm run dev
```

Luego abre:
- **Admin Solicitudes**: http://localhost:3000/admin/solicitudes
- **Admin Cotizaciones**: http://localhost:3000/admin/cotizaciones
- **Admin Postulaciones**: http://localhost:3000/admin/postulaciones
- **Admin Referidos**: http://localhost:3000/admin/referidos
- **Admin Recolección**: http://localhost:3000/admin/recoleccion

## ❓ Si algo sale mal

### Error: "relation already exists"
Significa que las tablas ya existen. Esto es normal si reejecutas el script.

### Las tablas no aparecen
1. Verifica que ejecutaste el script completo
2. Actualiza la página del Table Editor
3. Verifica que estás viendo el schema "public"

### Error de permisos
Verifica que tu usuario tenga permisos de admin en el proyecto.

---

## 📞 Siguiente Paso

Una vez que confirmes que las tablas están creadas, avísame para continuar con las pruebas de funcionamiento.
