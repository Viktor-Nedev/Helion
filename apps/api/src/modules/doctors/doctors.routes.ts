import { Router } from "express";

import { getDoctors } from "../../lib/helio-repository.js";
import { ok } from "../../lib/respond.js";

const doctorsRouter = Router();

doctorsRouter.get("/", async (_request, response, next) => {
  try {
    const doctorList = await getDoctors();
    response.json(ok(doctorList));
  } catch (error) {
    next(error);
  }
});

export { doctorsRouter };
