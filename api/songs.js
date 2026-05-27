export default async function handler(request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') return response.status(200).end();

  const host = request.headers.host;
  const BOT_TOKEN = '8944882680:AAFJAWsQR-WUlvHiMlUEicLXynA-7TGiAzI';
  
  try {
    // ပိုက်ဆံပေးရတဲ့ Database အစား Telegram ရဲ့ ပြင်ပ Web Page ကနေ သီချင်းတင်သမျှကို အခမဲ့ Scraping လုပ်ယူနည်း
    const channelUrl = `https://t.me/s/musicplayerlistchannel`;
    const res = await fetch(channelUrl);
    const html = await res.text();

    const dynamicSongs = [];
    
    // Telegram Web Page ထဲကနေ Message ID တွေကို ရှာဖွေဖတ်ယူခြင်း
    const matches = [...html.matchAll(/data-post="musicplayerlistchannel\/(\d+)"/g)];
    
    if (matches.length > 0) {
      // အပုဒ်ရေ အများကြီးဖြစ်လာရင် ပထမဆုံးရလာတဲ့ အပုဒ် ၂၀ ကိုပဲ ယူမယ်
      const uniqueIds = [...new Set(matches.map(m => parseInt(m[1])))].sort((a,b) => b-a).slice(0, 20);

      uniqueIds.forEach((msgId, index) => {
        dynamicSongs.push({
          "id": msgId,
          "title": `Channel Track No.${msgId}`,
          "artist": "Telegram Music",
          "comment": "Auto Synced",
          "download_url": `https://${host}/api/telegram/file/bot${BOT_TOKEN}/musicplayerlistchannel/${msgId}`
        });
      });
    }

    // အကယ်၍ အပေါ်ကနည်းလမ်း အလုပ်မလုပ်ရင် App မပျက်သွားအောင် Backup စနစ် ထည့်ထားပေးခြင်း
    if (dynamicSongs.length === 0) {
      for (let i = 1; i <= 15; i++) {
        dynamicSongs.push({
          "id": i,
          "title": `Live Track ${i}`,
          "artist": "Music Player",
          "comment": "Cloud Sync",
          "download_url": `https://${host}/api/telegram/file/bot${BOT_TOKEN}/musicplayerlistchannel/${i}`
        });
      }
    }

    return response.status(200).json(dynamicSongs);

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
