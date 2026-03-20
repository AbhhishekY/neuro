export async function generateResultInsights(assessment, result, answers) {
  const apiKey = import.meta.env.VITE_NVIDIA_API_KEY;
  if (!apiKey) {
    throw new Error("NVIDIA API key not found. Please ensure VITE_NVIDIA_API_KEY is set in your .env.local file.");
  }

  const prompt = `You are a highly empathetic, compassionate, and warm mental health assistant. 
Your role is to write a short, gentle message to the user based on their screening results for the ${assessment.fullTitle}.

Test Results:
- User Score: ${result.score} out of ${result.maxScore}
- Severity Range: ${result.range.label}
- Assessment description: ${assessment.description}

Here are the user's specific answers:
${assessment.questions.map(q => `- ${q.text}: ${answers[q.id]?.label ?? 'No answer'}`).join('\n')}

CRITICAL GUARDRAILS & INSTRUCTIONS:
1. DO NOT diagnose the user. Explicitly remind them that you are an AI and this was just a screening tool.
2. If the severity is moderate, severe, or there are any self-harm indications, gently but firmly encourage speaking to a licensed mental health professional.
3. Be warm, non-judgmental, and extremely validating of their experience.
4. Keep it concise (2-3 short paragraphs maximum). Use plain language, no medical jargon.
5. Use a warm, comforting tone. Speak directly to the user (e.g. "I can see you've been having a tough time with...").
`;

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
        max_tokens: 350,
        temperature: 0.5,
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content ?? "We are currently unable to generate insights, but remember you can always reach out to a professional.";
  } catch (error) {
    console.error("Integration with NVIDIA NIM failed:", error);
    throw error;
  }
}
