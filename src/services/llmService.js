async function fetchNvidiaProxy(payload) {
  // Try local API key if available (for pure Vite dev without Vercel CLI)
  const clientKey = import.meta.env.VITE_NVIDIA_API_KEY;
  const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  
  // If we're strictly local and using Vite, we hit the Vite proxy (/api/nvidia defaults to proxy in vite.config)
  // On Vercel, we hit the Vercel serverless function /api/nvidia.js
  // Let Vite proxy or Vercel route it automatically.
  const headers = { "Content-Type": "application/json" };
  if (clientKey) {
    headers["Authorization"] = `Bearer ${clientKey}`;
  }

  const response = await fetch("/api/nvidia/v1/chat/completions", {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error(`API error: ${response.status}`);
  
  try {
    const current = parseInt(localStorage.getItem('mock_llm_calls') || '1845', 10);
    localStorage.setItem('mock_llm_calls', current + 1);
  } catch(e) {}

  return response.json();
}

export async function generateResultInsights(assessment, result, answers) {
  const prompt = `You are a warm, highly empathetic mental health companion.
Your goal is to write a VERY short, highly affirming message based on the user's screening results for the ${assessment.fullTitle}.

Test Results: Score ${result.score}/${result.maxScore} (${result.range.label})
User's specific answers:
${assessment.questions.map(q => `- ${q.text}: ${answers[q.id]?.label ?? 'No answer'}`).join('\n')}

CRITICAL INSTRUCTIONS:
1. START the message by thanking them. Tell them they are incredibly brave for taking this step to understand their mind.
2. YOU MUST specifically reference 1 or 2 of their exact answers to show you are listening to their unique experience (e.g., "I noticed you mentioned feeling tired nearly every day...").
3. Be CONCISE. strictly 3 to 4 sentences maximum.
4. Keep the tone warm, empathetic, and validating.
5. Do NOT give a medical diagnosis. You are an AI peer/companion. Focus entirely on validating their feelings.
6. If the score is high/severe, gently encourage reaching out to a professional as a next step.`;

  try {
    const data = await fetchNvidiaProxy({
      model: "meta/llama-3.1-70b-instruct",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 250,
      temperature: 0.6,
    });
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Failed to generate insights:", error);
    throw error;
  }
}

export async function generateLocalResources(locationString) {
  const prompt = `The user is located in or near: ${locationString}.
Please provide a short, well-structured Markdown list of PUBLIC, GOVERNMENT-RUN, or NON-PROFIT mental health helplines, crisis centers, and public hospitals available in or accessible from this region.

CRITICAL INSTRUCTIONS:
1. ONLY list strictly public, free, or non-profit government resources.
2. Do NOT list any private clinics, private practices, or paid therapy platforms.
3. Include phone numbers and a 1-sentence description for each.
4. If you cannot find extremely local public resources, provide the national public helplines for their country.
5. Format the output cleanly using Markdown bullet points. Do not include any introductory fluff, just the list.`;

  try {
    const data = await fetchNvidiaProxy({
      model: "meta/llama-3.1-70b-instruct",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
      temperature: 0.2,
    });
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Failed to fetch local resources:", error);
    throw error;
  }
}

export async function generateRegionalHelplines(countryOrRegion) {
  const prompt = `You are a mental health resource directory assistant.
The user is located in: ${countryOrRegion}.

Return a JSON array of the top 4 PUBLIC, free, or government/non-profit mental health helplines for that region.
Each item must have these exact fields:
- "name": short organization name (string)
- "phone": phone number(s) (string)  
- "note": one short sentence describing what they offer (string)
- "href": official website if available, otherwise just leave empty (string)

CRITICAL: Try to find at least one crisis line and one general counseling line. ALWAYS return perfectly formatted JSON array with NO markdown wrapping.`;

  try {
    const data = await fetchNvidiaProxy({
      model: "meta/llama-3.1-70b-instruct",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
      temperature: 0.1,
    });
    const raw = data.choices[0].message.content.trim();
    const match = raw.match(/\[\s*\{[\s\S]*?\}\s*\]/);
    if (match) {
      return JSON.parse(match[0]);
    }
    return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to fetch regional helplines:", error);
    return null;
  }
}

export async function fetchLlmStats() {
  try {
    // Check if we are outside of a production Vercel environment
    const host = window.location.hostname;
    const isLocal = host === "localhost" || host === "127.0.0.1" || host.startsWith("192.168") || host.includes("local");
    
    if (isLocal) {
      return parseInt(localStorage.getItem('mock_llm_calls') || '1845', 10);
    }
    const res = await fetch("/api/stats");
    if (!res.ok) return 1845;
    const data = await res.json();
    return data.llm_calls;
  } catch (err) {
    console.error("Failed to fetch LLM stats:", err);
    return 1845;
  }
}
