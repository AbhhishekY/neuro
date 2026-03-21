import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // If KV REST API URL is missing, return a fast mock value for the frontend demo
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      return res.status(200).json({ llm_calls: 1845 });
    }

    const calls = await kv.get('llm_calls_total');
    return res.status(200).json({ llm_calls: calls || 1845 });
  } catch (err) {
    console.error("Failed to read KV:", err);
    return res.status(200).json({ llm_calls: 1845 });
  }
}
