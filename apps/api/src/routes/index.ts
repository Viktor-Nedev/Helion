import { Router } from "express";

import { adminRouter } from "../modules/admin/admin.routes.js";
import { appointmentsRouter } from "../modules/appointments/appointments.routes.js";
import { authRouter } from "../modules/auth/auth.routes.js";
import { chatRouter } from "../modules/chat/chat.routes.js";
import { communityRouter } from "../modules/community/community.routes.js";
import { dashboardRouter } from "../modules/dashboard/dashboard.routes.js";
import { doctorsRouter } from "../modules/doctors/doctors.routes.js";
import { symptomRouter } from "../modules/symptom/symptom.routes.js";

const apiRouter = Router();

apiRouter.get("/health", (_request, response) => {
  response.json({
    success: true,
    data: {
      service: "Helio API",
      status: "healthy"
    },
    generatedAt: new Date().toISOString()
  });
});

apiRouter.use("/auth", authRouter);
apiRouter.use("/dashboard", dashboardRouter);
apiRouter.use("/doctors", doctorsRouter);
apiRouter.use("/community", communityRouter);
apiRouter.use("/chat", chatRouter);
apiRouter.use("/appointments", appointmentsRouter);
apiRouter.use("/symptoms", symptomRouter);
apiRouter.use("/admin", adminRouter);

export { apiRouter };
