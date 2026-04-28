import { Router } from "express";
import { z } from "zod";

import { analyzeSymptoms } from "../../lib/helio-repository.js";
import { ok } from "../../lib/respond.js";
import { ApiError } from "../../middleware/error-handler.js";

const analyzeSchema = z.object({
  symptoms: z.string().min(5, "Please describe the symptoms in more detail.")
});

const symptomRouter = Router();

symptomRouter.post("/analyze", async (request, response, next) => {
  try {
    const payload = analyzeSchema.parse(request.body);
    const result = await analyzeSymptoms(payload.symptoms);

    response.json(ok(result));
  } catch (error) {
    next(new ApiError(error instanceof Error ? error.message : "Invalid symptom payload", 422));
  }
});

export { symptomRouter };
