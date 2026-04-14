# Skill Registry — kodevia-portfolio

Generated: 2026-04-14

## User-Level Skills

| Skill | Description | Trigger |
|-------|-------------|---------|
| `sdd-init` | Initialize Spec-Driven Development context | `/sdd-init` |
| `sdd-explore` | Explore and investigate ideas before committing to a change | `/sdd-explore <topic>` |
| `sdd-propose` | Create a change proposal with intent, scope, and approach | `/sdd-propose <change-name>` |
| `sdd-spec` | Write specifications with requirements and scenarios | `/sdd-spec <change-name>` |
| `sdd-design` | Create technical design document with architecture decisions | `/sdd-design <change-name>` |
| `sdd-tasks` | Break down a change into an implementation task checklist | `/sdd-tasks <change-name>` |
| `sdd-apply` | Implement tasks from the change, writing actual code | `/sdd-apply <change-name>` |
| `sdd-verify` | Validate that implementation matches specs, design, and tasks | `/sdd-verify <change-name>` |
| `sdd-archive` | Sync delta specs to main specs and archive a completed change | `/sdd-archive <change-name>` |
| `skill-registry` | Create or update the skill registry for the current project | `/skill-registry` |

## Project-Level Conventions

| File | Description |
|------|-------------|
| `CLAUDE.md` | Project instructions: stack, architecture, image policy, session workflow |
| `.claude/commands/cerrar-sesion.md` | Custom `/cerrar-sesion` command — closes dev session, updates AVANCE, BACKLOG, and memory |

## Project Conventions Summary

- **Stack**: HTML5 + CSS3 + Vanilla JS (no build tools, no React migration planned)
- **Images**: Local only — WebP for photos, SVG for generated thumbnails. Never external services.
- **Workflow**: Ticket-based sessions; run `/cerrar-sesion` at end of each session
- **CSS Variables**: All colors in `:root` — `--color-kodevia-principal`, `--color-kodevia-texto-oscuro`, `--color-kodevia-fondo-claro`
- **Responsive**: Mobile-first, breakpoints at 768px and 480px
- **Deployment**: GitHub Actions → SSH → git pull on Hostinger VPS (Ubuntu 22.04, Nginx, Docker)
- **Persistence**: SDD mode = `engram` (Engram available, no openspec/ directory)
