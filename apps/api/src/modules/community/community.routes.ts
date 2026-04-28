import { Router } from "express";

import { getCommunityFeed } from "../../lib/helio-repository.js";
import { ok } from "../../lib/respond.js";

const communityRouter = Router();

communityRouter.get("/feed", async (_request, response, next) => {
  try {
    response.json(ok(await getCommunityFeed()));
  } catch (error) {
    next(error);
  }
});

export { communityRouter };
