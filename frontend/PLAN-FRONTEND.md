# Portafolio Kodevia - Instrucciones de Implementación

## Estructura del Proyecto

```
portafolio-kodevia/
│
├── index.html          (Archivo principal)
└── img/
    └── logo-kodevia.webp   (Logo de la marca)
```

## Pasos para Implementar

### 1. Condiciones iniciales

Se trabajara por metodología de tickets en donde siempre se registre hora y fecha.
Lo avances del proyecto se iran registrando en el archivo AVANCE-FRONTEND.md con fecha, hora y ticket (sesion) con todo lo ya creado y fucionando.
El archivo PLAN-FRONTEND.md solo contendra lo que ya tiene mas todo lo nuevo que se vaya planificando.
La pc en donde desarrollamos este kodevia portfolio corre un sistema operativo Windows 11 con Powershell, VSCode, MySQL worckbench, Vite + React, Claude Code,
El VPS Hostinger contiene Nginx, Portainer, Ubuntu 22.04 LTSC como sistema operativo, MySQL y Docker instalados como servicio.

### 2. Agregar el Logo

- Cree una subcarpeta llamada `img` dentro de `portafolio-kodevia`
- Coloque su logo con el nombre `logo-kodevia.webp` dentro de la carpeta `img`
- Formato recomendado: WebP, PNG o JPG
- Dimensiones recomendadas: 120x40 píxeles (ancho x alto)

### 3. Abrir el Sitio

Simplemente abra el archivo `index.html` con su navegador web preferido (Chrome, Firefox, Edge, etc.).

## Características Implementadas

✓ Diseño 100% responsive (desktop, tablet, móvil)
✓ Menú hamburguesa funcional para dispositivos móviles
✓ Navegación suave entre secciones (smooth scroll)
✓ Variables CSS para fácil personalización de colores
✓ Formulario de contacto con validación
✓ Secciones: Hero, Stack Tecnológico, CV, Proyectos, Contacto
✓ Diseño minimalista y profesional
✓ Slideshow automático en sección Hero (3 imágenes con efecto fade)
✓ Tarjetas de Stack Tecnológico expandibles con imágenes de fondo blur
✓ Botones de GitHub en proyectos con iconos SVG
✓ Logo institucional en sección About
✓ Sección de descarga de CV bilingüe (Español/Inglés) con iconos de descarga

## Personalización

### Cambiar Colores

Edite las variables CSS en la sección `:root` del archivo HTML (líneas 12-17):

```css
:root {
  --color-kodevia-principal: #0047ab; /* Azul principal */
  --color-kodevia-texto-oscuro: #36454f; /* Gris para texto */
  --color-kodevia-fondo-claro: #ffffff; /* Fondo blanco */
}
```

### Modificar Contenido

- **Proyectos**: Edite las tarjetas en la sección `#proyectos` (líneas 238-275)
- **Stack Tecnológico**: Modifique las tecnologías en la sección `#stack` (líneas 215-236)
- **Información de Contacto**: Actualice email y ubicación en la sección `#contacto` (líneas 283-285)

## Hosting y Publicación

Para publicar su portafolio en línea: servidor web VPS ya contratado en Hostinger

## Notas Técnicas

- **Navegadores compatibles**: Chrome, Firefox, Safari, Edge (últimas versiones)
- **Sin dependencias externas**: Todo el CSS y JavaScript está incluido en el HTML
- **Fuente**: Roboto (cargada desde Google Fonts)
- **Semántica HTML5**: Utiliza etiquetas semánticas (`<header>`, `<nav>`, `<section>`, etc.)

## Contacto

Email: infokodevia@gmail.com
Ubicación: San Miguel de Tucumán, Argentina

---

**Kodevia** © 2025 - Ingeniería de software con precisión.
