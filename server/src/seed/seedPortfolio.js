import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDatabase } from "../config/db.js";
import { portfolioData } from "../data/portfolioData.js";
import { Portfolio } from "../models/Portfolio.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
dotenv.config();

const seedPortfolio = async () => {
  try {
    await connectDatabase();
    await Portfolio.findOneAndUpdate(
      { owner: portfolioData.owner },
      portfolioData,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log("Portfolio data seeded");
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed portfolio", error);
    process.exit(1);
  }
};

seedPortfolio();
