import { Router } from "express";

import { ok } from "../../lib/respond.js";

const adminRouter = Router();

adminRouter.get("/overview", (_request, response) => {
  response.json(
    ok({
      revenue: "$284k",
      users: 12480,
      verifiedDoctors: 428,
      communityFlags: 11,
      verificationQueue: 9,
      incidentStatus: "All systems stable"
    })
  );
});

export { adminRouter };
