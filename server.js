// server.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const DATA = path.join(__dirname, "data.json");
const ADMIN_PASS = process.env.ADMIN_PASSWORD || "cambiateme";

app.use(express.json());

// --- Rutas API ---
function readData() {
  try {
    const raw = fs.readFileSync(DATA, "utf8");
    return JSON.parse(raw || "[]");
  } catch (e) {
    return [];
  }
}
function writeData(arr) {
  fs.writeFileSync(DATA, JSON.stringify(arr, null, 2));
}

app.get("/api/tournaments", (req, res) => {
  res.json(readData());
});

app.post("/api/tournaments", (req, res) => {
  const pass = req.headers["x-admin-password"] || "";
  if (pass !== ADMIN_PASS) return res.status(401).send("Unauthorized");
  const { titulo, formato, descripcion, date, hora } = req.body;
  if (!date || !titulo) return res.status(400).send("Faltan campos");
  const data = readData();
  const nuevo = { id: uuidv4(), titulo, formato, descripcion, date, hora };
  data.push(nuevo);
  writeData(data);
  res.json(nuevo);
});

app.delete("/api/tournaments/:id", (req, res) => {
  const pass = req.headers["x-admin-password"] || req.query.pass || "";
  if (pass !== ADMIN_PASS) return res.status(401).send("Unauthorized");
  const id = req.params.id;
  const data = readData().filter((t) => t.id !== id);
  writeData(data);
  res.sendStatus(204);
});

// ICS export
app.get("/api/tournaments/ics", (req, res) => {
  const data = readData();
  let ics = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//mtg-torneos//es\n";
  data.forEach((t) => {
    ics += `BEGIN:VEVENT\nUID:${t.id}\nDTSTART;VALUE=DATE:${t.date.replace(
      /-/g,
      ""
    )}\nSUMMARY:${t.titulo} (${t.formato})\nDESCRIPTION:${(
      t.descripcion || ""
    ).replace(/\n/g, "\\n")}\nEND:VEVENT\n`;
  });
  ics += "END:VCALENDAR";
  res.setHeader("Content-Type", "text/calendar");
  res.send(ics);
});

// --- Servir frontend SPA ---
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// Fallback SPA: cualquier ruta no API devuelve index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// --- Arrancar server ---
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server listening on", port));
