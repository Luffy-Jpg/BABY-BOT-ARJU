import os from 'os';

const handler = async (m, { conn, args, usedPrefix, command }) => {
    const img = 'https://i.ytimg.com/vi_webp/fSMiH4NOga0/maxresdefault.webp';

    // Fetching uptime of the current process
    let _muptime;
    if (process.send) {
        process.send('uptime');
        _muptime = await new Promise(resolve => {
            process.once('message', resolve);
            setTimeout(resolve, 1000);
        }) * 1000;
    }

    // Format uptime using clockString function
    const muptime = clockString(_muptime);

    // Fetching total number of functional plugins (example)
    const totalf = Object.values(global.plugins).filter(
        (v) => v.help && v.tags
    ).length;

    // Example system information
    const systemInfo = {
        botName: conn.user.name,
        administrator: 'ARJU', // Replace with actual administrator info
        totalFunctionalPlugins: totalf,
        team: 'TEAM-ARJU',
        uptime: muptime,
        gpuInfo: 'NVIDIA GeForce RTX 3090', // Example GPU info
        ramInfo: `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`, // RAM info in GB
        romInfo: '16 TB', // Example ROM info
        speedInfo: '4.2 GHz', // Example CPU speed info
        temperatureInfo: 'Cool' // Example CPU temperature info
    };

    try {
        // Fetching RAM usage
        const totalRAM = os.totalmem();
        const usedRAM = totalRAM - os.freemem();
        systemInfo.ramUsage = `${(usedRAM / 1024 / 1024 / 1024).toFixed(2)} GB / ${(totalRAM / 1024 / 1024 / 1024).toFixed(2)} GB`;

        // Fetching ROM (storage) usage (example)
        const totalROM = 16 * 1024; // Assuming 16 TB in GB
        const usedROM = 50 * 1024; // Example usage in GB
        systemInfo.romUsage = `${(usedROM / 1024).toFixed(2)} TB / ${(totalROM / 1024).toFixed(2)} TB`;

        // Constructing the message string with system info
        const str = `
*BOT-Name*
${systemInfo.botName}

*ADMINISTRATOR*
${systemInfo.administrator}

*Functional Plugins*
ToF ${systemInfo.totalFunctionalPlugins}

*RunTime*
${systemInfo.uptime}

*System Stats*
- *RAM:  ${systemInfo.ramInfo} (${systemInfo.ramUsage})*
- *Storage:  ${systemInfo.romInfo} (${systemInfo.romUsage})*
- *GPU:  ${systemInfo.gpuInfo}*
- *CPU Speed:  ${systemInfo.speedInfo}*
- *CPU Temperature:  ${systemInfo.temperatureInfo}*

*TEAM-ARJU*
`;

        // Sending message with system info
        conn.sendMessage(m.chat, {
            text: str,
            contextInfo: {
                mentionedJid: [m.sender],
                isForwarded: false,
                forwardingScore: 0,
                externalAdReply: {
                    title: `This bot is hosting on Private Server`,
                    body: "RIRURU-AI [ UP - TIME ]",
                    thumbnailUrl: img,
                    sourceUrl: 'https://www.instagram.com/arju_sonwani.dev?igsh=a2UxZ3ZyZjNicmUw',
                    mediaType: 1,
                    ShowAdAttribution: false,
                    renderLargerThumbnail: true
                }
            }
        });

    } catch (error) {
        console.error('Error fetching system stats:', error);
        // Handle error appropriately
    }
};

handler.help = ['runtime'];
handler.tags = ['SYSTEM'];
handler.command = ['runtime', 'uptime'];
handler.group = true;

export default handler;

function clockString(ms) {
    const years = Math.floor(ms / 31104000000) % 10;
    const months = Math.floor(ms / 2592000000) % 12;
    const days = Math.floor(ms / 86400000) % 30;
    const hours = Math.floor(ms / 3600000) % 24;
    const minutes = Math.floor(ms / 60000) % 60;
    const seconds = Math.floor(ms / 1000) % 60;
    return `*${years} Year ${months} Month ${days} Day ${hours} Hour ${minutes} Minute ${seconds} Second*`;
}


