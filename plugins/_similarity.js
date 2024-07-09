
import didyoumean from 'didyoumean'
import similarity from 'similarity'
//import { plugins } from '../lib/plugins.js'

export async function before(m, { conn, match, usedPrefix, command }) {
	
	     if ((usedPrefix = (match[0] || '')[0])) {
		let noPrefix = m.text.replace(usedPrefix, '')
		let args = noPrefix.trim().split` `.slice(1)
		let text = args.join` `
		let help = Object.values(plugins).filter(v => v.help && !v.disabled).map(v => v.help).flat(1)
	       if (help.includes(noPrefix)) return
		let mean = didyoumean(noPrefix, help)
		let sim = similarity(noPrefix, mean)
		let som = sim * 100
		let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
		let name = await conn.getName(who)
		let caption = `
Hello Ji 

maybe you meant : 

 இ   *${usedPrefix + mean}*\n
 இ   *Similarity:* *${parseInt(som)}%*\n\n*RIRURU-AI*\n
Follow these steps to start using WhatsApp bots responsibly:

(1) .menu
(2) .help
(3) .start
(4) .info
(5) .list
(6) .ping
(7) .alive

(PREFIX  -  .  ,  /  *  #   !  ~  )`

 if (mean) this.sendButton(m.chat, caption, igfg, 'https://i.ytimg.com/vi_webp/fSMiH4NOga0/maxresdefault.webp', [['RUNTIME', `/runtime`]], null, [['Visit Guide', `https://bot-support.vercel.app/#get-started`]], m, { mentions: [who]})
	    }
}
export const disabled = false
// conn.sendButton(m.chat, caption, igfg, 'https://i.ytimg.com/vi_webp/fSMiH4NOga0/maxresdefault.webp', [['RUNTIME', `/runtime`]], null, [['Visit Guide', `https://bot-support.vercel.app/#get-started`]],
