import express from "express";
import cors from "cors";
import helmet from "helmet";

import healthRoute from "./routes/health.js";
import serverRoute from "./routes/server.js";
import pingRoute from "./routes/ping.js";
import downloadRoute from "./routes/download.js";
import uploadRoute from "./routes/upload.js";

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = (process.env.CORS_ORIGIN || "*")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(
  cors({
    origin: allowedOrigins.includes("*") ? true : allowedOrigins,
    methods: ["GET", "POST", "OPTIONS"],
  })
);

app.disable("x-powered-by");
app.set("trust proxy", true);

app.use("/api", healthRoute);
app.use("/api", serverRoute);
app.use("/api", pingRoute);
app.use("/api", downloadRoute);
app.use("/api", uploadRoute);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  if (!res.headersSent) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`VLN Speed measurement server listening on port ${PORT}`);
});