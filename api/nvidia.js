import { kv } from '@vercel/kv';

/**
 * Vercel Serverless Function: /api/nvidia
 * Proxies NVIDIA API requests to bypass CORS in production.
 *
 * Usage: POST /api/nvidia (/v1/chat/completions is appended)
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { path = '/v1/chat/completions', ...body } = req.body || {};
  
  // Provide the key via Vercel env variables (and local .env)
  const apiKey = process.env.VITE_NVIDIA_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing VITE_NVIDIA_API_KEY' });
  }

  try {
    const fetchResponse = await fetch(`https://integrate.api.nvidia.com${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    });

    if (!fetchResponse.ok) {
      const errorText = await fetchResponse.text();
      return res.status(fetchResponse.status).json({ error: errorText });
    }

    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      // Fire-and-forget increment on successful generation
      kv.incr('llm_calls_total').catch((e) => console.error("KV Error:", e));
    }

    const data = await fetchResponse.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
