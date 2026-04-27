import { Router } from "express";

import { doctors } from "../../data/mockDatabase.js";
import { ok } from "../../lib/respond.js";

const doctorsRouter = Router();

doctorsRouter.get("/", (_request, response) => {
  response.json(ok(doctors));
});

export { doctorsRouter };
