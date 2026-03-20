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
