# Configuración del Formulario de Contacto

**Fecha:** 27/12/2024
**Estado:** ✅ CONFIGURADO Y LISTO PARA USAR

---

## 📧 Sistema Implementado: FormSubmit

El formulario de contacto está configurado con **FormSubmit**, un servicio gratuito que envía los mensajes directamente a tu email sin necesidad de backend.

### Email Destino
- **infokodevia@gmail.com**

---

## 🔧 Configuración Actual

### 1. Campos Ocultos de FormSubmit (en index.html)

```html
<input type="hidden" name="_subject" value="Nueva Consulta desde Kodevia Portfolio">
<input type="hidden" name="_captcha" value="false">
<input type="hidden" name="_template" value="table">
<input type="hidden" name="_next" value="https://tu-dominio.com/frontend/gracias.html">
<input type="text" name="_honey" style="display:none">
```

#### Explicación de los campos:

- **`_subject`**: Asunto del email que recibirás
- **`_captcha`**: Desactivado (false) para evitar paso extra
- **`_template`**: Formato "table" para emails más legibles
- **`_next`**: URL de redirección después del envío (página de gracias)
- **`_honey`**: Campo honeypot oculto para prevenir spam de bots

---

## 📋 IMPORTANTE: Primera Configuración

### ⚠️ Activación Inicial Requerida

**La primera vez que alguien envíe el formulario, FormSubmit te pedirá confirmación:**

1. **Alguien envía el formulario** por primera vez
2. **FormSubmit envía un email a infokodevia@gmail.com** con un link de confirmación
3. **Debes hacer CLICK en ese link** para activar el servicio
4. **Después de la confirmación**: Todos los mensajes llegarán automáticamente

### 🧪 Cómo Activarlo AHORA (Antes de Producción)

**Opción 1: Envía un mensaje de prueba tú mismo**

1. Abre `index.html` en tu navegador
2. Ve a la sección "Contacto"
3. Llena el formulario con datos de prueba
4. Envía el mensaje
5. **Revisa infokodevia@gmail.com**
6. **Haz click en el link de confirmación** que te enviará FormSubmit
7. ✅ ¡Activado! Los próximos mensajes llegarán directamente

**Opción 2: Envía desde localhost con Live Server**

1. Abre el proyecto con Live Server en VSCode
2. Navega a la sección de contacto
3. Envía un formulario de prueba
4. Confirma el email en Gmail

---

## 🌐 Configuración de Producción

### Actualizar URL de Redirección

Actualmente la URL de redirección es un placeholder:

```html
<input type="hidden" name="_next" value="https://tu-dominio.com/frontend/gracias.html">
```

**Cuando subas el sitio a producción, actualiza esta línea en `index.html`:**

```html
<!-- Reemplazar con tu dominio real -->
<input type="hidden" name="_next" value="https://kodevia.com/gracias.html">
```

O si usas subdirectorio:
```html
<input type="hidden" name="_next" value="https://tudominio.com/frontend/gracias.html">
```

---

## 📊 Datos que Recibirás en el Email

Cada vez que alguien complete el formulario, recibirás un email con:

- **Nombre completo**
- **Email**
- **WhatsApp / Teléfono** (opcional)
- **Tipo de proyecto** (API REST, Sistema Empresarial, etc.)
- **Presupuesto aproximado** (opcional)
- **Urgencia** (opcional)
- **Mensaje detallado**

**Formato:** Tabla HTML bien organizada y fácil de leer

---

## 🛡️ Protección Anti-Spam

El formulario incluye:

1. **Honeypot field** (`_honey`): Campo invisible que los bots llenan pero los humanos no ven
2. **Required fields**: Campos obligatorios (nombre, email, tipo proyecto, mensaje)
3. **Checkbox de privacidad**: Debe ser aceptado para enviar

---

## 🚀 Testing del Formulario

### Checklist de Pruebas

- [ ] **Prueba 1:** Enviar formulario completo
  - Resultado esperado: Email recibido en Gmail + Redirección a gracias.html

- [ ] **Prueba 2:** Enviar con campos opcionales vacíos
  - Resultado esperado: Email recibido sin esos campos

- [ ] **Prueba 3:** Intentar enviar sin campos requeridos
  - Resultado esperado: Validación HTML impide el envío

- [ ] **Prueba 4:** Verificar página de gracias
  - Resultado esperado: Mensaje de confirmación + countdown + redirección automática

- [ ] **Prueba 5:** Responsive en mobile
  - Resultado esperado: Formulario funcional en pantallas pequeñas

---

## 📝 Estructura de Archivos

```
frontend/
├── index.html                      (Formulario con FormSubmit configurado)
├── gracias.html                    (Página de confirmación)
├── app.js                          (JavaScript mejorado para feedback)
├── CONFIGURACION-FORMULARIO.md     (Este archivo)
└── styles.css                      (Estilos del formulario)
```

---

## 🔄 Alternativas a FormSubmit (por si necesitas en el futuro)

Si más adelante necesitas más control o features avanzadas:

### EmailJS (200 emails gratis/mes)
- Panel de control web
- Templates personalizables
- Estadísticas de envíos
- Requiere: Crear cuenta + API key

### Backend Propio (Node.js + Nodemailer)
- Control total
- Sin límites de envíos
- Requiere: Servidor Node.js + configuración SMTP

### Web3Forms (50 envíos gratis/mes)
- Similar a FormSubmit
- Panel de control
- Webhooks disponibles

---

## ⚙️ Mantenimiento

### Cambiar Email Destino

Si necesitas cambiar el email, edita esta línea en `index.html`:

```html
<!-- Cambiar infokodevia@gmail.com por el nuevo email -->
<form class="formulario-contacto" method="POST" action="https://formsubmit.co/NUEVO-EMAIL@ejemplo.com">
```

**IMPORTANTE:** Después de cambiar, deberás confirmar el nuevo email (mismo proceso de activación inicial).

---

## 🐛 Troubleshooting

### Los emails no llegan

1. **Verifica la carpeta de SPAM** en Gmail
2. **Confirma que hiciste click en el link de activación** inicial
3. Revisa que el formulario tenga `method="POST"`
4. Verifica que no haya errores en la consola del navegador

### Redirección no funciona

1. Verifica que la URL en `_next` sea correcta y accesible
2. Prueba primero con URL relativa: `value="gracias.html"`
3. Después actualiza a URL absoluta en producción

### Checkbox de privacidad no funciona

- Verifica que tenga `required` en el input
- El formulario no se enviará si no está marcado

---

## ✅ Checklist Final para Producción

- [ ] Enviar mensaje de prueba y confirmar email en Gmail
- [ ] Actualizar URL de `_next` con dominio real
- [ ] Verificar que `gracias.html` esté subido al servidor
- [ ] Probar envío desde el sitio en producción
- [ ] Configurar filtro en Gmail para organizar mensajes (opcional)
- [ ] Agregar regla para que no vayan a spam (opcional)

---

**Estado:** ✅ Configurado y listo para recibir mensajes en **infokodevia@gmail.com**

**Próximo paso:** Enviar mensaje de prueba para activar FormSubmit
