//import db from '../lib/database.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
  else who = m.chat
  let user = global.db.data.users[who]
  if (!who) throw `✳️ Tag or mention someone\n\n📌 Example : ${usedPrefix + command} @user`
  if (global.prems.includes(who.split`@`[0])) throw '✳️ The user Mentioned Already is premium'
  global.prems.push(`${who.split`@`[0]}`)

  conn.reply(
    m.chat,
    `
✅ Approved to use premium stuff. 

*Access guy :* ${user.name}

`,
    m,
    { mentions: [who] }
  )
}
handler.help = ['approve <@tag>']
handler.tags = ['owner']
handler.command = ['addprem', 'approve']

handler.group = true
handler.rowner = true

export default handler
