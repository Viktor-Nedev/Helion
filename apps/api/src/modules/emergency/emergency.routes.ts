import { Router } from "express";

import { getEmergencyStatus } from "../../lib/helio-repository.js";
import { ok } from "../../lib/respond.js";

const emergencyRouter = Router();

emergencyRouter.get("/status", async (_request, response, next) => {
  try {
    response.json(ok(await getEmergencyStatus()));
  } catch (error) {
    next(error);
  }
});

export { emergencyRouter };
