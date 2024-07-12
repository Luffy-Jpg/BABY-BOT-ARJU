let handler = async (m, { conn, text, usedPrefix, command }) => {
  // Sound
  let name = m.pushName || conn.getName(m.sender);
  var vn = "https://raw.githubusercontent.com/thearju/A17/master/Assets/audio/ad.mp3";
  let url = "https://github.com/thearju/gmx-1.0";
  let murl = "https://bot-support.vercel.app";
  let img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnUuf8um5mtRViqgk_YWEgewTtkvcxd9izAw&s";
  let con = {
    key: {
      fromMe: false,
      participant: `${m.sender.split`@`[0]}@s.whatsapp.net`,
      ...(m.chat ? { remoteJid: "16504228206@s.whatsapp.net" } : {}),
    },
    message: {
      contactMessage: {
        displayName: "ARJU 🗿🔥",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:\nARJU 🔥🗿\nitem1.TEL;waid=${
          m.sender.split("@")[0]
        }:${m.sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      },
    },
  };
  let doc = {
    audio: {
      url: vn,
    },
    mimetype: "audio/mp4",
    ptt: true, 
    waveform: [0, 0, 0, 0, 0, 0, 0],
    fileName: "Arju",

    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: `Hello ♥️😊 ${m.name}`,
        body: `Click on here 🎶`,
        thumbnailUrl: img,
        sourceUrl: "https://wa.me/254106722539",
        mediaType: 1,
        showAdAttribution: false, 
        renderLargerThumbnail: true,
      },
    },
  };

  await conn.sendMessage(m.chat, doc, { quoted: con });
};

handler.help = ["owner"];
handler.tags = ["DEVELOPER"];
handler.command = ["developer", "owner", "admin"];
handler.group = true;
export default handler;
