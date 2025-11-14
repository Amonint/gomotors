# 🚀 Inicio Rápido - Migración a Supabase PostgreSQL

## ⚡ Migración en 5 Pasos

### 1️⃣ BACKUP (CRÍTICO)
```bash
# Windows PowerShell
Copy-Item prisma/dev.db prisma/dev.db.backup
```

### 2️⃣ GENERAR CLIENTE
```bash
npm install
npm run db:generate
```

### 3️⃣ CREAR ESTRUCTURA EN SUPABASE
```bash
npm run db:push
```

### 4️⃣ MIGRAR DATOS
```bash
npm run migrate:data
```

### 5️⃣ VERIFICAR
```bash
npm run migrate:verify
npm run db:studio
```

## ✅ Verificación Rápida

Abre en tu navegador:
- **Supabase**: https://supabase.com/dashboard/project/rzsgjivilgkndlvklilm
- **Prisma Studio**: `npm run db:studio` → http://localhost:5555

## ⚠️ Si algo falla

```bash
# Volver a SQLite
rm .env.local
git checkout prisma/schema.prisma
npm run db:generate
```

## 📚 Documentación Completa

Lee `README-MIGRACION.md` para detalles completos.

## 🎯 Scripts Disponibles

```bash
npm run migrate:data      # Migrar datos
npm run migrate:verify    # Verificar migración
npm run db:studio        # Ver datos (GUI)
npm run db:push          # Sincronizar schema
npm run migrate:dev      # Crear migración
```

---

**¿Todo listo?** Sigue los 5 pasos arriba y estarás en producción en minutos. 🎉
