import { Router } from "express";

import { appointments } from "../../data/mockDatabase.js";
import { ok } from "../../lib/respond.js";

const appointmentsRouter = Router();

appointmentsRouter.get("/", (_request, response) => {
  response.json(
    ok({
      appointments,
      openSlots: [
        { doctor: "Dr. Emma Chen", slot: "Tomorrow, 08:30" },
        { doctor: "Dr. Sara Ivanova", slot: "Tomorrow, 13:15" },
        { doctor: "Dr. Nina Patel", slot: "Fri, 17:45" }
      ]
    })
  );
});

export { appointmentsRouter };
