import { Router } from "express";

import { communityPosts } from "../../data/mockDatabase.js";
import { ok } from "../../lib/respond.js";

const communityRouter = Router();

communityRouter.get("/feed", (_request, response) => {
  response.json(
    ok({
      trendingHashtags: ["#MentalHealth", "#Fitness", "#Symptoms", "#Nutrition", "#RecoveryStories"],
      posts: communityPosts
    })
  );
});

export { communityRouter };
