// File: pages/api/shopify_webhook.js

import crypto from 'crypto'; 

// Zaroori: BodyParser ko band karein
export const config = {
  api: {
    bodyParser: false, 
  },
};

// Raw Body lene ka function
async function getRawBody(req) {
    return new Promise((resolve, reject) => {
        let buffer = '';
        req.on('data', chunk => {
            buffer += chunk.toString();
        });
        req.on('end', () => {
            resolve(buffer);
        });
        req.on('error', reject);
    });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('405');
  }

  // Vercel Environment Variable se Webhook Secret Key uthao
  const SHOPIFY_SECRET = process.env.Webhooks_key; 3f1a4af57b895bdcbce56599ea5c65ee358c41ea08602ed46c502ceffc4d8172
  
  if (!SHOPIFY_SECRET) {
      return res.status(500).send('500: Key Missing');
  }

  const shopifyHmac = req.headers['x-shopify-hmac-sha256'];
  const body = await getRawBody(req); 

  // HMAC (Security) Validation
  const calculatedHmac = crypto
    .createHmac('sha256', SHOPIFY_SECRET)
    .update(body, 'utf8')
    .digest('base64');

  if (calculatedHmac !== shopifyHmac) {
    // 403 Forbidden Error yahan aata hai!
    return res.status(403).send('403: Validation Failed'); 
  }

  // --- Agar yahan tak code aaya, to validation successful hai (200 OK) ---
  
  try {
      const topic = req.headers['x-shopify-topic'];
      const jsonBody = JSON.parse(body.toString());
      
      console.log(`✅ Webhook Verified: ${topic}`);
      // Aap apna Webhook handling code yahan daal sakte hain
      
  } catch (error) {
      return res.status(500).send('500: Processing Error');
  }
  
  res.status(200).send('200: OK');
}
