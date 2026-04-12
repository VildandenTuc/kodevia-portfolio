# /cerrar-sesion

Cierra la sesión de desarrollo de Kodevia Portfolio registrando todo el trabajo realizado en todos los sistemas de memoria y archivos de tracking del proyecto.

## Qué hace este comando

1. Pregunta al usuario qué se hizo en la sesión (si no se especificó como argumento)
2. Actualiza `frontend/AVANCE-FRONTEND.md` con fecha, hora, ticket y lista de lo completado
3. Actualiza `CLAUDE.md` si hubo cambios estructurales en el proyecto
4. Guarda memoria en el sistema de archivos local (`memory/`)
5. Guarda memoria en engram con `mem_save`
6. Opcionalmente actualiza el backlog en `frontend/BACKLOG.md`

## Instrucciones de ejecución

Cuando el usuario ejecute `/cerrar-sesion`, seguí estos pasos:

### Paso 1 — Recopilar contexto de la sesión
Revisá la conversación actual y determiná:
- Qué archivos se modificaron
- Qué features o fixes se implementaron
- Qué decisiones técnicas se tomaron
- Qué quedó pendiente

### Paso 2 — Actualizar AVANCE-FRONTEND.md
Agregá al final del archivo una nueva entrada con este formato:

```
## Sesión N - Ticket #XXX: [Título descriptivo]

**Fecha:** YYYY-MM-DD
**Hora:** HH:MM
**Ticket/Sesión:** #XXX - [descripción]

### Completado
- [item 1]
- [item 2]

### Archivos modificados
- `ruta/archivo` — descripción del cambio

### Pendiente / Próximos pasos
- Ver BACKLOG.md
```

### Paso 3 — Guardar en memoria local (memory/)
Actualizá o creá el archivo de memoria más relevante en:
`C:\Users\guido\.claude\projects\D--Programacion-5-Proyectos-Proyecto-Kodevia-kodevia-portfolio\memory\`

Asegurate de actualizar `MEMORY.md` con el puntero si creás un archivo nuevo.

### Paso 4 — Guardar en engram
Llamá a `mem_save` con:
- `project`: `kodevia-portfolio`
- `type`: `decision` o `pattern` según corresponda
- `title`: título corto y searchable
- `content`: formato **What** / **Why** / **Where** / **Learned**

### Paso 5 — Actualizar BACKLOG.md
Si surgieron nuevas tareas pendientes, agregarlas al backlog bajo la sección correspondiente.

### Paso 6 — Confirmar al usuario
Reportá un resumen de lo que se registró y en dónde.
