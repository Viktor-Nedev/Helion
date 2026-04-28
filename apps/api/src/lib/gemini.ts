import type { SymptomAnalysis } from "@helio/shared";
import { GoogleGenAI } from "@google/genai";

import { env } from "../config/env.js";

const geminiClient = env.geminiApiKey ? new GoogleGenAI({ apiKey: env.geminiApiKey }) : null;

function extractJsonBlock(payload: string) {
  const fencedMatch = payload.match(/```json\s*([\s\S]*?)```/i);

  if (fencedMatch?.[1]) {
    return fencedMatch[1].trim();
  }

  return payload.trim();
}

function normalizeRiskLevel(value: string): SymptomAnalysis["riskLevel"] {
  if (value === "low" || value === "high") {
    return value;
  }

  return "moderate";
}

export async function analyzeSymptomsWithGemini(symptoms: string): Promise<SymptomAnalysis | null> {
  if (!geminiClient) {
    return null;
  }

  try {
    const response = await geminiClient.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a medical triage assistant for a telehealth app.

Return valid JSON only with this exact shape:
{
  "summary": "string",
  "possibleCauses": ["string"],
  "riskLevel": "low|moderate|high",
  "suggestedActions": ["string"],
  "recommendedSpecialist": "string",
  "followUp": ["string"]
}

Keep it concise, practical, and non-alarmist. Mention urgent escalation only when justified.
Symptoms:
${symptoms}`,
      config: {
        responseMimeType: "application/json",
        temperature: 0.4
      }
    });

    const rawText = response.text;

    if (!rawText) {
      return null;
    }

    const parsed = JSON.parse(extractJsonBlock(rawText)) as Partial<SymptomAnalysis>;

    if (
      typeof parsed.summary !== "string" ||
      !Array.isArray(parsed.possibleCauses) ||
      !Array.isArray(parsed.suggestedActions) ||
      !Array.isArray(parsed.followUp) ||
      typeof parsed.recommendedSpecialist !== "string"
    ) {
      return null;
    }

    return {
      summary: parsed.summary,
      possibleCauses: parsed.possibleCauses.filter((item): item is string => typeof item === "string"),
      riskLevel: normalizeRiskLevel(String(parsed.riskLevel ?? "moderate")),
      suggestedActions: parsed.suggestedActions.filter((item): item is string => typeof item === "string"),
      recommendedSpecialist: parsed.recommendedSpecialist,
      followUp: parsed.followUp.filter((item): item is string => typeof item === "string")
    };
  } catch (error) {
    console.warn("Gemini symptom analysis failed. Falling back to seeded response.", error);
    return null;
  }
}
