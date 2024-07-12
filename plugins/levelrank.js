import { canLevelUp, xpRange } from '../lib/levelling.js'

let handler = async (m, { conn }) => {
  let name = conn.getName(m.sender)
  let pp = await conn
    .profilePictureUrl(m.sender, 'image')
    .catch(_ => 'https://i.imgur.com/whjlJSf.jpg')
  let user = global.db.data.users[m.sender]
  let background = 'https://i.ibb.co/4YBNyvP/images-76.jpg' // Fixed background URL

  if (!canLevelUp(user.level, user.exp, global.multiplier)) {
    let { min, xp, max } = xpRange(user.level, global.multiplier)
    let txt = `
┌───⊷ *LEVEL*\n
▢ Access guy : *${name}*\n
▢ Level : *${user.level}*\n
▢ XP : *${user.exp - min}/${xp}*\n
▢ Karm : *${user.role}*\n
└──────────────

Hey there, ${name}! You're not ready to level up just yet. It seems like you need to munch up *${max - user.exp}* more XP to level up and reach new heights! Keep going, and the bots will be singing your praises soon! 🚀
`.trim()

    try {
      let imgg = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAVeju5sp9FM0iRkRrkDBEa8y0W71XmGFw40RoaVXBKjPYrunyGLmTbDw&s=10`
      conn.sendFile(m.chat, imgg, 'bot.jpg', txt, m)
    } catch (e) {
      m.reply(txt)
    }
  } else {
    let str = `
┌─⊷ *LEVEL UP*\n
▢ Previous level : *${user.level - 20}*\n
▢ Current level : *${user.level}*\n
▢ Karm : *${user.role}*\n
└──────────────

Woo-hoo, ${name}! You've soared to new heights and reached level ${user.level}! 🎉 Time to celebrate! 🎊
Your newfound power will strike fear into the hearts of trolls, and the bots will bow before your command! Keep up the incredible work, and who knows what epic adventures await you next! 🌟
`.trim()

    try {
      let img = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAVeju5sp9FM0iRkRrkDBEa8y0W71XmGFw40RoaVXBKjPYrunyGLmTbDw&s=10}`
      conn.sendFile(m.chat, img, 'bot.jpg', str, m)
    } catch (e) {
      m.reply(str)
    }
  }
}

handler.help = ['levelup']
handler.tags = ['economy']
handler.command = ['lvl', 'levelup', 'level']
handler.group = true

export default handler
 
