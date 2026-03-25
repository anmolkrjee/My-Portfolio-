import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
  })
);
app.use(express.json());

app.use("/api/portfolio", portfolioRoutes);
app.use("/api/messages", messageRoutes);
app.use(
  "/assets",
  express.static(path.resolve(__dirname, "../../assets"))
);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use(errorHandler);
