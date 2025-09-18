# MTG-Torneos — Fullstack App (React + Express)

Este repositorio contiene un proyecto completo para gestionar torneos de Magic: The Gathering. Incluye un **frontend** (React SPA con TailwindCSS) y un **backend** (Node + Express con almacenamiento en `data.json`).

---

## 📂 Estructura del repositorio

```
mtg-torneos/
├── public/
│   └── index.html        # Frontend (React SPA + Tailwind)
├── server.js             # Backend (Node + Express API)
├── data.json             # Almacenamiento de torneos (JSON)
├── package.json          # Dependencias y scripts
└── README.md             # Este archivo
```

---

## 🚀 Ejecución local

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tuusuario/mtg-torneos.git
   cd mtg-torneos
   ```

2. Instala dependencias:
   ```bash
   npm install
   ```

3. Configura la contraseña de administrador (necesaria para añadir/borrar torneos):
   ```bash
   export ADMIN_PASSWORD=mitokenseguro   # Linux/Mac
   setx ADMIN_PASSWORD mitokenseguro     # Windows PowerShell
   ```

4. Ejecuta el servidor:
   ```bash
   npm start
   ```

5. Abre en el navegador:
   ```
   http://localhost:3000
   ```

---

## 📦 Despliegue gratuito

### 🔹 Backend (Render)
1. Crea una cuenta en [Render](https://render.com/).
2. Nuevo servicio **Web Service** → conecta este repo → selecciona `server.js` como entry point.
3. Configura una variable de entorno:
   - **Key:** `ADMIN_PASSWORD`
   - **Value:** tu contraseña segura
4. Render asignará una URL del estilo `https://mtg-torneos.onrender.com`.

### 🔹 Frontend (Netlify o Vercel)
1. Sube la carpeta `public/` a [Netlify](https://www.netlify.com/) o [Vercel](https://vercel.com/).
2. Si el backend está en otra URL (ej. Render), añade en `index.html` una variable global:
   ```html
   <script>
     window.API_BASE = "https://mtg-torneos.onrender.com";
   </script>
   ```
   justo antes del `<script type="module">`.

### 🔹 Opción alternativa: Todo en Vercel
- Puedes desplegar el frontend como SPA y convertir el backend en **serverless functions** (requiere adaptar `server.js`).

---

## 🔑 Funcionalidades actuales
- 📅 Calendario interactivo en español (clic en días → modal con torneos)
- 📝 Panel de administrador (crear/borrar torneos con contraseña)
- 🎮 Formatos soportados: Commander, 2HG, Modern, Legacy, Standard
- 📤 Exportación de torneos en formato `.ics` (para Google Calendar, Outlook, etc.)
- 📱 Diseño responsive (móvil y escritorio)

---

## 🔮 Próximas mejoras (Opciones 4 y 5)
1. **RSVP sin login** → usuarios podrán inscribirse con apodo en cada torneo.
2. **Tema oscuro / claro** con botón de cambio.
3. **UI mejorada** para móvil y escritorio (más compacta en móviles, vista de calendario completa en escritorio).
4. **Exportar asistentes a CSV** (para organización del torneo).

---

## 📜 Licencia
MIT — Libre para usar y modificar.

---

Hecho con ❤️ para la comunidad de Magic: The Gathering.
