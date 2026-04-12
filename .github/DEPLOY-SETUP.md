# Guía de Setup — Deploy al VPS

> Seguir estos pasos UNA SOLA VEZ cuando el sitio esté terminado y listo para producción.

---

## Paso 1 — Subir el repo a GitHub

```bash
# Desde D:\Programacion\5-Proyectos\Proyecto_Kodevia\kodevia-portfolio
git init
git add .
git commit -m "Initial commit: Kodevia Portfolio"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/kodevia-portfolio.git
git push -u origin main
```

---

## Paso 2 — Generar SSH key para GitHub Actions

En tu PC local (o en el VPS), generá un par de claves dedicado para el deploy:

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/kodevia_deploy
```

Esto crea dos archivos:
- `kodevia_deploy` → clave **privada** (va en GitHub Secrets)
- `kodevia_deploy.pub` → clave **pública** (va en el VPS)

---

## Paso 3 — Autorizar la clave en el VPS

Conectate al VPS por SSH y agregá la clave pública:

```bash
# En el VPS:
echo "CONTENIDO_DE_kodevia_deploy.pub" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

---

## Paso 4 — Clonar el repo en el VPS (primera vez)

```bash
# En el VPS:
cd /var/www
git clone https://github.com/TU-USUARIO/kodevia-portfolio.git
```

Anotá la ruta completa — la vas a usar como `VPS_PATH`.

---

## Paso 5 — Configurar Nginx en el VPS

```nginx
server {
    listen 80;
    server_name kodevia.com www.kodevia.com;

    root /var/www/kodevia-portfolio/frontend;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

```bash
# Activar la configuración:
sudo ln -s /etc/nginx/sites-available/kodevia /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## Paso 6 — Cargar los Secrets en GitHub

Ir a: **GitHub repo → Settings → Secrets and variables → Actions → New repository secret**

| Secret | Valor |
|--------|-------|
| `VPS_HOST` | IP pública del VPS (ej: `185.xxx.xxx.xxx`) |
| `VPS_USER` | Usuario SSH (ej: `root`) |
| `VPS_SSH_KEY` | Contenido completo del archivo `kodevia_deploy` (clave privada) |
| `VPS_PATH` | Ruta en el VPS (ej: `/var/www/kodevia-portfolio`) |

---

## Paso 7 — Verificar el primer deploy automático

```bash
# En tu PC:
git commit --allow-empty -m "test: trigger first deploy"
git push
```

Ir a **GitHub → Actions** y verificar que el workflow corra sin errores.

---

## Verificación final

- [ ] El sitio abre en `http://IP_DEL_VPS` (o dominio si ya está configurado)
- [ ] GitHub Actions muestra ✅ en el workflow
- [ ] Un nuevo `git push` actualiza el sitio automáticamente

---

> Una vez funcionando, cada `git push` a `main` despliega automáticamente en segundos.
