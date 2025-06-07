import { Request, Response } from "express";
import { getItems } from "../usecases/getItems";

export const GET_items = (req: Request, res: Response): void => {
  res.status(200).json(getItems(req.query));
};
