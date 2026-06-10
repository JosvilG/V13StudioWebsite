# Contenido editable desde Google Sheets

La web lee proyectos, equipo y stats de una hoja de Google Sheets publicada como CSV.
Editas la hoja → la web se actualiza sola en ≤10 minutos. Sin deploys.

## Crear la hoja (una sola vez)

1. Crea un documento en Google Sheets con tres pestañas: `projects`, `team`, `stats`.
2. Primera fila de cada pestaña = cabeceras EXACTAS (en minúsculas):

   **projects**: `id`, `title`, `year`, `color`, `tags`, `url`, `category_en`, `category_es`, `category_ca`, `description_en`, `description_es`, `description_ca`
   - `tags`: separadas por comas (`React Native, NestJS`)
   - `color`: hex (`#8B5CF6`)
   - `url`: opcional, enlace al proyecto
   - Una fila sin `id` o `title` se ignora.

   **team**: `initials`, `color`, `role_en`, `role_es`, `role_ca`

   **stats**: `value`, `label_en`, `label_es`, `label_ca`

3. Para CADA pestaña: Archivo → Compartir → Publicar en la web → selecciona la pestaña →
   formato "Valores separados por comas (.csv)" → Publicar. Copia la URL resultante
   (termina en `output=csv`).

## Configurar las URLs

Pon cada URL en su variable de entorno (local: `.env.local`; producción: Vercel →
Settings → Environment Variables):

- `SHEETS_PROJECTS_CSV_URL`
- `SHEETS_TEAM_CSV_URL`
- `SHEETS_STATS_CSV_URL`

Tras añadirlas en Vercel hace falta UN deploy (solo esta vez). Después, editar la hoja
nunca requiere deploy.

## Comportamiento

- Sin proyectos (pestaña vacía): la sección Portfolio, el enlace "Work" del menú y el
  botón del hero desaparecen. Aparecen solos al añadir la primera fila.
- Si Google Sheets no responde, la web sirve el último contenido cacheado. Nunca rompe.
- Si falta una traducción, se usa la columna `_en` como respaldo.

## Formulario de contacto (SMTP IONOS)

Variables (local: `.env.local`; producción: Vercel): `SMTP_HOST`, `SMTP_PORT`,
`SMTP_USER`, `SMTP_PASS`, `CONTACT_TO`. Plantilla en `.env.example`.
La contraseña es la del buzón de correo IONOS (crea el buzón en el panel de IONOS si
no existe).
