# Backlog Kodevia Portfolio

Última actualización: 2026-04-12

---

## Prioridad Alta

### [BACK-001] Reemplazar imágenes de proyectos (Unsplash → locales)
**Tipo:** Mejora / Independencia de servicios externos
**Contexto:** Las tarjetas de proyectos y los modales de casos de estudio usan URLs de Unsplash. Mismo problema que tenían las imágenes del blog (ya resuelto con SVGs).
**Archivos afectados:**
- `index.html` línea ~880: proyecto Biblioteca (`photo-1521587760476`)
- `index.html` línea ~934: proyecto Instituto web (`photo-1517245386807`)
- `index.html` línea ~987: proyecto APIs REST (`photo-1558494949`)
- `index.html` líneas ~1060, ~1297, ~1484: mismas imágenes en modales de casos de estudio
**Solución sugerida:** Crear SVGs temáticos en `img/proyectos/` igual que se hizo con el blog, o conseguir capturas/mockups reales de los proyectos.

---

### [BACK-002] Revisar y completar testimonios
**Tipo:** Contenido
**Contexto:** Solo el testimonio de Angel Alum (Instituto Privado Tucumán) está verificado como real. Los otros dos — "Carlos Ramírez (CTO - StartUp Logística)" y "Ana Laura Gómez (Gerente IT - Distribuidora Norte)" — necesitan confirmación de si son reales o ficticios.
**También:** En los modales de casos de estudio hay testimonios de "Prof. María González" y "Lic. Roberto Fernández" que también deben revisarse.
**Acción requerida:** Confirmar con el usuario cuáles son reales y cuáles reemplazar.

---

### [BACK-003] Verificar links de GitHub
**Tipo:** Contenido / Funcionalidad
**Contexto:** Los proyectos apuntan a `github.com/VildandenTuc` — confirmar si ese es el usuario correcto o si cambió.
- Proyecto Biblioteca: `github.com/VildandenTuc/Sistema-Biblioteca-IPT-Desktop`
- Proyecto APIs: `github.com/VildandenTuc?tab=repositories`
**Acción requerida:** Verificar que los repositorios existen y son públicos. Actualizar si el usuario de GitHub cambió.

---

## Prioridad Media

### [BACK-004] Actualizar año del footer
**Tipo:** Contenido
**Contexto:** El footer dice `© 2025 Kodevia`. Estamos en 2026.
**Archivo:** `index.html` línea ~2685
**Fix:** Cambiar a `© 2026` o usar JS dinámico: `new Date().getFullYear()`.

---

### [BACK-005] Auditoría de accesibilidad
**Tipo:** Calidad / SEO
**Contexto:** No se ha hecho una revisión formal de accesibilidad. Verificar:
- Alt texts en todas las imágenes (hero, stack, proyectos, blog)
- Contraste de colores (especialmente texto sobre imágenes SVG del blog)
- Navegación por teclado (Tab order, focus states)
- Roles ARIA donde corresponda
**Herramienta:** Chrome DevTools → Lighthouse → Accessibility

---

### [BACK-006] Revisar imágenes del hero (calidad y temática)
**Tipo:** Contenido visual
**Contexto:** El hero usa `img/hero/hero1.webp`, `hero2.webp`, `hero3.webp` — están locales, bien. Revisar si las imágenes son apropiadas para representar a Kodevia (código, backend, profesional).

---

### [BACK-007] Copyright y año en el footer
**Tipo:** Contenido
**Contexto:** `© 2025 Kodevia` — actualizar a 2026 o hacer dinámico.

---

## Prioridad Baja

### [BACK-008] Preparar migración a Vite + React
**Tipo:** Arquitectura / Planificación
**Contexto:** Según CLAUDE.md el sitio es "transitional" — HTML estático antes de migrar a Vite + React. Cuando se decida hacer la migración, el backlog técnico incluye:
- Inicializar proyecto Vite
- Separar componentes (Header, Hero, Blog, Proyectos, etc.)
- Migrar estilos CSS a módulos o Tailwind
- Configurar router (React Router)
- CI/CD para build y deploy en VPS Hostinger con Docker

---

### [BACK-009] Implementar backend Spring Boot
**Tipo:** Arquitectura
**Contexto:** La carpeta `backend/` existe pero está vacía. Cuando se implemente:
- Formulario de contacto → endpoint real (actualmente probablemente usa Formspree u otro)
- Posible CMS para artículos del blog
- Ver `CLAUDE.md` sección "Backend Architecture (Planned)" para el stack completo

---

### [BACK-010] Formulario de contacto — verificar destino
**Tipo:** Funcionalidad
**Contexto:** El formulario existe con validación JS. Revisar a dónde envía los datos (¿Formspree? ¿EmailJS? ¿ningún lado aún?). Confirmar que `infokodevia@gmail.com` recibe los mensajes.

---

---

## Infraestructura / DevOps

### [BACK-011] Ejecutar deploy al VPS (cuando el sitio esté listo)
**Tipo:** DevOps
**Estado:** PENDIENTE — workflow preparado, no ejecutar hasta que el sitio esté terminado
**Pasos:** Ver `.github/DEPLOY-SETUP.md` (guía paso a paso completa)
**Resumen:**
1. Subir repo a GitHub
2. Generar SSH key dedicada para deploy
3. Autorizar la clave en el VPS
4. Clonar repo en `/var/www/kodevia-portfolio` en el VPS
5. Configurar Nginx apuntando a `frontend/`
6. Cargar 4 secrets en GitHub (VPS_HOST, VPS_USER, VPS_SSH_KEY, VPS_PATH)
7. Verificar primer deploy automático

---

## Completado

- [x] **[DONE-001]** Blog thumbnails: 5 SVGs locales en `img/blog/` (reemplazó placehold.co) — *2026-04-12*
- [x] **[DONE-002]** Testimonio actualizado: María Belén Torres → Angel Alum, Representante Legal - Instituto Privado Tucumán — *2026-04-12*
