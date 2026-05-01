import { createRequire } from "module";
import express from "express";

const require = createRequire(import.meta.url);
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

import { env } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/error-handler.js";
import { apiRouter } from "./routes/index.js";

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.corsOrigin
  })
);
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);
