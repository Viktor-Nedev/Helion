import { Router } from "express";

import { loginWithEmail, registerUser } from "../../lib/helio-repository.js";
import { ok } from "../../lib/respond.js";

const authRouter = Router();

authRouter.post("/login", async (request, response, next) => {
  try {
    const email = String(request.body?.email ?? "");
    const result = await loginWithEmail(email);
    response.json(ok(result));
  } catch (error) {
    next(error);
  }
});

authRouter.post("/register", async (request, response, next) => {
  try {
    const result = await registerUser(request.body ?? {});
    response.status(201).json(ok(result));
  } catch (error) {
    next(error);
  }
});

export { authRouter };
