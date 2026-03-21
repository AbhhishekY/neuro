/**
 * Vercel Serverless Function: /api/geocode
 * Proxies reverse-geocoding requests to Nominatim (OpenStreetMap)
 * server-side, injecting the required User-Agent header.
 *
 * Usage: GET /api/geocode?lat=12.97&lon=77.59
 */
export default async function handler(req, res) {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "lat and lon query params are required." });
  }

  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&accept-language=en`;

  try {
    const nominatimRes = await fetch(url, {
      headers: {
        "User-Agent": "MindCompass-App/1.0 (mental health screener; https://github.com/AbhhishekY/neuro)",
        "Accept": "application/json",
        "Referer": "https://mindcompass.vercel.app/",
      },
    });

    if (!nominatimRes.ok) {
      return res.status(nominatimRes.status).json({ error: "Nominatim returned an error." });
    }

    const data = await nominatimRes.json();

    // Cache the response for 1 hour — be a good Nominatim citizen
    res.setHeader("Cache-Control", "public, s-maxage=3600");
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json(data);
  } catch (err) {
    console.error("Geocode proxy error:", err);
    return res.status(500).json({ error: "Failed to contact Nominatim." });
  }
}
