# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kodevia Portfolio is a monorepo containing a portfolio website with planned backend services. The project showcases software engineering capabilities focused on Java/Spring Boot enterprise applications.

**Development Environment:**
- OS: Windows 11 with PowerShell
- IDE: VSCode
- Tools: MySQL Workbench, Vite + React (planned), Claude Code

**Deployment Environment:**
- VPS: Hostinger
- OS: Ubuntu 22.04 LTSC
- Web Server: Nginx
- Containerization: Docker (with Portainer)
- Database: MySQL

## Repository Structure

```
kodevia-portfolio/
├── backend/                    # Empty - awaiting Spring Boot implementation
├── frontend/                   # Static HTML portfolio (transitional architecture)
│   ├── index.html              # Main HTML (structure only)
│   ├── img/
│   │   ├── logo-kodevia.webp   # Brand logo (120x40px)
│   │   ├── hero/               # Hero slideshow images (hero1-3.webp)
│   │   ├── stack/              # Tech stack section images
│   │   ├── blog/               # Blog thumbnails (5 SVGs — NO external services)
│   │   └── originals/          # Original unoptimized assets
│   ├── docs/                   # CV PDFs (ES + EN)
│   ├── PLAN-FRONTEND.md        # Feature planning document
│   ├── AVANCE-FRONTEND.md      # Progress tracking with date/time/ticket
│   └── BACKLOG.md              # Prioritized backlog for upcoming sessions
├── .claude/
│   └── commands/
│       └── cerrar-sesion.md    # Custom command to close dev sessions
├── .github/
│   ├── workflows/
│   │   └── deploy.yml          # GitHub Actions: push a main → SSH → git pull en VPS
│   └── DEPLOY-SETUP.md         # Guía paso a paso para configurar el deploy
└── kodevia-portfolio.code-workspace
```

## Frontend Architecture

**Current State:** Static HTML/CSS/JS (separated files), no build tools
**Future State:** Migration to Vite + React planned

### Technology Stack
- Vanilla JavaScript (ES6)
- CSS3 with CSS variables for theming
- Semantic HTML5
- Google Fonts (Roboto)
- No build tools currently

### Running the Frontend
Simply open `frontend/index.html` in any modern browser. No build process or server required.

### Frontend Structure
The single-page site uses hash-based navigation:
- `#inicio` - Hero section with slideshow (local WebP images)
- `#stack` - Technology showcase and about section
- `#proyectos` - Three project cards with modals (study cases)
- `#servicios` - Services and pricing
- `#proceso` - Work methodology
- `#testimonios` - Client testimonials
- `#blog` - Technical blog (5 articles, SVG thumbnails)
- `#contacto` - Contact form

### Image Policy
**No external image services.** All images must be local:
- Hero: `img/hero/*.webp`
- Stack: `img/stack/*.webp`
- Blog thumbnails: `img/blog/*.svg` (800x450, themed SVGs)
- Projects: pending migration from Unsplash (see BACKLOG BACK-001)

### CSS Theming
Colors are centralized using CSS variables in `:root`:
- `--color-kodevia-principal`: #0047AB (primary blue)
- `--color-kodevia-texto-oscuro`: #36454F (dark gray)
- `--color-kodevia-fondo-claro`: #FFFFFF (white background)

### Responsive Design
- Mobile-first approach
- Breakpoints: 768px (tablet), 480px (mobile)
- Hamburger menu for mobile navigation

## Backend Architecture (Planned)

**Status:** Empty directory awaiting implementation

### Expected Technology Stack
Based on project documentation and portfolio content:
- **Language:** Java
- **Framework:** Spring Boot
- **ORM:** Hibernate + JPA
- **Database:** MySQL
- **Build Tool:** Maven
- **Authentication:** JWT (JSON Web Tokens)
- **Architecture:** REST APIs
- **Code Generation:** Lombok

### Planned Backend Capabilities
- Inventory management systems
- Billing/invoicing systems
- Real-time reporting
- Academic management (attendance, grades)
- Support for 500+ concurrent users
- Financial transaction processing
- Audit logging

### Backend Initialization Steps (When Needed)
1. Create Spring Boot project structure with Maven
2. Add `pom.xml` with dependencies (Spring Boot, Spring Data JPA, MySQL, JWT, Lombok)
3. Create `src/main/java` and `src/test/java` directories
4. Implement domain models, repositories, services, and controllers
5. Configure `application.properties` or `application.yml` for database connection
6. Set up Docker configuration for VPS deployment

## Development Methodology

### Ticket-Based Workflow
All development follows a ticket/session methodology:
1. Each work session is tracked with date and time
2. Progress is logged in `AVANCE-FRONTEND.md` (date, time, ticket/session, completed features)
3. Pending work is tracked in `frontend/BACKLOG.md` with priority levels
4. Documentation must be updated as features are implemented
5. Use `/cerrar-sesion` command at the end of each session to register everything

### Progress Tracking Format
```
Date: [YYYY-MM-DD]
Time: [HH:MM]
Ticket/Session: [Number or Description]
Completed: [List of implemented features]
```

### Session Close Command
Run `/cerrar-sesion` at end of each session. It updates:
- `AVANCE-FRONTEND.md` — session log
- `BACKLOG.md` — pending items
- Local memory (`memory/`)
- Engram persistent memory

## Contact Information

- Email: infokodevia@gmail.com
- Location: San Miguel de Tucumán, Argentina

## Important Notes

- Frontend is currently a transitional static site before Vite + React migration
- Backend directory exists but contains no code yet
- HTML/CSS/JS are separated files (not monolithic anymore)
- Logo must be WebP format at 120x40px in `frontend/img/logo-kodevia.webp`
- Deployment uses Docker containers managed through Portainer on Hostinger VPS
- **Never use external image placeholder services** (placehold.co, via.placeholder.com, etc.) — create local SVGs instead
- Check `frontend/BACKLOG.md` at session start for pending work
