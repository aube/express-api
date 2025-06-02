import express, { NextFunction, Request, Response } from "express";
import { apiRouter } from "./routes";
import { ItemModel } from "./models";
import logger from "./logger";

new ItemModel();
const api = express();

api.use(express.urlencoded({ extended: true }));
api.use(express.json());

api.use((req: Request, _: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

api.use(apiRouter());

api.listen(3000);
