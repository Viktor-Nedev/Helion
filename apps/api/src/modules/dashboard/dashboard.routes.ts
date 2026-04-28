import { Router } from "express";

import { getDashboard } from "../../lib/helio-repository.js";
import { ok } from "../../lib/respond.js";

const dashboardRouter = Router();

dashboardRouter.get("/patient", async (_request, response, next) => {
  try {
    response.json(ok(await getDashboard("patient")));
  } catch (error) {
    next(error);
  }
});

dashboardRouter.get("/doctor", async (_request, response, next) => {
  try {
    response.json(ok(await getDashboard("doctor")));
  } catch (error) {
    next(error);
  }
});

export { dashboardRouter };
