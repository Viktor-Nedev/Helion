import { Router } from "express";

import { getChatMessages, getChatThreads } from "../../lib/helio-repository.js";
import { ok } from "../../lib/respond.js";

const chatRouter = Router();

chatRouter.get("/threads", async (_request, response, next) => {
  try {
    const threadList = await getChatThreads();
    response.json(ok(threadList));
  } catch (error) {
    next(error);
  }
});

chatRouter.get("/threads/:threadId/messages", async (request, response, next) => {
  try {
    const messages = await getChatMessages(request.params.threadId);
    response.json(ok(messages));
  } catch (error) {
    next(error);
  }
});

export { chatRouter };
