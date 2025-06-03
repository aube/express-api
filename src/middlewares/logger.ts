import { RequestHandler } from "express";
import logger from "../logger";

export const midLogger: RequestHandler = (req, _, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};
