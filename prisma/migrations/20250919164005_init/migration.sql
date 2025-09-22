-- CreateTable
CREATE TABLE "solicitudes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombres" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "asesor" TEXT NOT NULL,
    "razon" TEXT NOT NULL,
    "comentario" TEXT,
    "cedula_frontal_path" TEXT,
    "cedula_trasera_path" TEXT,
    "acepta_politicas" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
