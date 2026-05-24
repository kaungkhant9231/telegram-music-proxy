export default async function handler(request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
  const host = request.headers.host;
  const url = new URL(request.url, https://${host});

  // Webhook Setup လုပ်မည့်နေရာ
  if (url.pathname === '/api/setup-webhook') {
    const customToken = "8944882680:AAFJAWsQR-WUlvHiMlUEicLXynA-7TGiAzI"; // အစ်ကို့ Bot Token
    const webhookUrl = https://${host}/api/webhook;
    
    const setWebhookResponse = await fetch(https://api.telegram.org/bot${customToken}/setWebhook?url=${encodeURIComponent(webhookUrl)});
    const result = await setWebhookResponse.json();
    return response.status(200).json({ success: true, telegram_response: result });
  }

  // Telegram Webhook Listener
  if (url.pathname === '/api/webhook' && request.method === 'POST') {
    return response.status(200).json({ status: "success" });
  }

  // Root URL လာရင် ပြမည့်စာသား
  return response.status(200).send("Music Stream Proxy API Active (Vercel Serverless)");
}