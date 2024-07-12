import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let chat = global.db.data.chats[m.chat];
  
  // Check if the arguments are provided and if it's a valid YouTube link
  if (!args || !args[0]) throw `✳️ Example:\n${usedPrefix + command} https://youtu.be/YzkTFFwxtXI`;
  if (!args[0].match(/youtu/gi)) throw `❎ Verify that the YouTube link is correct`;

  // Construct the API endpoint for video download
  const ggapi = `https://vihangayt.me/download/ytmp4?url=${encodeURIComponent(args[0])}`;

  // Fetch data from the API
  const response = await fetch(ggapi);
  if (!response.ok) {
    console.error('Error fetching video:', response.statusText);
    throw 'Error fetching video';
  }
  
  const data = await response.json();
  if (!data.data || !data.data.vid_1080p) {
    throw 'Unable to fetch video URL from the response';
  }

  // Extract the video URL and other details
  const { title, vid_1080p: videoUrl } = data.data;
  
  const caption = `
CAPTION: ${title}
URL: ${args[0]}

Powered by *baby 🎶 🎼*
  `;

  // Fetch the video content
  const videoResponse = await fetch(videoUrl);
  if (!videoResponse.ok) {
    console.error('Error downloading video:', videoResponse.statusText);
    throw 'Error downloading video';
  }
  
  const videoBuffer = await videoResponse.buffer();

  // Send the video file
  await conn.sendFile(
    m.chat,
    videoBuffer,
    `video.mp4`,
    caption,
    m,
    true,
    { asDocument: chat.useDocument }
  );
};

handler.help = ['ytmp4 <yt-link>'];
handler.tags = ['downloader'];
handler.command = ['ytmp4', 'video', 'ytv'];
handler.premium = true;
handler.group = true;
handler.register = true;

export default handler;








