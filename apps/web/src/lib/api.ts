import type { SymptomAnalysis } from "@helio/shared";

import { fallbackSymptomAnalysis } from "@/data/mock";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

export async function analyzeSymptoms(symptoms: string): Promise<SymptomAnalysis> {
  try {
    const response = await fetch(`${API_URL}/symptoms/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ symptoms })
    });

    if (!response.ok) {
      throw new Error("Symptom analysis request failed");
    }

    const payload = await response.json();
    return payload.data as SymptomAnalysis;
  } catch (_error) {
    return {
      ...fallbackSymptomAnalysis,
      summary: `${fallbackSymptomAnalysis.summary} Local preview mode is active because the API is currently unavailable.`
    };
  }
}

export async function loginWithEmail(email: string, password: string) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const payload = await response.json();
    return payload.data as {
      token: string;
      role: "patient" | "doctor";
      profile: { id: string; name: string; email: string; title: string };
    };
  } catch (_error) {
    return {
      token: "demo",
      role: email.toLowerCase().includes("doctor") ? "doctor" : ("patient" as const),
      profile: {
        id: "demo",
        name: email.toLowerCase().includes("doctor") ? "Dr. Alex Morgan" : "Mila Petrova",
        email,
        title: "Preview Session"
      }
    };
  }
}
