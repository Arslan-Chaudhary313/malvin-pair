const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const app = express();

// Set global path directory
const __path = process.cwd();

// --- CONFIGURATION ---
const PORT = process.env.PORT || 8000;

// --- IMPORT ROUTES ---
// Ensure these files exist in your directory
const server = require('./qr');
const code = require('./pair');

// Increase listener limits for complex automation
require('events').EventEmitter.defaultMaxListeners = 500;

// ✅ FIXED: Middleware must be defined BEFORE routes to parse incoming data correctly
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- ROUTE HANDLERS ---

// QR and Pairing Logic Routes
app.use('/server', server);
app.use('/code', code);

// Serve HTML Pages
app.use('/pair', async (req, res) => {
    res.sendFile(path.join(__path, 'pair.html'));
});

app.use('/qr', async (req, res) => {
    res.sendFile(path.join(__path, 'qr.html'));
});

// Main Landing Page
app.use('/', async (req, res) => {
    res.sendFile(path.join(__path, 'main.html'));
});

// --- SERVER INITIALIZATION ---
app.listen(PORT, () => {
    console.clear();
    console.log(`
==================================================
           🚀 ᴍᴀ𝐫𝐜-𝐦𝐝 SERVER ACTIVE 🚀
==================================================
        
  Owner: 𝐀𝐫𝐬𝐥𝐚𝐧 𝐂𝐡𝐚𝐮𝐝𝐡𝐚𝐫𝐲 👑
  Status: Operational
  Port: ${PORT}
  Local Link: http://localhost:${PORT}

  Connect with us:
  GitHub: https://github.com/Arslan-Chaudhary313
  Channel: https://whatsapp.com/channel/0029Vat4TFC0QeaoLURbP61u

==================================================
    `);
});

module.exports = app;
