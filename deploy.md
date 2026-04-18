# Plan de Deploy — kodevia.cloud

**Aprobado:** 2026-04-18  
**Estado:** PENDIENTE

---

## Contexto

- VPS: Hostinger, Ubuntu 22.04, Nginx, Docker + Portainer
- Apps existentes (no tocar): `biblioteca.kodevia.cloud`, `app-mensajeria.kodevia.cloud`
- Destino nuevo: `kodevia.cloud` y `www.kodevia.cloud`
- CI/CD: GitHub Actions (workflow ya preparado en `.github/workflows/deploy.yml`)

---

## Fase 1 — Preparación en el VPS

1. SSH al VPS
2. Clonar el repo:
   ```bash
   git clone https://github.com/<usuario>/kodevia-portfolio.git /var/www/kodevia-portfolio
   ```
3. Verificar que las apps existentes siguen respondiendo:
   - `curl -I https://biblioteca.kodevia.cloud`
   - `curl -I https://app-mensajeria.kodevia.cloud`

---

## Fase 2 — Configurar Nginx para kodevia.cloud

Crear nuevo archivo de configuración (NO modificar los existentes):

```bash
sudo nano /etc/nginx/sites-available/kodevia.cloud
```

Contenido:

```nginx
server {
    listen 80;
    server_name kodevia.cloud www.kodevia.cloud;

    root /var/www/kodevia-portfolio/frontend;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Activar y verificar:

```bash
sudo ln -s /etc/nginx/sites-available/kodevia.cloud /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Verificar que las 3 apps responden antes de continuar.

---

## Fase 3 — SSL con Certbot

```bash
sudo certbot --nginx -d kodevia.cloud -d www.kodevia.cloud
```

Certbot modifica solo el bloque nuevo. Verificar HTTPS:
- `https://kodevia.cloud` carga la landing
- `https://biblioteca.kodevia.cloud` sigue funcionando
- `https://app-mensajeria.kodevia.cloud` sigue funcionando

---

## Fase 4 — GitHub Actions (CI/CD)

1. Generar SSH key dedicada para este deploy:
   ```bash
   ssh-keygen -t ed25519 -C "deploy-kodevia-portfolio" -f ~/.ssh/deploy_kodevia
   ```
2. Autorizar la clave pública en el VPS:
   ```bash
   cat ~/.ssh/deploy_kodevia.pub >> ~/.ssh/authorized_keys
   ```
3. Cargar los 4 secrets en GitHub (Settings → Secrets → Actions):
   - `VPS_HOST` — IP o hostname del VPS
   - `VPS_USER` — usuario SSH
   - `VPS_SSH_KEY` — contenido de `~/.ssh/deploy_kodevia` (clave privada)
   - `VPS_PATH` — `/var/www/kodevia-portfolio`
4. Hacer un push a `main` y verificar que el workflow corre sin errores en GitHub Actions.

---

## Fase 5 — Verificación final

- [ ] `https://kodevia.cloud` carga la landing correctamente
- [ ] `https://www.kodevia.cloud` redirige o carga igual
- [ ] `https://biblioteca.kodevia.cloud` sigue funcionando
- [ ] `https://app-mensajeria.kodevia.cloud` sigue funcionando
- [ ] HTTPS activo en los tres dominios
- [ ] GitHub Actions deploya automáticamente al hacer push a `main`

---

## Próximo paso antes de iniciar el plan

Revisar los GitHub Actions con errores pendientes antes de ejecutar cualquier fase.
