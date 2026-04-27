import { Router } from "express";

import { messagesByThread, threads } from "../../data/mockDatabase.js";
import { ok } from "../../lib/respond.js";

const chatRouter = Router();

chatRouter.get("/threads", (_request, response) => {
  response.json(ok(threads));
});

chatRouter.get("/threads/:threadId/messages", (request, response) => {
  const messages = messagesByThread[request.params.threadId] ?? [];
  response.json(ok(messages));
});

export { chatRouter };
