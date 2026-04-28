export const env = {
  port: Number(process.env.PORT ?? 4000),
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
  geminiApiKey: process.env.GEMINI_API_KEY ?? "",
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID ?? "",
  firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET ?? "",
  firebaseServiceAccountJson: process.env.FIREBASE_SERVICE_ACCOUNT_JSON ?? "",
  firebaseBootstrap: process.env.FIREBASE_BOOTSTRAP !== "false"
};
