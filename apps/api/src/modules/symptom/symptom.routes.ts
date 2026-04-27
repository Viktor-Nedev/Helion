import { Router } from "express";
import { z } from "zod";

import { symptomAnalysis } from "../../data/mockDatabase.js";
import { ok } from "../../lib/respond.js";
import { ApiError } from "../../middleware/error-handler.js";

const analyzeSchema = z.object({
  symptoms: z.string().min(5, "Please describe the symptoms in more detail.")
});

const symptomRouter = Router();

symptomRouter.post("/analyze", (request, response, next) => {
  try {
    const payload = analyzeSchema.parse(request.body);

    response.json(
      ok({
        ...symptomAnalysis,
        summary: `${symptomAnalysis.summary} Input received: "${payload.symptoms.slice(0, 90)}".`
      })
    );
  } catch (error) {
    next(new ApiError(error instanceof Error ? error.message : "Invalid symptom payload", 422));
  }
});

export { symptomRouter };
