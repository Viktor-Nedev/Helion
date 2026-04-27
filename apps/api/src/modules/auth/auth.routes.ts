import { Router } from "express";

import { ok } from "../../lib/respond.js";

const authRouter = Router();

authRouter.post("/login", (request, response) => {
  const email = String(request.body?.email ?? "");
  const role = email.includes("doctor") ? "doctor" : "patient";

  response.json(
    ok({
      token: "helio-demo-token",
      role,
      profile:
        role === "doctor"
          ? {
              id: "doctor-01",
              name: "Dr. Alex Morgan",
              email,
              title: "Lead Telehealth Specialist"
            }
          : {
              id: "patient-01",
              name: "Mila Petrova",
              email,
              title: "Premium Care Member"
            }
    })
  );
});

authRouter.post("/register", (request, response) => {
  const role = request.body?.role === "doctor" ? "doctor" : "patient";

  response.status(201).json(
    ok({
      userId: `${role}-${Date.now()}`,
      role,
      onboardingState: role === "doctor" ? "verification_pending" : "care_ready",
      submitted: request.body
    })
  );
});

export { authRouter };
