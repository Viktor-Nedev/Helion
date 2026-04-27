import { Router } from "express";

import { doctorDashboard, featuredDoctor, featuredPatient, patientDashboard } from "../../data/mockDatabase.js";
import { ok } from "../../lib/respond.js";

const dashboardRouter = Router();

dashboardRouter.get("/patient", (_request, response) => {
  response.json(
    ok({
      profile: featuredPatient,
      overview: patientDashboard
    })
  );
});

dashboardRouter.get("/doctor", (_request, response) => {
  response.json(
    ok({
      profile: featuredDoctor,
      overview: doctorDashboard
    })
  );
});

export { dashboardRouter };
