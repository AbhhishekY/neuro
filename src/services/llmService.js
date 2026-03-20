export async function generateResultInsights(assessment, result, answers) {
  const apiKey = import.meta.env.VITE_NVIDIA_API_KEY;
  if (!apiKey) {
    throw new Error("NVIDIA API key not found. Please ensure VITE_NVIDIA_API_KEY is set in your .env.local file.");
  }

  const prompt = `You are a warm, highly empathetic mental health companion.
Your goal is to write a VERY short, highly affirming message based on the user's screening results for the ${assessment.fullTitle}.

Test Results: Score ${result.score}/${result.maxScore} (${result.range.label})
User's specific answers:
${assessment.questions.map(q => `- ${q.text}: ${answers[q.id]?.label ?? 'No answer'}`).join('\n')}

CRITICAL INSTRUCTIONS:
1. START the message by thanking them for being here. Tell them they are incredibly brave for taking this step to understand their mind.
2. Be VERY CONCISE. Maximum 3-4 sentences total. Do not clutter the screen with long paragraphs.
3. Keep the tone completely uplifting, positive, and warm (a "happy, vibrant" supportive energy).
4. Do NOT give a medical diagnosis. You are an AI peer/companion. Focus entirely on validating their feelings and commending their courage.
5. If the score is high/severe, gently mention that reaching out to a professional is a great next step, but keep the primary focus on warmth and pride in their self-discovery.`;

  try {
    const response = await fetch("/api/nvidia/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-70b-instruct",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 250,
        temperature: 0.6,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Failed to generate insights:", error);
    throw error;
  }
}

export async function generateLocalResources(locationString) {
  const apiKey = import.meta.env.VITE_NVIDIA_API_KEY;
  if (!apiKey) return "API key missing.";

  const prompt = `The user is located in or near: ${locationString}.
Please provide a short, well-structured Markdown list of PUBLIC, GOVERNMENT-RUN, or NON-PROFIT mental health helplines, crisis centers, and public hospitals available in or accessible from this region.

CRITICAL INSTRUCTIONS:
1. ONLY list strictly public, free, or non-profit government resources.
2. Do NOT list any private clinics, private practices, or paid therapy platforms.
3. Include phone numbers and a 1-sentence description for each.
4. If you cannot find extremely local public resources, provide the national public helplines for their country.
5. Format the output cleanly using Markdown bullet points. Do not include any introductory fluff, just the list.`;

  try {
    const response = await fetch("/api/nvidia/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-70b-instruct",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Failed to fetch local resources:", error);
    throw error;
  }
}

export async function generateRegionalHelplines(countryOrRegion) {
  const apiKey = import.meta.env.VITE_NVIDIA_API_KEY;
  if (!apiKey) return null;

  const prompt = `You are a mental health resource directory assistant.
The user is located in: ${countryOrRegion}.

Return a JSON array of the top 4 PUBLIC, free, or government/non-profit mental health helplines for that region.
Each item must have these exact fields:
- "name": short organization name (string)
- "phone": phone number(s) (string)  
- "note": one short sentence describing what they offer (string)
- "href": official website URL if known, else "#" (string)

CRITICAL RULES:
1. Only include free, public, government-run, or non-profit organizations. NO private clinics or paid services.
2. If the country/region has specific local helplines, prioritize those.
3. If no local ones exist, use well-known international non-profits (e.g. Befrienders, WHO).
4. Return ONLY valid JSON — no markdown fences, no extra text, just the JSON array.

Example output format:
[{"name":"Crisis Line","phone":"1800-XXX","note":"24/7 free crisis support.","href":"https://example.org"}]`;

  try {
    const response = await fetch("/api/nvidia/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-70b-instruct",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 400,
        temperature: 0.1,
      }),
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    const raw = data.choices[0].message.content.trim();
    // Strip any accidental markdown fences
    const cleaned = raw.replace(/^```[a-z]*\n?/i, "").replace(/```$/i, "").trim();
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Failed to fetch regional helplines:", error);
    return null; // Graceful fallback — caller will use defaults
  }
}
