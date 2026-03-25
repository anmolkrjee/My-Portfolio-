import { Portfolio } from "../models/Portfolio.js";
import { portfolioData } from "../data/portfolioData.js";

export const getPortfolio = async (_req, res, next) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { owner: portfolioData.owner },
      portfolioData,
      { upsert: true, new: true, setDefaultsOnInsert: true, lean: true }
    );

    return res.json(portfolio);
  } catch (error) {
    return next(error);
  }
};
