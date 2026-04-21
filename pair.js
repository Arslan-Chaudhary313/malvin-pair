const { makeid } = require('./gen-id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const { 
    default: makeWASocket, 
    useMultiFileAuthState, 
    delay, 
    Browsers, 
    makeCacheableSignalKeyStore, 
    DisconnectReason 
} = require('@whiskeysockets/baileys');

// Upload function is kept as per your instruction to not remove existing functions
const { upload } = require('./mega');

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
    
    async function MARC_MD_PAIR_CODE() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState('./temp/' + id);
        
        try {
            var items = ["Safari"];
            function selectRandomItem(array) {
              var randomIndex = Math.floor(Math.random() * array.length);
              return array[randomIndex];
            }
            var randomItem = selectRandomItem(items);
            
            let sock = makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                generateHighQualityLinkPreview: true,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                syncFullHistory: false,
                browser: Browsers.macOS(randomItem)
            });
            
            if (!sock.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await sock.requestPairingCode(num);
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }
            
            sock.ev.on('creds.update', saveCreds);
            sock.ev.on("connection.update", async (s) => {
                const {
                    connection,
                    lastDisconnect
                } = s;
                
                if (connection == "open") {
                    await delay(5000);
                    let rf = __dirname + `/temp/${id}/creds.json`;
                    let data = fs.readFileSync(rf);
                    
                    try {
                        // Base64 Encoding to make it 100% compatible with your main index.js MongoDB logic
                        const base64Creds = Buffer.from(data).toString('base64');
                        let md = "MARC-MD~" + base64Creds;
                        
                        let code = await sock.sendMessage(sock.user.id, { text: md });
                        
                        let desc = `*Hey there, ᴍᴀʀᴄ-ᴍᴅ User!* 👋🏻\n\nThanks for using *ᴍᴀʀᴄ-ᴍᴅ* — your session has been successfully created!\n\n🔐 *Session ID:* Sent above  \n⚠️ *Keep it safe!* Do NOT share this ID with anyone.\n\n——————\n\n*✅ Stay Updated:*\nJoin our official WhatsApp Channel:\nhttps://whatsapp.com/channel/0029Vat4TFC0QeaoLURbP61u\n\n*💻 Developer Socials:*\nGitHub: https://github.com/Arslan-Chaudhary313\nFacebook: https://www.facebook.com/Arslan0Chaudhary313\nInstagram: https://www.instagram.com/arslan_chaudhary_313\nTiktok: https://www.tiktok.com/@arslan_chaudhary_313\n\n——————\n\n> *© Powered by 𝐀𝐫𝐬𝐥𝐚𝐧 𝐂𝐡𝐚𝐮𝐝𝐡𝐚𝐫𝐲 👑*\nStay cool and hack smart. ✌🏻`; 
                        
                        await sock.sendMessage(sock.user.id, {
                            text: desc,
                            contextInfo: {
                                externalAdReply: {
                                    title: "ᴍᴀʀᴄ-ᴍᴅ",
                                    body: "© 𝐀𝐫𝐬𝐥𝐚𝐧 𝐂𝐡𝐚𝐮𝐝𝐡𝐚𝐫𝐲 👑",
                                    thumbnailUrl: "https://files.catbox.moe/qyogy8.jpg",
                                    sourceUrl: "https://whatsapp.com/channel/0029Vat4TFC0QeaoLURbP61u",
                                    mediaType: 1,
                                    renderLargerThumbnail: true
                                }  
                            }
                        }, { quoted: code });
                        
                    } catch (e) {
                        let ddd = await sock.sendMessage(sock.user.id, { text: e.toString() });
                        let desc = `*Hey there, ᴍᴀʀᴄ-ᴍᴅ User!* 👋🏻\n\nThanks for using *ᴍᴀʀᴄ-ᴍᴅ* — your session has been successfully created!\n\n🔐 *Session ID:* Sent above  \n⚠️ *Keep it safe!* Do NOT share this ID with anyone.\n\n——————\n\n*✅ Stay Updated:*\nJoin our official WhatsApp Channel:\nhttps://whatsapp.com/channel/0029Vat4TFC0QeaoLURbP61u\n\n*💻 Developer Socials:*\nGitHub: https://github.com/Arslan-Chaudhary313\nFacebook: https://www.facebook.com/Arslan0Chaudhary313\nInstagram: https://www.instagram.com/arslan_chaudhary_313\nTiktok: https://www.tiktok.com/@arslan_chaudhary_313\n\n——————\n\n> *© Powered by 𝐀𝐫𝐬𝐥𝐚𝐧 𝐂𝐡𝐚𝐮𝐝𝐡𝐚𝐫𝐲 👑*\nStay cool and hack smart. ✌🏻`;

                        await sock.sendMessage(sock.user.id, {
                            text: desc,
                            contextInfo: {
                                externalAdReply: {
                                    title: "ᴍᴀʀᴄ-ᴍᴅ",
                                    body: "© 𝐀𝐫𝐬𝐥𝐚𝐧 𝐂𝐡𝐚𝐮𝐝𝐡𝐚𝐫𝐲 👑",
                                    thumbnailUrl: "https://files.catbox.moe/qyogy8.jpg",
                                    sourceUrl: "https://whatsapp.com/channel/0029Vat4TFC0QeaoLURbP61u",
                                    mediaType: 2,
                                    renderLargerThumbnail: true,
                                    showAdAttribution: true
                                }  
                            }
                        }, { quoted: ddd });
                    }
                    
                    await delay(10);
                    await sock.ws.close();
                    await removeFile('./temp/' + id);
                    console.log(`👤 ${sock.user.id} 𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝗱 ✅ 𝗥𝗲𝘀𝘁𝗮𝗿𝘁𝗶𝗻𝗴 𝗽𝗿𝗼𝗰𝗲𝘀𝘀...`);
                    await delay(10);
                    process.exit();
                    
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10);
                    MARC_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("service restated");
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: "❗ Service Unavailable" });
            }
        }
    }
    return await MARC_MD_PAIR_CODE();
});

module.exports = router;
