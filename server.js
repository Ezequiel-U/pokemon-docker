require("dotenv").config();
const express = require("express");
const path = require("path");
const { Client } = require("pg");

const app = express();

// Puerto externo configurado por Render
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos
app.use(express.static(__dirname));

// Ruta principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Ruta de prueba de conexión a BD
app.get("/db-status", async (req, res) => {
    try {
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        });

        await client.connect();
        const result = await client.query("SELECT NOW()");
        await client.end();

        res.send("ESTAMOS CONECTADOS EN LA BD DE RENDER!! Hora: " + result.rows[0].now);
    } catch (err) {
        res.status(500).send("🔴 Error conectando a PostgreSQL: " + err.message);
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log("Servidor Pokémon escuchando en puerto " + PORT);
});
