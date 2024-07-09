
let handler = async (m, { conn, args, usedPrefix, command }) => {
let img = 'https://i.ytimg.com/vi_webp/fSMiH4NOga0/maxresdefault.webp'

  let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let totalf = Object.values(global.plugins).filter(
    (v) => v.help && v.tags
  ).length 
    let muptime = clockString(_muptime)
    let str =  `*BOT-Name*\n${conn.user.name}\n\n*ADMINISTRATOR*\nARJU\n\nToF ${totalf}\n\n\n\n*TEAM-ARJU*`
    conn.sendMessage(m.chat, {
      text: str,
      contextInfo: {
      mentionedJid: [m.sender],
      isForwarded: false,
      forwardingScore: 0,
      externalAdReply: {
      title: `${muptime}`,
      body: "RIRURU-AI [ UP - TIME ]", 
      thumbnailUrl: img,
      sourceUrl: 'https://www.instagram.com/arju_sonwani.dev?igsh=a2UxZ3ZyZjNicmUw',
      mediaType: 1,
      ShowAdAttribution: false, 
      renderLargerThumbnail: true
      }}})
}
handler.help = ['runtime']
handler.tags = ['SYSTEM']
handler.command = ['runtime', 'uptime']
handler.group = true 
export default handler

/*function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, '\n*days*\n\n\n ', h, '\n*hours*\n\n\n ', m, '\n*minutes*\n\n\n ', s, '\n*Second*\n\n\n '].map(v => v.toString().padStart(2, 0)).join('')
} ARJU 💻 */



function clockString(ms) {
  let ye = isNaN(ms) ? "--" : Math.floor(ms / 31104000000) % 10
  let mo = isNaN(ms) ? "--" : Math.floor(ms / 2592000000) % 12
  let d = isNaN(ms) ? "--" : Math.floor(ms / 86400000) % 30
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60
  return [ye, " Year | " , mo , " Month | " , d , " Day | " , h , " Hour | ", m , " Minute | ", s, " Second"].map(v => v.toString().padStart(2, 0)).join("")
 }
