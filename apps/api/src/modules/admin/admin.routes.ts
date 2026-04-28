import { Router } from "express";

import { getAdminOverview } from "../../lib/helio-repository.js";
import { ok } from "../../lib/respond.js";

const adminRouter = Router();

adminRouter.get("/overview", async (_request, response, next) => {
  try {
    response.json(ok(await getAdminOverview()));
  } catch (error) {
    next(error);
  }
});

export { adminRouter };
