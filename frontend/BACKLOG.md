# Backlog Kodevia Portfolio

Última actualización: 2026-04-18 (sesión 20)

---

## Prioridad Baja

### ~~[BACK-008] Preparar migración a Vite + React~~ ❌ RECHAZADO 2026-04-18
Landing page estática con Lighthouse 99/100/100/100. No hay justificación técnica para agregar complejidad. Reevaluar solo si el backend Spring Boot requiere consumo dinámico de APIs.

---

### [BACK-009] Implementar backend Spring Boot
**Tipo:** Arquitectura
**Contexto:** La carpeta `backend/` existe pero está vacía. Cuando se implemente:
- Formulario de contacto → endpoint real (actualmente usa FormSubmit.co)
- Posible CMS para artículos del blog
- Ver `CLAUDE.md` sección "Backend Architecture (Planned)" para el stack completo

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
- [x] **[BACK-001]** Imágenes proyectos: 3 SVGs locales en `img/proyectos/` (reemplazó Unsplash) — *2026-04-14*
- [x] **[BACK-002]** Testimonios ficticios reemplazados: Humberto Ávila y Angel Alum (textos reales) — *2026-04-16*
- [x] **[BACK-003]** Links GitHub verificados: usuario VildandenTuc correcto — *2026-04-14*
- [x] **[BACK-004/007]** Footer año dinámico: `new Date().getFullYear()` — *2026-04-14*
- [x] **[BACK-005]** Lighthouse: Performance 99 / Accessibility 100 / Best Practices 100 / SEO 100 — *2026-04-12*
- [x] **[BACK-010]** Formulario de contacto verificado: FormSubmit.co → infokodevia@gmail.com funcional — *2026-04-14*
- [x] **[BACK-005]** Accesibilidad: Lighthouse 100 + revisión visual confirmada — *2026-04-18*
- [x] **[BACK-006]** Imágenes hero revisadas visualmente: correctas y apropiadas — *2026-04-18*
- [x] **[BACK-011]** Deploy kodevia.cloud LIVE en producción con HTTPS y CI/CD operativo — *2026-04-18*
