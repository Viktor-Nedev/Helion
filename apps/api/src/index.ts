import "dotenv/config";

import { app } from "./app.js";
import { env } from "./config/env.js";
import { bootstrapFirebaseData } from "./lib/helio-repository.js";

async function startServer() {
  await bootstrapFirebaseData();

  app.listen(env.port, () => {
    console.log(`Helio API listening on http://localhost:${env.port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start Helio API", error);
  process.exit(1);
});
