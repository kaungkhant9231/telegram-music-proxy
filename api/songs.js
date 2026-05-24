export default async function handler(request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Bot-Token');

  if (request.method === 'OPTIONS') return response.status(200).end();

  const host = request.headers.host;

  // အစ်ကို့ရဲ့ သီချင်းစာရင်း Data
  const liveSongs = [
    {
      "id": 139,
      "title": "Ma Hote Loh Lar",
      "artist": "Telegram Bot Player",
      "comment": "Moe Moe",
      "download_url": https://${host}/api/telegram/file/bot8944882680:AAFJAWsQR-WUlvHiMlUEicLXynA-7TGiAzI/musicplayerlistchannel/139
    },
    {
      "id": 141,
      "title": "Danger",
      "artist": "Telegram Bot Player",
      "comment": "SNARE",
      "download_url": https://${host}/api/telegram/file/bot8944882680:AAFJAWsQR-WUlvHiMlUEicLXynA-7TGiAzI/musicplayerlistchannel/141
    }
  ];

  return response.status(200).json(liveSongs);
}